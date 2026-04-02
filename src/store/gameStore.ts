import { create } from 'zustand';
import type { GameState, Ride, VisitorGroup, Notification, VisitorType } from '../types/game';
import { getRideDefinition } from '../data/rides';
import { getUpgradeDefinition } from '../data/upgrades';

const TICK_INTERVAL_MS = 1000;
const VISITOR_TYPES: VisitorType[] = ['family', 'thrill_seeker', 'child', 'elderly', 'teen'];

function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

function createInitialRide(definitionId: string): Ride {
  return {
    definitionId,
    instanceId: generateId(),
    status: 'operating',
    dirtLevel: 0,
    currentVisitors: 0,
    totalVisitorsServed: 0,
    repairProgress: 0,
    isAutoRepair: false,
    level: 1,
    ticksSinceLastBreakdown: 0,
  };
}

function createNotification(type: Notification['type'], message: string, rideInstanceId?: string): Notification {
  return {
    id: generateId(),
    type,
    message,
    timestamp: Date.now(),
    rideInstanceId,
  };
}

interface GameActions {
  tick: () => void;
  buyRide: (definitionId: string) => void;
  repairRide: (instanceId: string) => void;
  cleanPark: () => void;
  buyUpgrade: (upgradeId: string) => void;
  selectRide: (instanceId: string | null) => void;
  togglePause: () => void;
  dismissNotification: (id: string) => void;
}

const initialState: GameState = {
  money: 500,
  rides: [createInitialRide('ferris_wheel')],
  visitors: [],
  parkDirt: 0,
  parkHappiness: 80,
  notifications: [],
  purchasedUpgrades: [],
  stats: {
    totalEarnings: 0,
    totalVisitors: 0,
    peakVisitors: 0,
    ridesFixed: 0,
    timePlayed: 0,
  },
  gameTick: 0,
  isPaused: false,
  isAutoCleanEnabled: false,
  selectedRideId: null,
};

