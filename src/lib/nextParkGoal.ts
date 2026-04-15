import { getRideDefinition, RIDE_DEFINITIONS } from '@/config/rideDataConfig';
import { getNextPathUpgradeCost, PATH_MAX_LEVEL, PATH_TRACKS } from '@/config/ridePathConfig';
import { UPGRADE_DEFINITIONS } from '@/config/upgradesConfig';
import { getRideShopDiscovery } from '@/lib/rideDiscovery';
import type { RideInstance } from '@/types/game';

export type NextParkGoal =
  | { kind: 'ride'; id: string; label: string; emoji: string; cost: number }
  | { kind: 'upgrade'; id: string; label: string; icon: string; cost: number }
  | {
      kind: 'path';
      rideId: string;
      rideEmoji: string;
      rideName: string;
      trackSuffix: string;
      trackName: string;
      cost: number;
    };

const typeTieBreak = (c: NextParkGoal): number => (c.kind === 'ride' ? 0 : c.kind === 'path' ? 1 : 2);

/**
 * Cheapest remaining purchase (ride, path track, or upgrade) so the UI can show one clear savings target.
 */
export const pickNextParkGoal = (
  money: number,
  rides: RideInstance[],
  purchasedUpgradeIds: Set<string>
): { goal: NextParkGoal; canAfford: boolean } | null => {
  const ownedDefIds = new Set(rides.map((r) => r.definitionId));
  const candidates: NextParkGoal[] = [];

  for (const def of RIDE_DEFINITIONS) {
    if (ownedDefIds.has(def.id)) continue;
    if (getRideShopDiscovery(def, ownedDefIds) !== 'discovered') continue;
    candidates.push({ kind: 'ride', id: def.id, label: def.name, emoji: def.emoji, cost: def.baseCost });
  }

  for (const up of UPGRADE_DEFINITIONS) {
    if (purchasedUpgradeIds.has(up.id)) continue;
    if (up.prerequisiteId && !purchasedUpgradeIds.has(up.prerequisiteId)) continue;
    candidates.push({ kind: 'upgrade', id: up.id, label: up.name, icon: up.icon, cost: up.cost });
  }

  for (const ride of rides) {
    const rideDef = getRideDefinition(ride.definitionId);
    if (!rideDef) continue;
    for (const track of PATH_TRACKS) {
      const level = ride.pathTrackLevels[track.suffix] ?? 0;
      if (level >= PATH_MAX_LEVEL) continue;
      const cost = getNextPathUpgradeCost(rideDef.baseCost, track, level);
      candidates.push({
        kind: 'path',
        rideId: ride.id,
        rideEmoji: rideDef.emoji,
        rideName: rideDef.name,
        trackSuffix: track.suffix,
        trackName: track.nameBase,
        cost,
      });
    }
  }

  if (candidates.length === 0) return null;

  const sorted = [...candidates].sort((a, b) => a.cost - b.cost || typeTieBreak(a) - typeTieBreak(b));
  const goal = sorted[0];
  return { goal, canAfford: money >= goal.cost };
};
