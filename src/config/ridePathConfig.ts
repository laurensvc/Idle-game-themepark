import type { RidePathEffect } from '@/types/game';

export const TIER_NAMES = [' I', ' II', ' III'] as const;

export const TIERS = 3 as const;

// Type definition for a track configuration item
interface TrackDefinition {
  suffix: string;
  nameBase: string;
  desc: string;
  icon: string;
  makeEffect: (tier: number) => RidePathEffect;
}

export const TRACKS: Array<TrackDefinition> = [
  {
    suffix: 'dispatch',
    nameBase: 'Faster dispatch',
    desc: 'Shorter cycles — more throughput per second',
    icon: '⚡',
    makeEffect: (tier) => ({ type: 'throughput_pct', value: 0.07 + tier * 0.045 }),
  },
  {
    suffix: 'seating',
    nameBase: 'Bigger vehicles',
    desc: 'More guests per load',
    icon: '💺',
    makeEffect: (tier) => ({ type: 'capacity_pct', value: 0.1 + tier * 0.06 }),
  },
  {
    suffix: 'pricing',
    nameBase: 'Premium pricing',
    desc: 'Earn more per guest',
    icon: '💎',
    makeEffect: (tier) => ({ type: 'income_pct', value: 0.08 + tier * 0.05 }),
  },
  {
    suffix: 'merch',
    nameBase: 'Gift shops',
    desc: 'Snacks & souvenirs — extra per-guest spend',
    icon: '🎁',
    makeEffect: (tier) => ({ type: 'income_pct', value: 0.06 + tier * 0.04 }),
  },
];
