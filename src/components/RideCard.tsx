import { Badge } from '@/components/ui/badge';
import { BALANCE } from '@/data/balance';
import { getRideDefinition } from '@/data/rides';
import { cn, formatMoney } from '@/lib/utils';
import { useGameStore } from '@/store/gameStore';
import type { RideInstance } from '@/types/game';
import { Droplets, Pause, Play, TrendingUp, Wrench } from 'lucide-react';
import { memo } from 'react';

interface RideCardProps {
  ride: RideInstance;
}

const statusConfig = {
  operating: { label: 'Running', variant: 'operating' as const, color: 'border-l-park-green' },
  broken: { label: 'Broken', variant: 'broken' as const, color: 'border-l-park-red' },
  repairing: { label: 'Repairing', variant: 'repairing' as const, color: 'border-l-park-yellow' },
  idle: { label: 'Idle', variant: 'idle' as const, color: 'border-l-muted-foreground/30' },
} as const;

const RideCard: React.FC<RideCardProps> = memo(({ ride }) => {
  const def = getRideDefinition(ride.definitionId);
  const selectRide = useGameStore((s) => s.selectRide);
  const toggleRide = useGameStore((s) => s.toggleRide);
  const repairRide = useGameStore((s) => s.repairRide);

  if (!def) return null;

  const config = statusConfig[ride.status];
  const income = ride.visitors * def.baseIncome * (1 + BALANCE.incomeMultPerLevel * (ride.level - 1));

  return (
    <div
      className={cn('park-card cursor-pointer border-l-4 p-3', config.color)}
      onClick={() => selectRide(ride.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && selectRide(ride.id)}
      aria-label={`${def.name} - ${config.label}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="shrink-0 text-2xl" role="img" aria-label={def.name}>
            {def.emoji}
          </span>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{def.name}</div>
            <div className="mt-0.5 flex items-center gap-1.5">
              <Badge variant={config.variant} className="px-1.5 py-0 text-[10px]">
                {config.label}
              </Badge>
              <span className="text-muted-foreground text-[10px] font-medium">Lv.{ride.level}</span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {ride.status === 'broken' ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                repairRide(ride.id);
              }}
              className="bg-park-yellow/15 text-park-yellow hover:bg-park-yellow/25 cursor-pointer rounded-lg p-1.5 transition-colors"
              aria-label="Repair ride"
            >
              <Wrench className="h-4 w-4" />
            </button>
          ) : ride.status !== 'repairing' ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleRide(ride.id);
              }}
              className={cn(
                'cursor-pointer rounded-lg p-1.5 transition-colors',
                ride.status === 'operating'
                  ? 'bg-park-green/15 text-park-green hover:bg-park-green/25'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
              aria-label={ride.status === 'operating' ? 'Stop ride' : 'Start ride'}
            >
              {ride.status === 'operating' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
          ) : null}
        </div>
      </div>

      {ride.status === 'repairing' && (
        <div className="mt-2">
          <div className="park-bar h-1.5">
            <div
              className="bg-park-yellow h-full rounded-full transition-all duration-500"
              style={{
                width: `${(ride.repairProgress / (getRideDefinition(ride.definitionId)?.repairTime ?? 10)) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      <div className="text-muted-foreground mt-2 flex items-center gap-3 text-xs">
        {ride.status === 'operating' && (
          <span className="text-park-green flex items-center gap-0.5">
            <TrendingUp className="h-3 w-3" />
            {formatMoney(income)}/s
          </span>
        )}
        {ride.dirt > 5 && (
          <span className="text-park-orange flex items-center gap-0.5">
            <Droplets className="h-3 w-3" />
            {Math.round(ride.dirt)}%
          </span>
        )}
        {ride.status === 'operating' && ride.visitors > 0 && <span>{ride.visitors} visitors</span>}
      </div>
    </div>
  );
});

RideCard.displayName = 'RideCard';
export default RideCard;
