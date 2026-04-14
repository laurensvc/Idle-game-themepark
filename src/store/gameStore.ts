import { playGameSfx } from '@/audio/soundManager';
import { BALANCE } from '@/config/balanceConfig';
import { PATH_MAX_LEVEL, PATH_TRACK_BY_SUFFIX, getNextPathUpgradeCost } from '@/config/ridePathConfig';
import { getRidePathStatMultipliers } from '@/data/ridePathUpgrades';
import { RIDE_DEFINITIONS, getRideDefinition } from '@/config/rideDataConfig';
import { UPGRADE_DEFINITIONS } from '@/config/upgradesConfig';
import { AUDIO_STORAGE_KEY, loadPersistedAudioSettings } from '@/lib/audioStorage';
import { loadGameFromLocalStorage } from '@/lib/gameSave';
import { clamp, randomInt } from '@/lib/utils';
import type {
  ActiveBuff,
  AudioSettings,
  GameState,
  GameStore,
  GoldenTicketState,
  PurchasedUpgrade,
  RideInstance,
  TicketBoothResult,
  Visitor,
} from '@/types/game';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

import { VISITOR_TYPES } from '@/config/gameConstants';
import { rideDefinitionOrderIndex } from '@/lib/rideDiscovery';

const getTicketCashBuffMultiplier = (activeBuffs: ActiveBuff[]): number => {
  let m = 1;
  for (let i = 0; i < activeBuffs.length; i++) {
    if (activeBuffs[i].kind === 'ticket_cash') m *= activeBuffs[i].magnitude;
  }
  return m;
};

const UPGRADE_BY_ID = new Map(UPGRADE_DEFINITIONS.map((d) => [d.id, d]));

let nextRideInstanceId = 1;
// State variables remain local for ID generation
let nextVisitorId = 1;
let nextNotificationId = 1;
let nextBuffId = 1;

const maxIdSuffix = (ids: readonly string[], prefix: string): number => {
  let max = 0;
  const pl = prefix.length;
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    if (!id.startsWith(prefix)) continue;
    const n = Number(id.slice(pl));
    if (Number.isFinite(n)) max = Math.max(max, n);
  }
  return max;
};

/** After hydrating from JSON, bump module counters so new entities never reuse saved IDs. */
export const syncIdCountersFromState = (state: GameState): void => {
  const rideIds = state.rides.map((r) => r.id);
  const visitorIds = state.visitors.map((v) => v.id);
  const notifIds = state.notifications.map((n) => n.id);
  const buffIds = state.activeBuffs.map((b) => b.id);
  nextRideInstanceId = maxIdSuffix(rideIds, 'ride_') + 1;
  nextVisitorId = maxIdSuffix(visitorIds, 'v_') + 1;
  nextNotificationId = maxIdSuffix(notifIds, 'notif_') + 1;
  nextBuffId = maxIdSuffix(buffIds, 'buff_') + 1;
};

const getUpgradeIncomeMultiplier = (upgrades: PurchasedUpgrade[]): number => {
  let incomeMult = 1;
  for (let i = 0; i < upgrades.length; i++) {
    const def = UPGRADE_BY_ID.get(upgrades[i].upgradeId);
    if (!def || def.effect.type !== 'income_boost') continue;
    incomeMult += def.effect.value;
  }
  return incomeMult;
};

/** Active buffs multiply per stack of the same kind. */
/** Multiplies ticket booth cash from park rides (was “ride income”). */
const getRideIncomeBuffMultiplier = (activeBuffs: ActiveBuff[]): number => {
  let m = 1;
  for (let i = 0; i < activeBuffs.length; i++) {
    if (activeBuffs[i].kind === 'ride_income') m *= activeBuffs[i].magnitude;
  }
  return m;
};

/**
 * Sum of (visitors × baseIncome × path income multipliers) × global income upgrades × ride frenzy buff.
 * Ticket booth multiplies its dice roll by this (minimum 1 so the booth always pays something).
 */
