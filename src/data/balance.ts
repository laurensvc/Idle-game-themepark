export const BALANCE = {
  // --- Starting state ---
  startingMoney: 0,
  startingHappiness: 80,
  startingBattery: 0,

  // --- Battery / Power ---
  batteryDrainPerRide: 2,
  batteryRechargeAmount: 5,
  batteryUpgradeReduction: 0.25,

  // --- Revenue ---
  incomeMultPerLevel: 0.08,
  capacityMultPerLevel: 0.1,
  ticketBoothMin: 1,
  ticketBoothMax: 3,
  tuneUpCash: 1,
  tuneUpHappiness: 0.35,

  // --- Rides ---
  maxRideLevel: 10,
  levelUpCostExponent: 1.5,
  breakdownCooldownTicks: 30,

  // --- Dirt ---
  dirtBaseRate: 0.2,
  dirtPerOperatingRide: 0.1,
  cleanSweepAmount: 2,
  janitorCleanRate: 0.3,
  autoCleanRideRate: 0.2,

  // --- Happiness ---
  happinessLerpRate: 0.05,
  happinessBaseTarget: 50,
  happinessPerBrokenRide: -15,
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
