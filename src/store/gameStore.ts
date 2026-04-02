import { create } from 'zustand';
import type { GameState, Ride, VisitorGroup, Notification, VisitorType } from '../types/game';
import { getRideDefinition, getLevelUpCost, getLevelCapacityMultiplier, getLevelIncomeMultiplier } from '../data/rides';
import { getUpgradeDefinition } from '../data/upgrades';

const TICK_INTERVAL_MS = 1000;
const NOTIFICATION_TTL_MS = 5000;
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
    pendingCash: 0,
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

const formatMoney = (amount: number): string => {
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(1)}K`;
  return `$${amount}`;
};

interface GameActions {
  tick: () => void;
  buyRide: (definitionId: string) => void;
  repairRide: (instanceId: string) => void;
  cleanPark: () => void;
  cleanRide: (instanceId: string) => void;
  buyUpgrade: (upgradeId: string) => void;
  levelUpRide: (instanceId: string) => void;
  collectRideCash: (instanceId: string) => void;
  collectAllCash: () => void;
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

    const now = Date.now();
    const newNotifications: Notification[] = [];

    const updatedRides = state.rides.map((ride) => {
      const def = getRideDefinition(ride.definitionId);
      if (!def) return ride;

      const updated = { ...ride };

      const breakdownReductionUpgrades = state.purchasedUpgrades
        .map((id) => getUpgradeDefinition(id))
        .filter((u) => u?.rideId === ride.definitionId && u?.effect === 'breakdown_reduction');
      const totalReduction = breakdownReductionUpgrades.reduce((sum, u) => sum + (u?.value ?? 0), 0);
      const effectiveBreakdownChance = (def.breakdownChance * (1 - totalReduction)) / 60;

      if (updated.status === 'operating') {
        updated.ticksSinceLastBreakdown++;

        const incomeBoost = state.purchasedUpgrades
          .map((id) => getUpgradeDefinition(id))
          .filter((u) => u?.rideId === ride.definitionId && u?.effect === 'income_boost')
          .reduce((sum, u) => sum + (u?.value ?? 0), 0);

        const capacityBoost = state.purchasedUpgrades
          .map((id) => getUpgradeDefinition(id))
          .filter((u) => u?.rideId === ride.definitionId && u?.effect === 'capacity_boost')
          .reduce((sum, u) => sum + (u?.value ?? 0), 0);

        const levelCapacity = getLevelCapacityMultiplier(ride.level);
        const levelIncome = getLevelIncomeMultiplier(ride.level);

        const effectiveCapacity = Math.floor(def.baseCapacity * (1 + capacityBoost) * levelCapacity);
        const visitorAttraction = state.purchasedUpgrades
          .map((id) => getUpgradeDefinition(id))
          .filter((u) => !u?.rideId && u?.effect === 'visitor_attraction')
          .reduce((sum, u) => sum + (u?.value ?? 0), 0);

        const happinessFactor = state.parkHappiness / 100;
        const dirtFactor = Math.max(0.3, 1 - updated.dirtLevel / 100);
        const baseVisitors = Math.floor(
          effectiveCapacity * happinessFactor * dirtFactor * (1 + visitorAttraction) * (Math.random() * 0.4 + 0.8),
        );
        updated.currentVisitors = Math.min(effectiveCapacity, baseVisitors);
        updated.totalVisitorsServed += updated.currentVisitors;

        const earned = Math.floor(
          updated.currentVisitors * def.baseCostPerTick * (1 + incomeBoost) * levelIncome * dirtFactor,
        );
        updated.pendingCash = (updated.pendingCash ?? 0) + earned;

        updated.dirtLevel = Math.min(100, updated.dirtLevel + 0.5 + (ride.definitionId === 'water_ride' ? 1 : 0));

        if (Math.random() < effectiveBreakdownChance && updated.ticksSinceLastBreakdown > 30) {
          updated.status = 'broken';
          updated.currentVisitors = 0;
          updated.ticksSinceLastBreakdown = 0;
          newNotifications.push(createNotification('breakdown', `${def.name} has broken down!`, ride.instanceId));

          const hasAutoRepair = state.purchasedUpgrades.some(
            (id) =>
              getUpgradeDefinition(id)?.rideId === ride.definitionId &&
              getUpgradeDefinition(id)?.effect === 'auto_repair',
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
        const repairSpeed = 100 / def.repairTime;
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

    const dirtIncrease = 0.2 + updatedRides.filter((r) => r.status === 'operating').length * 0.1;
    let newParkDirt = Math.min(100, state.parkDirt + dirtIncrease);

    if (state.isAutoCleanEnabled) {
      newParkDirt = Math.max(0, newParkDirt - 2);
      updatedRides.forEach((r) => {
        r.dirtLevel = Math.max(0, r.dirtLevel - 1);
      });
    }

    const operatingRides = updatedRides.filter((r) => r.status === 'operating').length;
    const brokenRides = updatedRides.filter((r) => r.status === 'broken').length;
    const avgRideDirt = updatedRides.reduce((sum, r) => sum + r.dirtLevel, 0) / Math.max(1, updatedRides.length);
    const happinessTarget = Math.max(
      10,
      100 - newParkDirt * 0.3 - avgRideDirt * 0.2 - brokenRides * 15 + operatingRides * 5,
    );
    const newHappiness = Math.max(
      0,
      Math.min(100, state.parkHappiness + (happinessTarget - state.parkHappiness) * 0.05),
    );

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

    const activeVisitors = newVisitors
      .map((v) => ({ ...v, timeInPark: v.timeInPark + 1, happiness: Math.max(0, v.happiness - newParkDirt / 200) }))
      .filter((v) => v.timeInPark < 120 && v.happiness > 20);

    const totalCurrentVisitors = activeVisitors.reduce((sum, v) => sum + v.size, 0);

    // Auto-dismiss notifications older than TTL, then prepend new ones and cap at 5
    const freshNotifications = state.notifications.filter((n) => now - n.timestamp < NOTIFICATION_TTL_MS);
    const allNotifications = [...newNotifications, ...freshNotifications].slice(0, 5);

    const totalPendingEarned = updatedRides.reduce((sum, r) => sum + (r.pendingCash - (state.rides.find((sr) => sr.instanceId === r.instanceId)?.pendingCash ?? 0)), 0);

    const newStats = {
      ...state.stats,
      totalEarnings: state.stats.totalEarnings + totalPendingEarned,
      totalVisitors: state.stats.totalVisitors + totalCurrentVisitors * 0.01,
      peakVisitors: Math.max(state.stats.peakVisitors, totalCurrentVisitors),
      timePlayed: state.stats.timePlayed + 1,
    };

    set({
      rides: updatedRides,
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
        r.instanceId === instanceId ? { ...r, status: 'repairing' as const, repairProgress: 0, isAutoRepair: false } : r,
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

  cleanRide: (instanceId: string) => {
    set((state) => ({
      rides: state.rides.map((r) => (r.instanceId === instanceId ? { ...r, dirtLevel: 0 } : r)),
    }));
  },

  levelUpRide: (instanceId: string) => {
    const state = get();
    const ride = state.rides.find((r) => r.instanceId === instanceId);
    if (!ride) return;
    const def = getRideDefinition(ride.definitionId);
    if (!def) return;
    if (ride.level >= def.maxLevel) return;

    const cost = getLevelUpCost(def, ride.level);
    if (state.money < cost) return;

    set({
      money: state.money - cost,
      rides: state.rides.map((r) => (r.instanceId === instanceId ? { ...r, level: r.level + 1 } : r)),
      notifications: [
        createNotification('upgrade', `${def.name} upgraded to level ${ride.level + 1}!`, instanceId),
        ...state.notifications,
      ].slice(0, 5),
    });
  },

  collectRideCash: (instanceId: string) => {
    const state = get();
    const ride = state.rides.find((r) => r.instanceId === instanceId);
    if (!ride || ride.pendingCash <= 0) return;

    set({
      money: state.money + ride.pendingCash,
      rides: state.rides.map((r) => (r.instanceId === instanceId ? { ...r, pendingCash: 0 } : r)),
    });
  },

  collectAllCash: () => {
    const state = get();
    const totalPending = state.rides.reduce((sum, r) => sum + r.pendingCash, 0);
    if (totalPending <= 0) return;

    set({
      money: state.money + totalPending,
      rides: state.rides.map((r) => ({ ...r, pendingCash: 0 })),
      notifications: [
        createNotification('income', `Collected ${formatMoney(totalPending)} from all rides!`),
        ...state.notifications,
      ].slice(0, 5),
    });
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

    if (upgrade.effect === 'auto_repair' && upgrade.rideId) {
      updates.rides = state.rides.map((r) => {
        if (r.definitionId === upgrade.rideId && r.status === 'broken') {
          return { ...r, status: 'repairing' as const, repairProgress: 0, isAutoRepair: true };
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
