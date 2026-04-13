import { PATH_TRACKS, pathTrackGeometricBonusTotal } from '@/config/ridePathConfig';

/**
 * Path upgrades stack by track level: cost scales exponentially with level;
 * each purchase adds a geometrically growing bonus slice, capped by PATH_MAX_LEVEL.
 */

export const getRidePathStatMultipliers = (
  pathTrackLevels: Readonly<Record<string, number>>,
  _definitionId: string
): { capacity: number; income: number } => {
  let capacity = 1;
  let income = 1;

  for (let t = 0; t < PATH_TRACKS.length; t++) {
    const track = PATH_TRACKS[t];
    const level = pathTrackLevels[track.suffix] ?? 0;
    if (level <= 0) continue;

    const bonus = pathTrackGeometricBonusTotal(track.effectBase, track.effectGrowth, level);
    if (track.effectType === 'capacity_pct') capacity += bonus;
    if (track.effectType === 'income_pct' || track.effectType === 'throughput_pct') income += bonus;
  }

  return { capacity, income };
};