export const useGameStore = create<GameState & GameActions>((set, get) => ({
  ...initialState,

  tick: () => {
    const state = get();
    if (state.isPaused) return;

    const newNotifications: Notification[] = [];
    let totalEarned = 0;

    const updatedRides = state.rides.map((ride) => {
      const def = getRideDefinition(ride.definitionId);
      if (!def) return ride;

      const updated = { ...ride };

      // Calculate breakdown chance (modified by upgrades)
      const breakdownReductionUpgrades = state.purchasedUpgrades
        .map((id) => getUpgradeDefinition(id))
        .filter((u) => u?.rideId === ride.definitionId && u?.effect === 'breakdown_reduction');
      const totalReduction = breakdownReductionUpgrades.reduce((sum, u) => sum + (u?.value ?? 0), 0);
      const effectiveBreakdownChance = (def.breakdownChance * (1 - totalReduction)) / 60; // per tick (per second)

      if (updated.status === 'operating') {
        updated.ticksSinceLastBreakdown++;

        // Generate income
        const hasIncomeBoost = state.purchasedUpgrades.some(
          (id) =>
            getUpgradeDefinition(id)?.rideId === ride.definitionId &&
            getUpgradeDefinition(id)?.effect === 'income_boost'
        );
        const incomeBoost = state.purchasedUpgrades
          .map((id) => getUpgradeDefinition(id))
          .filter((u) => u?.rideId === ride.definitionId && u?.effect === 'income_boost')
          .reduce((sum, u) => sum + (u?.value ?? 0), 0);

        const hasCapacityBoost = state.purchasedUpgrades.some(
          (id) =>
            getUpgradeDefinition(id)?.rideId === ride.definitionId &&
            getUpgradeDefinition(id)?.effect === 'capacity_boost'
        );
        const capacityBoost = hasCapacityBoost
          ? state.purchasedUpgrades
              .map((id) => getUpgradeDefinition(id))
              .filter((u) => u?.rideId === ride.definitionId && u?.effect === 'capacity_boost')
              .reduce((sum, u) => sum + (u?.value ?? 0), 0)
          : 0;

        const effectiveCapacity = Math.floor(def.baseCapacity * (1 + capacityBoost));
        const visitorAttraction = state.purchasedUpgrades
          .map((id) => getUpgradeDefinition(id))
          .filter((u) => !u?.rideId && u?.effect === 'visitor_attraction')
          .reduce((sum, u) => sum + (u?.value ?? 0), 0);

        // Simulate visitors cycling through
        const happinessFactor = state.parkHappiness / 100;
        const dirtFactor = Math.max(0.3, 1 - updated.dirtLevel / 100);
        const baseVisitors = Math.floor(
          effectiveCapacity * happinessFactor * dirtFactor * (1 + visitorAttraction) * (Math.random() * 0.4 + 0.8)
        );
        updated.currentVisitors = Math.min(effectiveCapacity, baseVisitors);
        updated.totalVisitorsServed += updated.currentVisitors;

        const earned = Math.floor(
          updated.currentVisitors * def.baseCostPerTick * (hasIncomeBoost ? 1 + incomeBoost : 1) * dirtFactor
        );
        totalEarned += earned;

        // Accumulate dirt
        updated.dirtLevel = Math.min(100, updated.dirtLevel + 0.5 + (ride.definitionId === 'water_ride' ? 1 : 0));

        // Random breakdown
        if (Math.random() < effectiveBreakdownChance && updated.ticksSinceLastBreakdown > 30) {
          updated.status = 'broken';
          updated.currentVisitors = 0;
          updated.ticksSinceLastBreakdown = 0;
          newNotifications.push(createNotification('breakdown', `${def.name} has broken down!`, ride.instanceId));

          // Auto repair if purchased
          const hasAutoRepair = state.purchasedUpgrades.some(
            (id) =>
              getUpgradeDefinition(id)?.rideId === ride.definitionId &&
              getUpgradeDefinition(id)?.effect === 'auto_repair'
          );
          if (hasAutoRepair) {
            updated.isAutoRepair = true;
            updated.status = 'repairing';
            updated.repairProgress = 0;
          }
        }
      } else if (updated.status === 'broken') {
        updated.currentVisitors = 0;
      } else if (updated.status === 'repairing') {
        const repairSpeed = 100 / def.repairTime; // percent per second
        updated.repairProgress = Math.min(100, updated.repairProgress + repairSpeed);
        updated.currentVisitors = 0;

        if (updated.repairProgress >= 100) {
          updated.status = 'operating';
          updated.repairProgress = 0;
          newNotifications.push(createNotification('repair', `${def.name} is back online!`, ride.instanceId));
        }
      }

      return updated;
    });

    // Park dirt accumulates globally
    const dirtIncrease = 0.2 + updatedRides.filter((r) => r.status === 'operating').length * 0.1;
    let newParkDirt = Math.min(100, state.parkDirt + dirtIncrease);

    // Auto clean if purchased
    if (state.isAutoCleanEnabled) {
      newParkDirt = Math.max(0, newParkDirt - 2);
      // Also clean rides slowly
      updatedRides.forEach((r) => {
        r.dirtLevel = Math.max(0, r.dirtLevel - 1);
      });
    }

    // Happiness calculation based on dirt, broken rides
    const operatingRides = updatedRides.filter((r) => r.status === 'operating').length;
    const brokenRides = updatedRides.filter((r) => r.status === 'broken').length;
    const avgRideDirt = updatedRides.reduce((sum, r) => sum + r.dirtLevel, 0) / Math.max(1, updatedRides.length);
    const happinessTarget = Math.max(
      10,
      100 - newParkDirt * 0.3 - avgRideDirt * 0.2 - brokenRides * 15 + operatingRides * 5
    );
    const newHappiness = Math.max(
      0,
      Math.min(100, state.parkHappiness + (happinessTarget - state.parkHappiness) * 0.05)
    );

    // Spawn new visitor groups occasionally
    const newVisitors: VisitorGroup[] = [...state.visitors];
    if (state.gameTick % 5 === 0 && operatingRides > 0) {
      const visitorAttraction = state.purchasedUpgrades
        .map((id) => getUpgradeDefinition(id))
        .filter((u) => !u?.rideId && u?.effect === 'visitor_attraction')
        .reduce((sum, u) => sum + (u?.value ?? 0), 0);

      const spawnCount = Math.floor((1 + visitorAttraction) * (Math.random() < 0.5 ? 1 : 2));
      for (let i = 0; i < spawnCount; i++) {
        const type = VISITOR_TYPES[Math.floor(Math.random() * VISITOR_TYPES.length)];
        newVisitors.push({
          id: generateId(),
          type,
          size: Math.floor(Math.random() * 4) + 1,
          happiness: Math.floor(Math.random() * 30) + 70,
          spendingPower: Math.floor(Math.random() * 50) + 20,
          timeInPark: 0,
        });
      }
    }

    // Age out visitors
    const activeVisitors = newVisitors
      .map((v) => ({ ...v, timeInPark: v.timeInPark + 1, happiness: Math.max(0, v.happiness - newParkDirt / 200) }))
      .filter((v) => v.timeInPark < 120 && v.happiness > 20); // leave after 2 min or too unhappy

    const totalCurrentVisitors = activeVisitors.reduce((sum, v) => sum + v.size, 0);

    // Trim old notifications (keep last 5)
    const allNotifications = [...newNotifications, ...state.notifications].slice(0, 5);

    const newStats = {
      ...state.stats,
      totalEarnings: state.stats.totalEarnings + totalEarned,
      totalVisitors: state.stats.totalVisitors + totalCurrentVisitors * 0.01,
      peakVisitors: Math.max(state.stats.peakVisitors, totalCurrentVisitors),
      timePlayed: state.stats.timePlayed + 1,
    };

    set({
      rides: updatedRides,
      money: state.money + totalEarned,
      parkDirt: newParkDirt,
      parkHappiness: newHappiness,
      visitors: activeVisitors,
      notifications: allNotifications,
      stats: newStats,
      gameTick: state.gameTick + 1,
    });
  },

  buyRide: (definitionId: string) => {
    const state = get();
    const def = getRideDefinition(definitionId);
    if (!def) return;
    if (state.money < def.unlockCost) return;
    if (state.rides.some((r) => r.definitionId === definitionId)) return;

    const newRide = createInitialRide(definitionId);
    set({
      money: state.money - def.unlockCost,
      rides: [...state.rides, newRide],
      notifications: [
        createNotification('upgrade', `${def.name} has been added to the park!`),
        ...state.notifications,
      ].slice(0, 5),
    });
  },

  repairRide: (instanceId: string) => {
    const state = get();
    const ride = state.rides.find((r) => r.instanceId === instanceId);
    if (!ride || ride.status !== 'broken') return;
    const def = getRideDefinition(ride.definitionId);

    set({
      rides: state.rides.map((r) =>
        r.instanceId === instanceId ? { ...r, status: 'repairing', repairProgress: 0, isAutoRepair: false } : r
      ),
      notifications: [
        createNotification('repair', `Repairing ${def?.name ?? 'ride'}...`, instanceId),
        ...state.notifications,
      ].slice(0, 5),
    });
  },

  cleanPark: () => {
    set((state) => ({
      parkDirt: 0,
      rides: state.rides.map((r) => ({ ...r, dirtLevel: 0 })),
    }));
  },

  buyUpgrade: (upgradeId: string) => {
    const state = get();
    const upgrade = getUpgradeDefinition(upgradeId);
    if (!upgrade) return;
    if (state.money < upgrade.cost) return;
    if (state.purchasedUpgrades.includes(upgradeId)) return;
    if (upgrade.requires && !state.purchasedUpgrades.includes(upgrade.requires)) return;

    const updates: Partial<GameState> = {
      money: state.money - upgrade.cost,
      purchasedUpgrades: [...state.purchasedUpgrades, upgradeId],
      notifications: [
        createNotification('upgrade', `Upgrade purchased: ${upgrade.name}!`),
        ...state.notifications,
      ].slice(0, 5),
    };

    if (upgrade.effect === 'auto_clean') {
      updates.isAutoCleanEnabled = true;
    }

    // Apply auto repair to already-broken rides
    if (upgrade.effect === 'auto_repair' && upgrade.rideId) {
      updates.rides = state.rides.map((r) => {
        if (r.definitionId === upgrade.rideId && r.status === 'broken') {
          return { ...r, status: 'repairing', repairProgress: 0, isAutoRepair: true };
        }
        return r;
      });
    }

    set(updates);
  },

  selectRide: (instanceId: string | null) => {
    set({ selectedRideId: instanceId });
  },

  togglePause: () => {
    set((state) => ({ isPaused: !state.isPaused }));
  },

  dismissNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },
}));

export const resetGameStore = (): void => {
  useGameStore.setState({
    ...initialState,
    rides: [createInitialRide('ferris_wheel')],
  });
};

// Game loop - runs outside of React to avoid re-render dependency
let gameLoopInterval: ReturnType<typeof setInterval> | null = null;

export const startGameLoop = () => {
  if (gameLoopInterval) return;
  gameLoopInterval = setInterval(() => {
    useGameStore.getState().tick();
  }, TICK_INTERVAL_MS);
};

export const stopGameLoop = () => {
  if (gameLoopInterval) {
    clearInterval(gameLoopInterval);
    gameLoopInterval = null;
  }
};
