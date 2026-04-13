import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { getNextPathUpgradeCost, PATH_MAX_LEVEL, PATH_TRACKS } from '@/config/ridePathConfig';
import { getRideDefinition } from '@/config/rideDataConfig';
import { getRidePathStatMultipliers } from '@/data/ridePathUpgrades';
import { cn, formatMoney } from '@/lib/utils';
import { useGameStore } from '@/store/gameStore';
import { Armchair, TrendingUp, Users } from 'lucide-react';
import { memo } from 'react';

const RideInspector: React.FC = memo(() => {
  const selectedRideId = useGameStore((s) => s.selectedRideId);
  const rides = useGameStore((s) => s.rides);
  const money = useGameStore((s) => s.money);
  const purchaseRidePathUpgrade = useGameStore((s) => s.purchaseRidePathUpgrade);

  const ride = selectedRideId ? rides.find((r) => r.id === selectedRideId) : null;
  const def = ride ? getRideDefinition(ride.definitionId) : null;

  if (!ride || !def) {
    return (
      <div className="text-muted-foreground flex min-h-0 flex-1 flex-col items-center justify-center gap-1 px-6 py-10 text-center text-sm">
        <p className="font-medium">No ride selected</p>
        <p className="text-xs">{rides.length > 0 ? 'Pick a ride from the list.' : 'Buy a ride in the shop column.'}</p>
      </div>
    );
  }

  const pathM = getRidePathStatMultipliers(ride.pathTrackLevels, ride.definitionId);
  const pathLevelTotal = Object.values(ride.pathTrackLevels).reduce((a, n) => a + n, 0);

  const income = ride.visitors * def.baseIncome * pathM.income;
  const capacity = Math.round(def.baseCapacity * pathM.capacity);

  return (
    <ScrollArea className="min-h-0 flex-1">
      <div className="space-y-4 p-3 pb-4">
        <div className="flex items-start gap-3">
          <span className="text-4xl leading-none" role="img" aria-hidden>
            {def.emoji}
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg leading-tight font-bold">{def.name}</h2>
            <p className="text-muted-foreground mt-0.5 text-xs">
              {def.category.charAt(0).toUpperCase() + def.category.slice(1)} ride · runs automatically · one per park
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="operating">Running</Badge>
          <Badge variant="secondary" className="tabular-nums">
            {pathLevelTotal} path level{pathLevelTotal === 1 ? '' : 's'}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <StatBox
            icon={<TrendingUp className="text-park-green h-4 w-4" />}
            label="Ticket value"
            value={formatMoney(income)}
          />
          <StatBox icon={<Armchair className="text-park-blue h-4 w-4" />} label="Capacity" value={String(capacity)} />
          <StatBox
            icon={<Users className="text-muted-foreground h-4 w-4" />}
            label="Visitors"
            value={String(ride.visitors)}
          />
        </div>

        <Separator />

        <div>
          <h3 className="text-foreground mb-2 text-sm font-bold">Upgrade paths</h3>
          <p className="text-muted-foreground mb-3 text-xs">
            Four tracks — repeat purchases per track. Cost scales exponentially with level; each level adds a growing
            bonus slice, up to {PATH_MAX_LEVEL} per track.
          </p>
          <div className="space-y-2">
            {PATH_TRACKS.map((p) => {
              const level = ride.pathTrackLevels[p.suffix] ?? 0;
              const atCap = level >= PATH_MAX_LEVEL;
              const nextCost = atCap ? 0 : getNextPathUpgradeCost(def.baseCost, p, level);
              const canAfford = !atCap && money >= nextCost;
              const canBuy = !atCap && canAfford;

              return (
                <div
                  key={p.suffix}
                  className={cn(
                    'border-border/60 flex items-start gap-3 rounded-lg border bg-card px-3 py-3',
                    level > 0 && 'bg-park-green/5',
                    atCap && 'opacity-80'
                  )}
                >
                  <span className="shrink-0 text-xl">{p.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 text-sm font-semibold">
                      <span>{p.nameBase}</span>
                      <span className="text-muted-foreground text-xs font-normal tabular-nums">
                        {atCap ? `max ${PATH_MAX_LEVEL}` : `level ${level} / ${PATH_MAX_LEVEL}`}
                      </span>
                    </div>
                    <div className="text-muted-foreground text-xs">{p.description}</div>
                  </div>
                  {atCap ? (
                    <span className="text-muted-foreground shrink-0 text-xs font-semibold">Maxed</span>
                  ) : (
                    <Button
                      variant="coin"
                      size="sm"
                      disabled={!canBuy}
                      onClick={() => purchaseRidePathUpgrade(ride.id, p.suffix)}
                      className="shrink-0"
                    >
                      {formatMoney(nextCost)}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
});

RideInspector.displayName = 'RideInspector';

const StatBox: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="bg-muted/50 flex items-center gap-2 rounded-lg px-3 py-2">
    {icon}
    <div>
      <div className="text-muted-foreground text-xs">{label}</div>
      <div className="text-sm font-semibold tabular-nums">{value}</div>
    </div>
  </div>
);

export default RideInspector;