const getParkTicketValueMultiplier = (
  rides: RideInstance[],
  upgrades: PurchasedUpgrade[],
  rideIncomeBuffMult: number
): number => {
  const incomeMult = getUpgradeIncomeMultiplier(upgrades);
  let sum = 0;
  for (let i = 0; i < rides.length; i++) {
    const ride = rides[i];
    const def = getRideDefinition(ride.definitionId);
    if (!def) continue;
    const pathM = getRidePathStatMultipliers(ride.pathTrackLevels, ride.definitionId);
    sum += ride.visitors * def.baseIncome * pathM.income;
  }
  const raw = sum * incomeMult * rideIncomeBuffMult;
  return Math.max(1, raw);
};

const getVisitorSpawnBuffMultiplier = (activeBuffs: ActiveBuff[]): number => {
  let m = 1;
  for (let i = 0; i < activeBuffs.length; i++) {
    if (activeBuffs[i].kind === 'visitor_spawn') m *= activeBuffs[i].magnitude;
  }
  return m;
};

const scheduleGoldenSpawn = (fromTick: number): number =>
  fromTick + randomInt(BALANCE.goldenSpawnMinTicks, BALANCE.goldenSpawnMaxTicks);

const createRideInstance = (definitionId: string): RideInstance => ({
  id: `ride_${nextRideInstanceId++}`,
  definitionId,
  ticksSincePurchase: 0,
  visitors: 0,
  pathTrackLevels: {},
});

