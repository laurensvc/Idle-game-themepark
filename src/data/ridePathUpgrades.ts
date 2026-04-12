import type { RidePathEffect, RidePathUpgradeDefinition } from '@/types/game';
import { RIDE_DEFINITIONS } from './rides';

const TIER_NAMES = [' I', ' II', ' III'] as const;

const TRACKS: Array<{
  suffix: string;
  nameBase: string;
  desc: string;
  icon: string;
  makeEffect: (tier: 0 | 1 | 2) => RidePathEffect;
}> = [
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

const TIERS = 3 as const;

function buildPathDefinitions(): RidePathUpgradeDefinition[] {
  const out: RidePathUpgradeDefinition[] = [];
  for (const ride of RIDE_DEFINITIONS) {
    TRACKS.forEach((track, trackIdx) => {
      for (let tier = 0; tier < TIERS; tier++) {
        const id = `${ride.id}_path_${track.suffix}_${tier}`;
        const prerequisiteId = tier > 0 ? `${ride.id}_path_${track.suffix}_${tier - 1}` : undefined;
        const cost = Math.round(ride.baseCost * (0.18 + tier * 0.12 + trackIdx * 0.03));
        out.push({
          id,
          rideId: ride.id,
          name: `${track.nameBase}${TIER_NAMES[tier]}`,
          description: track.desc,
          icon: track.icon,
          cost,
          prerequisiteId,
          effects: [track.makeEffect(tier as 0 | 1 | 2)],
        });
      }
    });
  }
  return out;
}

export const RIDE_PATH_UPGRADES: RidePathUpgradeDefinition[] = buildPathDefinitions();

export const RIDE_PATH_BY_ID: Record<string, RidePathUpgradeDefinition> = Object.fromEntries(
  RIDE_PATH_UPGRADES.map((u) => [u.id, u])
);

export const getPathUpgradeDefinition = (id: string): RidePathUpgradeDefinition | undefined => RIDE_PATH_BY_ID[id];

export const getPathUpgradesForRide = (rideDefinitionId: string): RidePathUpgradeDefinition[] =>
  RIDE_PATH_UPGRADES.filter((u) => u.rideId === rideDefinitionId);

/** Stacking: capacity and income paths add fractional bonuses. */
export const getRidePathStatMultipliers = (
  purchasedPathIds: readonly string[],
  definitionId: string
): { capacity: number; income: number } => {
  let capacity = 1;
  let income = 1;

  for (let i = 0; i < purchasedPathIds.length; i++) {
    const u = RIDE_PATH_BY_ID[purchasedPathIds[i]];
    if (!u || u.rideId !== definitionId) continue;
    for (let j = 0; j < u.effects.length; j++) {
      const e = u.effects[j];
      if (e.type === 'capacity_pct') capacity += e.value;
      if (e.type === 'income_pct' || e.type === 'throughput_pct') income += e.value;
    }
  }

  return { capacity, income };
};
