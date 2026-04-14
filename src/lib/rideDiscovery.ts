import { RIDE_DEFINITIONS } from '@/config/rideDataConfig';
import type { RideDefinition } from '@/types/game';

export type RideShopDiscovery = 'owned' | 'undiscovered' | 'discovered';

export const rideDefinitionOrderIndex = (definitionId: string): number =>
  RIDE_DEFINITIONS.findIndex((d) => d.id === definitionId);

/**
 * Shop visibility: rides stay "undiscovered" until the previous definition in `RIDE_DEFINITIONS` is owned.
 */
export const getRideShopDiscovery = (def: RideDefinition, ownedDefinitionIds: Set<string>): RideShopDiscovery => {
  if (ownedDefinitionIds.has(def.id)) return 'owned';
  const i = rideDefinitionOrderIndex(def.id);
  if (i <= 0) return 'discovered';
  const prevId = RIDE_DEFINITIONS[i - 1]?.id;
  if (!prevId || !ownedDefinitionIds.has(prevId)) return 'undiscovered';
  return 'discovered';
};

export const prerequisiteRideName = (definitionId: string): string | undefined => {
  const i = rideDefinitionOrderIndex(definitionId);
  if (i <= 0) return undefined;
  return RIDE_DEFINITIONS[i - 1]?.name;
};