const saveAudioSettings = (settings: AudioSettings): void => {
  try {
    localStorage.setItem(AUDIO_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    /* ignore */
  }
};

// No changes to this function logic as it relies on the BALANCE constants imported above.

const initialGoldenTicket = (): GoldenTicketState => ({
  visible: false,
  expiresAtTick: 0,
  spawnAfterTick: scheduleGoldenSpawn(0),
  variant: 0,
});

const createDefaultGameState = (): GameState => {
  const starterRide = createRideInstance('ferris_wheel');
  return {
    money: BALANCE.startingMoney,
    rides: [starterRide],
    happiness: BALANCE.startingHappiness,
    visitors: [],
    upgrades: [],
    notifications: [],
    tickCount: 0,
    totalMoneyEarned: 0,
    totalVisitorsServed: 0,
    audioSettings: loadPersistedAudioSettings(),
    selectedRideId: starterRide.id,
    activeBuffs: [],
    goldenTicket: initialGoldenTicket(),
    ticketComboCount: 0,
    lastTicketClickMs: 0,
    ticketStock: 0,
    bankedTicketCash: 0,
  };
};

const loadedGame = loadGameFromLocalStorage();
const initialState: GameState = (() => {
  if (loadedGame) {
    syncIdCountersFromState(loadedGame);
    saveAudioSettings(loadedGame.audioSettings);
    return loadedGame;
  }
  return createDefaultGameState();
})();

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  tick: () => {
    set((state) => {
      const newTickCount = state.tickCount + 1;
      let totalVisitorsServed = state.totalVisitorsServed;
      const prevRides = state.rides;
      const notifications = [...state.notifications];
      const upgrades = state.upgrades;

      const activeBuffsFiltered: ActiveBuff[] = [];
      for (let i = 0; i < state.activeBuffs.length; i++) {
        const b = state.activeBuffs[i];
        if (b.expiresAtTick > newTickCount) activeBuffsFiltered.push(b);
      }
      const visitorSpawnBuffMult = getVisitorSpawnBuffMultiplier(activeBuffsFiltered);

      let goldenTicket: GoldenTicketState = { ...state.goldenTicket };
      if (goldenTicket.visible && newTickCount >= goldenTicket.expiresAtTick) {
        goldenTicket = {
          visible: false,
          expiresAtTick: 0,
          spawnAfterTick: scheduleGoldenSpawn(newTickCount),
          variant: goldenTicket.variant,
        };
        playGameSfx('warning');
        notifications.push({
          id: `notif_${nextNotificationId++}`,
          message: 'Golden ticket expired!',
          type: 'warning',
          tick: newTickCount,
        });
      } else if (!goldenTicket.visible && newTickCount >= goldenTicket.spawnAfterTick) {
        goldenTicket = {
          visible: true,
          expiresAtTick: newTickCount + BALANCE.goldenLifetimeTicks,
          spawnAfterTick: goldenTicket.spawnAfterTick,
          variant: randomInt(0, 2),
        };
      }

      let happinessBoost = 0;
      let visitorAttractionMult = 1;
      let capacityMult = 1;
      for (let i = 0; i < upgrades.length; i++) {
        const def = UPGRADE_BY_ID.get(upgrades[i].upgradeId);
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
            break;
        }
      }

      visitorAttractionMult *= visitorSpawnBuffMult;

      const operatingCount = prevRides.length;
      const newRides: RideInstance[] = [];

      for (let i = 0; i < prevRides.length; i++) {
        const ride = prevRides[i];
        const ticksSincePurchase = ride.ticksSincePurchase + 1;
        const def = getRideDefinition(ride.definitionId);
        if (!def) {
          newRides.push({ ...ride, ticksSincePurchase });
          continue;
        }

        const pathM = getRidePathStatMultipliers(ride.pathTrackLevels, ride.definitionId);
        const capacity = Math.round(def.baseCapacity * pathM.capacity * capacityMult);
        const happinessFactor = state.happiness / 100;
        const visitors = Math.round(capacity * happinessFactor);
        newRides.push({ ...ride, ticksSincePurchase, visitors });
      }

      const happinessTarget = clamp(
        BALANCE.happinessBaseTarget + operatingCount * BALANCE.happinessPerOperatingRide + happinessBoost,
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
        money: state.money,
        rides: newRides,
        happiness,
        visitors,
        tickCount: newTickCount,
        totalMoneyEarned: state.totalMoneyEarned,
        totalVisitorsServed,
        notifications: [...notifications],
        activeBuffs: activeBuffsFiltered,
        goldenTicket,
      };
    });
  },

  buyRide: (definitionId: string) => {
    const state = get();
    const def = RIDE_DEFINITIONS.find((r) => r.id === definitionId);
    if (!def || state.money < def.baseCost) return;
    if (state.rides.some((r) => r.definitionId === definitionId)) return;

    const orderIdx = rideDefinitionOrderIndex(definitionId);
    if (orderIdx < 0) return;
    if (orderIdx > 0) {
      const prevId = RIDE_DEFINITIONS[orderIdx - 1]?.id;
      if (!prevId || !state.rides.some((r) => r.definitionId === prevId)) return;
    }

    playGameSfx('purchase');
    const nextDef = RIDE_DEFINITIONS[orderIdx + 1];
    const notifs = [
      ...state.notifications,
      {
        id: `notif_${nextNotificationId++}`,
        message: `${def.emoji} Built ${def.name}!`,
        type: 'success' as const,
        tick: state.tickCount,
      },
    ];
    if (nextDef && !state.rides.some((r) => r.definitionId === nextDef.id)) {
      notifs.push({
        id: `notif_${nextNotificationId++}`,
        message: `Blueprint unlocked: ${nextDef.emoji} ${nextDef.name}`,
        type: 'success',
        tick: state.tickCount,
      });
    }
    while (notifs.length > BALANCE.maxNotifications) {
      notifs.shift();
    }

    set({
      money: state.money - def.baseCost,
      rides: [...state.rides, createRideInstance(definitionId)],
      notifications: notifs,
    });
  },

  purchaseRidePathUpgrade: (rideId: string, trackSuffix: string) => {
    const state = get();
    const rideIndex = state.rides.findIndex((r) => r.id === rideId);
    if (rideIndex === -1) return;
    const ride = state.rides[rideIndex];
    const track = PATH_TRACK_BY_SUFFIX.get(trackSuffix);
    if (!track) return;

    const level = ride.pathTrackLevels[trackSuffix] ?? 0;
    if (level >= PATH_MAX_LEVEL) return;

    const rideDef = getRideDefinition(ride.definitionId);
    if (!rideDef) return;

    const cost = getNextPathUpgradeCost(rideDef.baseCost, track, level);
    if (state.money < cost) return;

    playGameSfx('upgrade');
    const newRides = [...state.rides];
    newRides[rideIndex] = {
      ...ride,
      pathTrackLevels: { ...ride.pathTrackLevels, [trackSuffix]: level + 1 },
    };
    set({
      money: state.money - cost,
      rides: newRides,
      notifications: [
        ...state.notifications,
        {
          id: `notif_${nextNotificationId++}`,
          message: `${rideDef.emoji} ${track.nameBase} → level ${level + 1}`,
          type: 'success',
          tick: state.tickCount,
        },
      ],
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

  ticketBooth: (clickMs: number): TicketBoothResult => {
    const state = get();
    const activeBuffs = state.activeBuffs.filter((b) => b.expiresAtTick > state.tickCount);
    const ticketBuffMult = getTicketCashBuffMultiplier(activeBuffs);
    const rideIncomeBuffMult = getRideIncomeBuffMultiplier(activeBuffs);
    const parkTicketMult = getParkTicketValueMultiplier(state.rides, state.upgrades, rideIncomeBuffMult);

    const comboExpired = clickMs - state.lastTicketClickMs > BALANCE.comboWindowMs;
    const combo = comboExpired ? 1 : Math.min(state.ticketComboCount + 1, BALANCE.comboMaxStacks);

    const base = randomInt(BALANCE.ticketBoothMin, BALANCE.ticketBoothMax);
    const comboMult = 1 + (combo - 1) * BALANCE.comboBonusPerStack;
    const isCrit = Math.random() < BALANCE.critChance;
    const critMult = isCrit ? BALANCE.critIncomeMultiplier : 1;
    const rollAmount = Math.max(1, Math.round(base * comboMult * critMult * ticketBuffMult * parkTicketMult));

    const maxStock = BALANCE.ticketStockMax;
    const atCap = state.ticketStock >= maxStock;

    // Bar full: tap pays out (combo timing still updates on this tap).
    if (atCap) {
      const total = state.bankedTicketCash;
      if (total > 0) {
        playGameSfx('cash_in');
        set({
          money: state.money + total,
          totalMoneyEarned: state.totalMoneyEarned + total,
          ticketStock: 0,
          bankedTicketCash: 0,
          ticketComboCount: combo,
          lastTicketClickMs: clickMs,
          activeBuffs,
        });
        return {
          amount: total,
          isCrit: false,
          comboLevel: combo,
          mode: 'cash_in',
          stockAfter: 0,
          bankedAfter: 0,
        };
      }
      set({ ticketStock: 0, ticketComboCount: combo, lastTicketClickMs: clickMs, activeBuffs });
      return {
        amount: 0,
        isCrit: false,
        comboLevel: combo,
        mode: 'cash_in',
        stockAfter: 0,
        bankedAfter: 0,
      };
    }

    const stockGain = isCrit
      ? BALANCE.ticketStockGainPerTap + BALANCE.ticketStockCritExtra
      : BALANCE.ticketStockGainPerTap;
    const newStock = Math.min(maxStock, state.ticketStock + stockGain);
    const newBanked = state.bankedTicketCash + rollAmount;

    if (isCrit) playGameSfx('crit_hit');
    else playGameSfx('ui_click');

    set({
      bankedTicketCash: newBanked,
      ticketStock: newStock,
      ticketComboCount: combo,
      lastTicketClickMs: clickMs,
      activeBuffs,
    });

    return {
      amount: rollAmount,
      isCrit,
      comboLevel: combo,
      mode: 'fill',
      stockAfter: newStock,
      bankedAfter: newBanked,
    };
  },

  cashInTicketBooth: (): TicketBoothResult | null => {
    const state = get();
    const activeBuffs = state.activeBuffs.filter((b) => b.expiresAtTick > state.tickCount);
    const total = state.bankedTicketCash;
    if (total <= 0) {
      if (state.ticketStock > 0) {
        set({ ticketStock: 0, activeBuffs });
      }
      return null;
    }

    playGameSfx('cash_in');
    set({
      money: state.money + total,
      totalMoneyEarned: state.totalMoneyEarned + total,
      ticketStock: 0,
      bankedTicketCash: 0,
      activeBuffs,
    });
    return {
      amount: total,
      isCrit: false,
      comboLevel: state.ticketComboCount,
      mode: 'cash_in',
      stockAfter: 0,
      bankedAfter: 0,
    };
  },

  collectGoldenTicket: () => {
    const state = get();
    if (!state.goldenTicket.visible) return;

    playGameSfx('golden_ticket');
    const tick = state.tickCount;
    const roll = Math.random();
    let happyDelta = 0;
    const newBuffs = state.activeBuffs.filter((b) => b.expiresAtTick > tick);
    const notifs = [...state.notifications];

    const pushBuff = (kind: ActiveBuff['kind'], durationTicks: number, magnitude: number): void => {
      newBuffs.push({
        id: `buff_${nextBuffId++}`,
        kind,
        expiresAtTick: tick + durationTicks,
        magnitude,
      });
    };

    if (roll < 0.3) {
      pushBuff('ticket_cash', Math.round(BALANCE.buffTicketRushTicks * 1.4), 2.5);
      notifs.push({
        id: `notif_${nextNotificationId++}`,
        message: `🎫 Golden bonus: 2.5× ticket booth for a bit!`,
        type: 'success',
        tick,
      });
    } else if (roll < 0.52) {
      pushBuff('ride_income', BALANCE.buffRideIncomeFrenzyTicks, BALANCE.buffRideIncomeFrenzyMult);
      notifs.push({
        id: `notif_${nextNotificationId++}`,
        message: `⚡ Ride frenzy: ${BALANCE.buffRideIncomeFrenzyMult}× ticket booth from park!`,
        type: 'success',
        tick,
      });
    } else if (roll < 0.72) {
      pushBuff('ticket_cash', BALANCE.buffTicketRushTicks, BALANCE.buffTicketRushMult);
      notifs.push({
        id: `notif_${nextNotificationId++}`,
        message: `🎟️ Ticket rush: ${BALANCE.buffTicketRushMult}× booth cash!`,
        type: 'success',
        tick,
      });
    } else if (roll < 0.87) {
      pushBuff('visitor_spawn', BALANCE.buffVisitorSurgeTicks, BALANCE.buffVisitorSurgeMult);
      notifs.push({
        id: `notif_${nextNotificationId++}`,
        message: `👥 Visitor surge: bigger crowds incoming!`,
        type: 'success',
        tick,
      });
    } else {
      happyDelta = BALANCE.goldenHappinessBump;
      pushBuff('ticket_cash', BALANCE.buffTicketRushTicks, 1.75);
      notifs.push({
        id: `notif_${nextNotificationId++}`,
        message: `🌟 VIP visit: mood boost + 1.75× tickets for a bit!`,
        type: 'success',
        tick,
      });
    }

    while (notifs.length > BALANCE.maxNotifications) {
      notifs.shift();
    }

    set({
      happiness: clamp(state.happiness + happyDelta, 0, 100),
      activeBuffs: newBuffs,
      goldenTicket: {
        visible: false,
        expiresAtTick: 0,
        spawnAfterTick: scheduleGoldenSpawn(tick),
        variant: state.goldenTicket.variant,
      },
      notifications: notifs,
    });
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
export const selectRides = (s: GameStore): RideInstance[] => s.rides;
export const selectVisitors = (s: GameStore): Visitor[] => s.visitors;
export const selectTickCount = (s: GameStore): number => s.tickCount;

/** Typical ticket tap (avg dice × park rides × upgrades × buffs); excludes combo/crit variance. */
export const selectEstimatedAvgTicketCash = (s: GameStore): number => {
  const activeBuffs = s.activeBuffs.filter((b) => b.expiresAtTick > s.tickCount);
  const avgBase = (BALANCE.ticketBoothMin + BALANCE.ticketBoothMax) / 2;
  const parkMult = getParkTicketValueMultiplier(s.rides, s.upgrades, getRideIncomeBuffMultiplier(activeBuffs));
  const ticketBuff = getTicketCashBuffMultiplier(activeBuffs);
  return Math.max(1, Math.round(avgBase * parkMult * ticketBuff));
};

/**
 * Primitive snapshot for buff UI. Returning a new array from a selector breaks
 * useSyncExternalStore (e.g. React Strict Mode double getSnapshot) because each
 * filter() call is a new reference even when data is unchanged.
 */
export const selectActiveBuffsSnapshot = (s: GameStore): string => {
  const tick = s.tickCount;
  const buffs = s.activeBuffs.filter((b) => b.expiresAtTick > tick);
  return JSON.stringify({ tick, buffs });
};

export const selectGoldenTicket = (s: GameStore): GoldenTicketState => s.goldenTicket;

export const selectTotalVisitors = (s: GameStore): number => {
  let total = 0;
  for (let i = 0; i < s.visitors.length; i++) {
    total += s.visitors[i].groupSize;
  }
  return total;
};

export const selectOperatingCount = (s: GameStore): number => s.rides.length;
