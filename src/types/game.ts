export type RideStatus = 'idle' | 'operating' | 'broken' | 'repairing';

export interface RideDefinition {
  id: string;
  name: string;
  emoji: string;
  baseCost: number;
  baseIncome: number;
  baseCapacity: number;
  breakdownChance: number;
  repairTime: number;
  baseLevelUpCost: number;
  dirtRate: number;
  category: 'gentle' | 'thrill' | 'water' | 'family';
}

export interface RideInstance {
  id: string;
  definitionId: string;
  status: RideStatus;
  level: number;
  ticksSincePurchase: number;
  breakdownCooldown: number;
  repairProgress: number;
  dirt: number;
  visitors: number;
}

export type VisitorType = 'family' | 'thrill_seeker' | 'child' | 'elderly' | 'teen';

export interface Visitor {
  id: string;
  type: VisitorType;
  ticksRemaining: number;
  groupSize: number;
}

export type UpgradeCategory = 'global' | 'ride';

export interface UpgradeEffect {
  type:
    | 'visitor_attraction'
    | 'auto_clean'
    | 'happiness_boost'
    | 'auto_repair'
    | 'capacity_boost'
    | 'income_boost'
    | 'breakdown_reduction'
    | 'battery_efficiency'
    | 'janitor';
  value: number;
}

export interface UpgradeDefinition {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: UpgradeCategory;
  effect: UpgradeEffect;
  prerequisiteId?: string;
  icon: string;
}

export interface PurchasedUpgrade {
  upgradeId: string;
  purchasedAtTick: number;
}

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface GameNotification {
  id: string;
  message: string;
  type: NotificationType;
  tick: number;
}

export interface AudioSettings {
  isMuted: boolean;
  masterVolume: number;
  sfxVolume: number;
  musicVolume: number;
}

export interface GameState {
  money: number;
  rides: RideInstance[];
  parkBattery: number;
  happiness: number;
  parkDirt: number;
  visitors: Visitor[];
  upgrades: PurchasedUpgrade[];
  notifications: GameNotification[];
  tickCount: number;
  totalMoneyEarned: number;
  totalVisitorsServed: number;
  audioSettings: AudioSettings;
  selectedRideId: string | null;
}

export interface GameActions {
  tick: () => void;
  buyRide: (definitionId: string) => void;
  levelUpRide: (rideId: string) => void;
  toggleRide: (rideId: string) => void;
  repairRide: (rideId: string) => void;
  rechargeBattery: () => void;
  cleanPark: () => void;
  buyUpgrade: (upgradeId: string) => void;
  ticketBooth: () => number;
  tuneUp: () => void;
  selectRide: (rideId: string | null) => void;
  setAudioSettings: (settings: Partial<AudioSettings>) => void;
  dismissNotification: (id: string) => void;
}

export type GameStore = GameState & GameActions;
