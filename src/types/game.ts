export interface RideDefinition {
  id: string;
  name: string;
  emoji: string;
  baseCost: number;
  baseIncome: number;
  baseCapacity: number;
  category: 'gentle' | 'thrill' | 'water' | 'family';
}

/** Per-ride path upgrade (one-time purchase per node; parallel tracks per ride type). */
export type RidePathEffectType = 'capacity_pct' | 'income_pct' | 'throughput_pct';

export interface RidePathEffect {
  type: RidePathEffectType;
  /** Fractional bonus, e.g. 0.1 = +10% capacity or income. */
  value: number;
}

export interface RidePathUpgradeDefinition {
  id: string;
  rideId: string;
  name: string;
  description: string;
  icon: string;
  cost: number;
  prerequisiteId?: string;
  effects: RidePathEffect[];
}

export interface RideInstance {
  id: string;
  definitionId: string;
  ticksSincePurchase: number;
  visitors: number;
  /** Purchased node ids from `ridePathUpgrades` for this ride type. */
  purchasedPathIds: string[];
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
  type: 'visitor_attraction' | 'happiness_boost' | 'capacity_boost' | 'income_boost';
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

/** Timed buffs from golden ticket / future systems. Stacking: multiply magnitudes of the same kind. */
export type ActiveBuffKind = 'ride_income' | 'ticket_cash' | 'visitor_spawn';

export interface ActiveBuff {
  id: string;
  kind: ActiveBuffKind;
  expiresAtTick: number;
  /** Multiplier applied to the relevant stat (e.g. 2 = double). */
  magnitude: number;
}

export interface GoldenTicketState {
  visible: boolean;
  /** First tick index at which the ticket is gone if not collected (miss). */
  expiresAtTick: number;
  /** Spawn rolls when tickCount reaches this while not visible. */
  spawnAfterTick: number;
  variant: number;
}

export interface TicketBoothResult {
  amount: number;
  isCrit: boolean;
  comboLevel: number;
}

export interface GameState {
  money: number;
  rides: RideInstance[];
  happiness: number;
  visitors: Visitor[];
  upgrades: PurchasedUpgrade[];
  notifications: GameNotification[];
  tickCount: number;
  totalMoneyEarned: number;
  totalVisitorsServed: number;
  audioSettings: AudioSettings;
  selectedRideId: string | null;
  activeBuffs: ActiveBuff[];
  goldenTicket: GoldenTicketState;
  ticketComboCount: number;
  lastTicketClickMs: number;
}

export interface GameActions {
  tick: () => void;
  buyRide: (definitionId: string) => void;
  purchaseRidePathUpgrade: (rideId: string, pathUpgradeId: string) => void;
  buyUpgrade: (upgradeId: string) => void;
  /** `clickMs` should be `performance.now()` from the click handler for combo timing. */
  ticketBooth: (clickMs: number) => TicketBoothResult;
  collectGoldenTicket: () => void;
  selectRide: (rideId: string | null) => void;
  setAudioSettings: (settings: Partial<AudioSettings>) => void;
  dismissNotification: (id: string) => void;
}

export type GameStore = GameState & GameActions;
