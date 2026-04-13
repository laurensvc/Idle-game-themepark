export const BALANCE = {
  // --- Starting state ---
  startingMoney: 10000000000,
  startingHappiness: 80,

  // --- Revenue ---
  ticketBoothMin: 1,
  ticketBoothMax: 3,

  /** Consecutive ticket taps within this window (ms) build combo. */
  comboWindowMs: 2500,
  comboMaxStacks: 12,
  /** Extra multiplier per stack after the first: effective = 1 + (stacks-1) * bonus. */
  comboBonusPerStack: 0.12,
  critChance: 0.04,
  critIncomeMultiplier: 8,

  // --- Golden ticket ---
  goldenSpawnMinTicks: 45,
  goldenSpawnMaxTicks: 120,
  goldenLifetimeTicks: 12,
  goldenMoneyMin: 15,
  goldenMoneyMax: 80,
  goldenHappinessBump: 14,
  goldenVipTipMin: 12,
  goldenVipTipMax: 48,

  // --- Timed buffs (durations in ticks ≈ seconds) ---
  buffRideIncomeFrenzyTicks: 28,
  buffRideIncomeFrenzyMult: 2,
  buffTicketRushTicks: 22,
  buffTicketRushMult: 2,
  buffVisitorSurgeTicks: 32,
  buffVisitorSurgeMult: 1.55,

  // --- Happiness ---
  happinessLerpRate: 0.05,
  happinessBaseTarget: 50,
  happinessPerOperatingRide: 5,
  happinessLeaveThreshold: 20,

  // --- Visitors ---
  visitorSpawnInterval: 5,
  visitorLifespan: 120,
  visitorGroupMin: 1,
  visitorGroupMax: 4,
  visitorSpawnPerOperatingRide: 0.5,

  // --- Notifications ---
  maxNotifications: 20,
} as const;
