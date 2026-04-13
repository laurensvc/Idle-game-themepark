import type { RidePathEffectType } from '@/types/game';

/** Max stored level per track (each purchase adds +1; no purchase when level === cap). */
export const PATH_MAX_LEVEL = 22;

/** Next upgrade cost multiplier per current level: cost ∝ rideBaseCost * costScale * PATH_COST_GROWTH^level. */
export const PATH_COST_GROWTH = 3.3;

export interface PathTrackConfig {
  suffix: string;
  nameBase: string;
  description: string;
  icon: string;
  effectType: RidePathEffectType;
  /** cost = round(rideBaseCost * costScale * PATH_COST_GROWTH ** currentLevel) */
  costScale: number;
  /**
   * Purchase k (1-based) adds effectBase * effectGrowth^(k-1) to the path stat sum.
   * Total after L purchases is a finite geometric series (bounded by PATH_MAX_LEVEL).
   */
  effectBase: number;
  effectGrowth: number;
}

export const PATH_TRACKS: readonly PathTrackConfig[] = [
  {
    suffix: 'dispatch',
    nameBase: 'Faster dispatch',
    description: 'Shorter cycles — more throughput per second',
    icon: '⚡',
    effectType: 'throughput_pct',
    costScale: 0.16,
    effectBase: 0.028,
    effectGrowth: 1.07,
  },
  {
    suffix: 'seating',
    nameBase: 'Bigger vehicles',
    description: 'More guests per load',
    icon: '💺',
    effectType: 'capacity_pct',
    costScale: 0.18,
    effectBase: 0.034,
    effectGrowth: 1.065,
  },
  {
    suffix: 'pricing',
    nameBase: 'Premium pricing',
    description: 'Earn more per guest',
    icon: '💎',
    effectType: 'income_pct',
    costScale: 0.2,
    effectBase: 0.03,
    effectGrowth: 1.068,
  },
  {
    suffix: 'merch',
    nameBase: 'Gift shops',
    description: 'Snacks & souvenirs — extra per-guest spend',
    icon: '🎁',
    effectType: 'income_pct',
    costScale: 0.17,
    effectBase: 0.024,
    effectGrowth: 1.065,
  },
] as const;

export const PATH_TRACK_BY_SUFFIX: ReadonlyMap<string, PathTrackConfig> = new Map(
  PATH_TRACKS.map((t) => [t.suffix, t])
);

/** Total fractional bonus from `levels` purchases (geometric step sizes). */
export const pathTrackGeometricBonusTotal = (base: number, growth: number, levels: number): number => {
  if (levels <= 0) return 0;
  if (growth === 1) return base * levels;
  return (base * (Math.pow(growth, levels) - 1)) / (growth - 1);
};

export const getNextPathUpgradeCost = (rideBaseCost: number, track: PathTrackConfig, currentLevel: number): number =>
  Math.round(rideBaseCost * track.costScale * Math.pow(PATH_COST_GROWTH, currentLevel));
