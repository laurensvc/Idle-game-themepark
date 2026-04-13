import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { getPathUpgradesForRide, getRidePathStatMultipliers } from '@/data/ridePathUpgrades';
import { getRideDefinition } from '@/config/rideDataConfig';
import { cn, formatMoney } from '@/lib/utils';
import { useGameStore } from '@/store/gameStore';
import { Armchair, Lock, TrendingUp, Users } from 'lucide-react';
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

  const pathM = getRidePathStatMultipliers(ride.purchasedPathIds, ride.definitionId);
  const pathDefs = getPathUpgradesForRide(ride.definitionId);
  const purchasedSet = new Set(ride.purchasedPathIds);

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
            {ride.purchasedPathIds.length} path upgrade{ride.purchasedPathIds.length === 1 ? '' : 's'}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <StatBox
            icon={<TrendingUp className="text-park-green h-4 w-4" />}
            label="Income/s"
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
            Four tracks: faster dispatch, seating, pricing, and gift shops. Each has three tiers — buy the previous tier
            first.
          </p>
          <div className="space-y-2">
            {pathDefs.map((p) => {
              const owned = purchasedSet.has(p.id);
              const prereqMet = !p.prerequisiteId || purchasedSet.has(p.prerequisiteId);
              const canAfford = money >= p.cost;
              const canBuy = !owned && prereqMet && canAfford;

              return (
                <div
                  key={p.id}
                  className={cn(
                    'park-card flex items-start gap-3 p-3',
                    owned && 'bg-park-green/5 opacity-70',
                    !prereqMet && !owned && 'opacity-45'
                  )}
                >
                  <span className="shrink-0 text-xl">{p.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1 text-sm font-semibold">
                      {p.name}
                      {!prereqMet && !owned && <Lock className="text-muted-foreground h-3 w-3" />}
                    </div>
                    <div className="text-muted-foreground text-xs">{p.description}</div>
                  </div>
                  {owned ? (
                    <span className="text-park-green shrink-0 text-xs font-semibold">Owned</span>
                  ) : (
                    <Button
                      variant="coin"
                      size="sm"
                      disabled={!canBuy}
                      onClick={() => purchaseRidePathUpgrade(ride.id, p.id)}
                      className="shrink-0"
                    >
                      {formatMoney(p.cost)}
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
