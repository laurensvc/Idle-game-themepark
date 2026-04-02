export type RideStatus = 'idle' | 'operating' | 'broken' | 'repairing' | 'locked';

export type VisitorType = 'family' | 'thrill_seeker' | 'child' | 'elderly' | 'teen';

export type NotificationType = 'breakdown' | 'repair' | 'visitor' | 'income' | 'upgrade' | 'warning';

export interface RideDefinition {
  id: string;
  name: string;
  icon: string;
  thrillLevel: number; // 1-5
  baseCostPerTick: number;
  baseCapacity: number;
  breakdownChance: number; // 0-1 per minute
  repairTime: number; // seconds
  unlockCost: number;
  maxLevel: number;
  baseLevelUpCost: number;
  attractedVisitors: VisitorType[];
  description: string;
  gridColor: string;
}

export interface Ride {
  definitionId: string;
  instanceId: string;
  status: RideStatus;
  dirtLevel: number; // 0-100
  currentVisitors: number;
  totalVisitorsServed: number;
  repairProgress: number; // 0-100
  isAutoRepair: boolean;
  level: number;
  ticksSinceLastBreakdown: number;
  pendingCash: number;
}

export interface UpgradeDefinition {
  id: string;
  name: string;
  description: string;
  cost: number;
  rideId?: string; // if undefined, global upgrade
  effect:
    | 'auto_repair'
    | 'capacity_boost'
    | 'income_boost'
    | 'breakdown_reduction'
    | 'auto_clean'
    | 'visitor_attraction';
  value: number;
  requires?: string; // upgrade id prerequisite
}

export interface VisitorGroup {
  id: string;
  type: VisitorType;
  size: number;
  happiness: number; // 0-100
  spendingPower: number;
  targetRideId?: string;
  timeInPark: number; // ticks
}

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  timestamp: number;
  rideInstanceId?: string;
}

export interface GameStats {
  totalEarnings: number;
  totalVisitors: number;
  peakVisitors: number;
  ridesFixed: number;
  timePlayed: number; // seconds
}

export interface GameState {
  money: number;
  rides: Ride[];
  visitors: VisitorGroup[];
  parkDirt: number; // 0-100 global cleanliness
  parkHappiness: number; // 0-100
  notifications: Notification[];
  purchasedUpgrades: string[];
  isAudioMuted: boolean;
  masterVolume: number; // 0-1
  sfxVolume: number; // 0-1
  stats: GameStats;
  gameTick: number;
  isPaused: boolean;
  isAutoCleanEnabled: boolean;
  selectedRideId: string | null;
}
