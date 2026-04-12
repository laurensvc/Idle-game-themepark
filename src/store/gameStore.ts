import { playGameSfx } from '@/audio/soundManager';
import { BALANCE } from '@/data/balance';
import { RIDE_DEFINITIONS, getLevelUpCost, getRideDefinition } from '@/data/rides';
import { UPGRADE_DEFINITIONS } from '@/data/upgrades';
import { AUDIO_STORAGE_KEY, loadPersistedAudioSettings } from '@/lib/audioStorage';
import { clamp, randomInt } from '@/lib/utils';
import type { AudioSettings, GameState, GameStore, RideInstance, Visitor, VisitorType } from '@/types/game';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

const VISITOR_TYPES: VisitorType[] = ['family', 'thrill_seeker', 'child', 'elderly', 'teen'];

let nextRideInstanceId = 1;
let nextVisitorId = 1;
let nextNotificationId = 1;

const createRideInstance = (definitionId: string): RideInstance => ({
  id: `ride_${nextRideInstanceId++}`,
  definitionId,
  status: 'idle',
  level: 1,
  ticksSincePurchase: 0,
  breakdownCooldown: BALANCE.breakdownCooldownTicks,
  repairProgress: 0,
  dirt: 0,
  visitors: 0,
});

const saveAudioSettings = (settings: AudioSettings): void => {
  try {
    localStorage.setItem(AUDIO_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    /* ignore */
  }
};

const initialState: GameState = {
  money: BALANCE.startingMoney,
  rides: [createRideInstance('ferris_wheel')],
  parkBattery: BALANCE.startingBattery,
  happiness: BALANCE.startingHappiness,
  parkDirt: 0,
  visitors: [],
  upgrades: [],
  notifications: [],
  tickCount: 0,
  totalMoneyEarned: 0,
  totalVisitorsServed: 0,
  audioSettings: loadPersistedAudioSettings(),
  selectedRideId: null,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  tick: () => {
    set((state) => {
      const newTickCount = state.tickCount + 1;
      let money = state.money;
      let parkBattery = state.parkBattery;
      let parkDirt = state.parkDirt;
      let totalMoneyEarned = state.totalMoneyEarned;
      let totalVisitorsServed = state.totalVisitorsServed;
      const rides = state.rides;
      const notifications = state.notifications;
      const upgrades = state.upgrades;

      const hasAutoRepair = upgrades.some((u) => u.upgradeId === 'auto_repair');
      const hasJanitor = upgrades.some((u) => u.upgradeId === 'janitor_1');
      const hasAutoClean = upgrades.some((u) => u.upgradeId === 'auto_clean');
      const hasBatteryUpgrade = upgrades.some((u) => u.upgradeId === 'battery_upgrade');

      let happinessBoost = 0;
      let visitorAttractionMult = 1;
      let capacityMult = 1;
      let incomeMult = 1;
      let breakdownMult = 1;

      for (let i = 0; i < upgrades.length; i++) {
        const def = UPGRADE_DEFINITIONS.find((d) => d.id === upgrades[i].upgradeId);
        if (!def) continue;
        switch (def.effect.type) {
          case 'happiness_boost':
            happinessBoost += def.effect.value;
            break;
          case 'visitor_attraction':
            visitorAttractionMult += def.effect.value;
            break;
          case 'capacity_boost':
            capacityMult += def.effect.value;
            break;
          case 'income_boost':
            incomeMult += def.effect.value;
            break;
          case 'breakdown_reduction':
            breakdownMult *= 1 - def.effect.value;
            break;
        }
      }

      const batteryDrainMult = hasBatteryUpgrade ? 1 - BALANCE.batteryUpgradeReduction : 1;

      let operatingCount = 0;
      let brokenCount = 0;
      let totalRideDirt = 0;

      const batteryAtTickStart = state.parkBattery;

      for (let i = 0; i < rides.length; i++) {
        const ride = rides[i];
        ride.ticksSincePurchase++;

        if (ride.breakdownCooldown > 0) {
          ride.breakdownCooldown--;
        }

        const def = getRideDefinition(ride.definitionId);
        if (!def) continue;

        if (ride.status === 'operating') {
          parkBattery -= BALANCE.batteryDrainPerRide * batteryDrainMult;

          if (parkBattery <= 0) {
            parkBattery = 0;
            ride.status = 'idle';
            ride.visitors = 0;
            continue;
          }

          operatingCount++;

          const capacity = Math.round(
            def.baseCapacity * (1 + BALANCE.capacityMultPerLevel * (ride.level - 1)) * capacityMult
          );
          const happinessFactor = state.happiness / 100;
          const dirtPenalty = Math.max(0, 1 - ride.dirt / 100);
          ride.visitors = Math.round(capacity * happinessFactor * dirtPenalty);

          const income =
            ride.visitors * def.baseIncome * (1 + BALANCE.incomeMultPerLevel * (ride.level - 1)) * incomeMult;
          money += income;
          totalMoneyEarned += income;

          ride.dirt = Math.min(100, ride.dirt + def.dirtRate);

          if (ride.breakdownCooldown <= 0 && Math.random() < def.breakdownChance * breakdownMult) {
            ride.status = 'broken';
            ride.visitors = 0;
            ride.breakdownCooldown = BALANCE.breakdownCooldownTicks;
            playGameSfx('breakdown');
            notifications.push({
              id: `notif_${nextNotificationId++}`,
              message: `${def.emoji} ${def.name} broke down!`,
              type: 'error',
              tick: newTickCount,
            });

            if (hasAutoRepair) {
              ride.status = 'repairing';
              ride.repairProgress = 0;
            }
          }
        } else if (ride.status === 'repairing') {
          ride.repairProgress++;
          if (ride.repairProgress >= def.repairTime) {
            ride.status = 'operating';
            ride.repairProgress = 0;
            ride.breakdownCooldown = BALANCE.breakdownCooldownTicks;
            playGameSfx('repair_done');
            notifications.push({
              id: `notif_${nextNotificationId++}`,
              message: `${def.emoji} ${def.name} repaired!`,
              type: 'success',
              tick: newTickCount,
            });
          }
        } else if (ride.status === 'broken' && hasAutoRepair) {
          ride.status = 'repairing';
          ride.repairProgress = 0;
        }

        if (ride.status === 'broken') {
          brokenCount++;
        }

        totalRideDirt += ride.dirt;

        if (hasAutoClean) {
          ride.dirt = Math.max(0, ride.dirt - BALANCE.autoCleanRideRate);
        }
      }

      if (batteryAtTickStart > 0 && parkBattery <= 0) {
        playGameSfx('warning');
      }

      parkDirt += BALANCE.dirtBaseRate + BALANCE.dirtPerOperatingRide * operatingCount;
      if (hasJanitor) {
        parkDirt = Math.max(0, parkDirt - BALANCE.janitorCleanRate);
      }
      parkDirt = clamp(parkDirt, 0, 100);

      const avgRideDirt = rides.length > 0 ? totalRideDirt / rides.length : 0;
      const happinessTarget = clamp(
        BALANCE.happinessBaseTarget -
          parkDirt * 0.3 -
          avgRideDirt * 0.2 +
          brokenCount * BALANCE.happinessPerBrokenRide +
          operatingCount * BALANCE.happinessPerOperatingRide +
          happinessBoost,
        0,
        100
      );
      const happiness = clamp(
        state.happiness + (happinessTarget - state.happiness) * BALANCE.happinessLerpRate,
        0,
        100
      );

      const visitors = [...state.visitors];
      for (let i = visitors.length - 1; i >= 0; i--) {
        visitors[i].ticksRemaining--;
        if (visitors[i].ticksRemaining <= 0 || happiness < BALANCE.happinessLeaveThreshold) {
          totalVisitorsServed += visitors[i].groupSize;
          visitors.splice(i, 1);
        }
      }

      if (newTickCount % BALANCE.visitorSpawnInterval === 0 && operatingCount > 0) {
        const groupCount = Math.max(
          1,
          Math.round(operatingCount * BALANCE.visitorSpawnPerOperatingRide * visitorAttractionMult)
        );
        for (let g = 0; g < groupCount; g++) {
          visitors.push({
            id: `v_${nextVisitorId++}`,
            type: VISITOR_TYPES[randomInt(0, VISITOR_TYPES.length - 1)],
            ticksRemaining: BALANCE.visitorLifespan,
            groupSize: randomInt(BALANCE.visitorGroupMin, BALANCE.visitorGroupMax),
          });
        }
      }

      while (notifications.length > BALANCE.maxNotifications) {
        notifications.shift();
      }

      return {
        money,
        rides: [...rides],
        parkBattery,
        parkDirt,
        happiness,
        visitors,
        tickCount: newTickCount,
        totalMoneyEarned,
        totalVisitorsServed,
        notifications: [...notifications],
      };
    });
  },

  buyRide: (definitionId: string) => {
    const state = get();
    const def = RIDE_DEFINITIONS.find((r) => r.id === definitionId);
    if (!def || state.money < def.baseCost) return;

    playGameSfx('purchase');
    set({
      money: state.money - def.baseCost,
      rides: [...state.rides, createRideInstance(definitionId)],
      notifications: [
        ...state.notifications,
        {
          id: `notif_${nextNotificationId++}`,
          message: `${def.emoji} Built ${def.name}!`,
          type: 'success',
          tick: state.tickCount,
        },
      ],
    });
  },

  levelUpRide: (rideId: string) => {
    const state = get();
    const rideIndex = state.rides.findIndex((r) => r.id === rideId);
    if (rideIndex === -1) return;
    const ride = state.rides[rideIndex];
    if (ride.level >= BALANCE.maxRideLevel) return;
    const def = getRideDefinition(ride.definitionId);
    if (!def) return;
    const cost = getLevelUpCost(def.baseLevelUpCost, ride.level);
    if (state.money < cost) return;

    playGameSfx('upgrade');
    const newRides = [...state.rides];
    newRides[rideIndex] = { ...ride, level: ride.level + 1 };
    set({
      money: state.money - cost,
      rides: newRides,
      notifications: [
        ...state.notifications,
        {
          id: `notif_${nextNotificationId++}`,
          message: `${def.emoji} ${def.name} leveled up to ${ride.level + 1}!`,
          type: 'success',
          tick: state.tickCount,
        },
      ],
    });
  },

  toggleRide: (rideId: string) => {
    const state = get();
    const rideIndex = state.rides.findIndex((r) => r.id === rideId);
    if (rideIndex === -1) return;
    const ride = state.rides[rideIndex];
    if (ride.status === 'broken' || ride.status === 'repairing') return;

    const newStatus = ride.status === 'idle' ? 'operating' : 'idle';
    const newRides = [...state.rides];
    newRides[rideIndex] = {
      ...ride,
      status: newStatus,
      visitors: newStatus === 'idle' ? 0 : ride.visitors,
    };
    playGameSfx('ui_toggle');
    set({ rides: newRides });
  },

  repairRide: (rideId: string) => {
    const state = get();
    const rideIndex = state.rides.findIndex((r) => r.id === rideId);
    if (rideIndex === -1) return;
    const ride = state.rides[rideIndex];
    if (ride.status !== 'broken') return;

    playGameSfx('repair_start');
    const newRides = [...state.rides];
    newRides[rideIndex] = { ...ride, status: 'repairing', repairProgress: 0 };
    set({ rides: newRides });
  },

  rechargeBattery: () => {
    playGameSfx('ui_click');
    set((state) => ({
      parkBattery: clamp(state.parkBattery + BALANCE.batteryRechargeAmount, 0, 100),
    }));
  },

  cleanPark: () => {
    playGameSfx('ui_toggle');
    set((state) => {
      const rides = state.rides.map((r) => ({
        ...r,
        dirt: Math.max(0, r.dirt - BALANCE.cleanSweepAmount),
      }));
      return {
        parkDirt: Math.max(0, state.parkDirt - BALANCE.cleanSweepAmount),
        rides,
      };
    });
  },

  buyUpgrade: (upgradeId: string) => {
    const state = get();
    if (state.upgrades.some((u) => u.upgradeId === upgradeId)) return;
    const def = UPGRADE_DEFINITIONS.find((u) => u.id === upgradeId);
    if (!def || state.money < def.cost) return;
    if (def.prerequisiteId && !state.upgrades.some((u) => u.upgradeId === def.prerequisiteId)) return;

    playGameSfx('upgrade');
    set({
      money: state.money - def.cost,
      upgrades: [...state.upgrades, { upgradeId, purchasedAtTick: state.tickCount }],
      notifications: [
        ...state.notifications,
        {
          id: `notif_${nextNotificationId++}`,
          message: `${def.icon} Unlocked ${def.name}!`,
          type: 'success',
          tick: state.tickCount,
        },
      ],
    });
  },

  ticketBooth: () => {
    const amount = randomInt(BALANCE.ticketBoothMin, BALANCE.ticketBoothMax);
    playGameSfx('cash_collect');
    set((state) => ({
      money: state.money + amount,
      totalMoneyEarned: state.totalMoneyEarned + amount,
    }));
    return amount;
  },

  tuneUp: () => {
    playGameSfx('ui_click');
    set((state) => ({
      money: state.money + BALANCE.tuneUpCash,
      totalMoneyEarned: state.totalMoneyEarned + BALANCE.tuneUpCash,
      happiness: clamp(state.happiness + BALANCE.tuneUpHappiness, 0, 100),
    }));
  },

  selectRide: (rideId: string | null) => {
    const prev = get().selectedRideId;
    set({ selectedRideId: rideId });
    if (rideId && rideId !== prev) {
      playGameSfx('ui_click');
    } else if (rideId === null && prev !== null) {
      playGameSfx('ui_toggle');
    }
  },

  setAudioSettings: (partial: Partial<AudioSettings>) => {
    set((state) => {
      const audioSettings = { ...state.audioSettings, ...partial };
      saveAudioSettings(audioSettings);
      return { audioSettings };
    });
  },

  dismissNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },
}));

