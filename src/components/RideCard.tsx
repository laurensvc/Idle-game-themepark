import { Badge } from '@/components/ui/badge';
import { getRideDefinition } from '@/config/rideDataConfig';
import { getRidePathStatMultipliers } from '@/data/ridePathUpgrades';
import { cn, formatMoney } from '@/lib/utils';
import { useGameStore } from '@/store/gameStore';
import type { RideInstance } from '@/types/game';
import { TrendingUp } from 'lucide-react';
import { memo } from 'react';

interface RideCardProps {
  ride: RideInstance;
}

const RideCard: React.FC<RideCardProps> = memo(({ ride }) => {
  const def = getRideDefinition(ride.definitionId);
  const selectRide = useGameStore((s) => s.selectRide);
  const selectedRideId = useGameStore((s) => s.selectedRideId);
  const isSelected = selectedRideId === ride.id;

  if (!def) return null;

  const pathM = getRidePathStatMultipliers(ride.pathTrackLevels, ride.definitionId);
  const income = ride.visitors * def.baseIncome * pathM.income;
  const upgradeCount = Object.values(ride.pathTrackLevels).reduce((a, n) => a + n, 0);

  return (
    <button
      type="button"
      className={cn(
        'park-card border-l-park-green ring-offset-background w-full cursor-pointer border-l-4 p-3 text-left active:scale-[0.99]',
        isSelected && 'ring-primary ring-2 ring-offset-2'
      )}
      onClick={() => selectRide(ride.id)}
      aria-pressed={isSelected}
      aria-label={`${def.name}, running. Tap value ${formatMoney(income)} per ticket fill.`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="shrink-0 text-2xl" role="img" aria-label={def.name}>
            {def.emoji}
          </span>
          <div className="min-w-0">
            <div className="font-display truncate text-sm font-semibold tracking-tight">{def.name}</div>
            <div className="mt-0.5 flex items-center gap-1.5">
              <Badge variant="operating" className="px-1.5 py-0 text-[10px]">
                Running
              </Badge>
              <span className="text-muted-foreground text-[10px] font-medium">
                {upgradeCount === 0 ? 'No upgrades' : `${upgradeCount} upgrade${upgradeCount === 1 ? '' : 's'}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-muted-foreground mt-2 flex items-center gap-3 text-xs">
        <span className="text-park-green flex items-center gap-0.5">
          <TrendingUp className="h-3 w-3" />+{formatMoney(income)} tap
        </span>
        {ride.visitors > 0 && <span>{ride.visitors} visitors</span>}
      </div>
    </button>
  );
});

RideCard.displayName = 'RideCard';
export default RideCard;