export const useGameSelector = <T>(selector: (state: GameStore) => T): T => useGameStore(useShallow(selector));

export const selectMoney = (s: GameStore): number => s.money;
export const selectHappiness = (s: GameStore): number => s.happiness;
export const selectBattery = (s: GameStore): number => s.parkBattery;
export const selectRides = (s: GameStore): RideInstance[] => s.rides;
export const selectVisitors = (s: GameStore): Visitor[] => s.visitors;
export const selectParkDirt = (s: GameStore): number => s.parkDirt;
export const selectTickCount = (s: GameStore): number => s.tickCount;

export const selectIncomePerTick = (s: GameStore): number => {
  let income = 0;
  for (let i = 0; i < s.rides.length; i++) {
    const ride = s.rides[i];
    if (ride.status !== 'operating') continue;
    const def = getRideDefinition(ride.definitionId);
    if (!def) continue;
    income += ride.visitors * def.baseIncome * (1 + BALANCE.incomeMultPerLevel * (ride.level - 1));
  }
  return income;
};

export const selectTotalVisitors = (s: GameStore): number => {
  let total = 0;
  for (let i = 0; i < s.visitors.length; i++) {
    total += s.visitors[i].groupSize;
  }
  return total;
};

export const selectOperatingCount = (s: GameStore): number => {
  let count = 0;
  for (let i = 0; i < s.rides.length; i++) {
    if (s.rides[i].status === 'operating') count++;
  }
  return count;
};
