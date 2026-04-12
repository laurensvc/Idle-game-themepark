import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { BALANCE } from '@/data/balance';
import { getLevelUpCost, getRideDefinition } from '@/data/rides';
import { formatMoney } from '@/lib/utils';
import { useGameStore } from '@/store/gameStore';
import { ArrowUpCircle, Droplets, Pause, Play, Star, TrendingUp, Users, Wrench } from 'lucide-react';
import { memo } from 'react';

const RideInspector: React.FC = memo(() => {
  const selectedRideId = useGameStore((s) => s.selectedRideId);
  const rides = useGameStore((s) => s.rides);
  const money = useGameStore((s) => s.money);
  const selectRide = useGameStore((s) => s.selectRide);
  const toggleRide = useGameStore((s) => s.toggleRide);
  const repairRide = useGameStore((s) => s.repairRide);
  const levelUpRide = useGameStore((s) => s.levelUpRide);

  const ride = selectedRideId ? rides.find((r) => r.id === selectedRideId) : null;
  const def = ride ? getRideDefinition(ride.definitionId) : null;

  if (!ride || !def) {
    return (
      <Sheet open={false} onOpenChange={() => selectRide(null)}>
        <SheetContent />
      </Sheet>
    );
  }

  const levelUpCost = ride.level < BALANCE.maxRideLevel ? getLevelUpCost(def.baseLevelUpCost, ride.level) : null;
  const canLevelUp = levelUpCost !== null && money >= levelUpCost;
  const income = ride.visitors * def.baseIncome * (1 + BALANCE.incomeMultPerLevel * (ride.level - 1));
  const capacity = Math.round(def.baseCapacity * (1 + BALANCE.capacityMultPerLevel * (ride.level - 1)));

  return (
    <Sheet open={!!selectedRideId} onOpenChange={(open) => !open && selectRide(null)}>
      <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <span className="text-3xl">{def.emoji}</span>
            <div>
              <div className="text-lg">{def.name}</div>
              <SheetDescription className="text-xs">
                {def.category.charAt(0).toUpperCase() + def.category.slice(1)} ride
              </SheetDescription>
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant={
                ride.status === 'operating'
                  ? 'operating'
                  : ride.status === 'broken'
                    ? 'broken'
                    : ride.status === 'repairing'
                      ? 'repairing'
                      : 'idle'
              }
            >
              {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Star className="h-3 w-3" />
              Level {ride.level}/{BALANCE.maxRideLevel}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <StatBox
              icon={<TrendingUp className="text-park-green h-4 w-4" />}
              label="Income/s"
              value={ride.status === 'operating' ? formatMoney(income) : '--'}
            />
            <StatBox icon={<Users className="text-park-blue h-4 w-4" />} label="Capacity" value={String(capacity)} />
            <StatBox
              icon={<Droplets className="text-park-orange h-4 w-4" />}
              label="Dirt"
              value={`${Math.round(ride.dirt)}%`}
            />
            <StatBox
              icon={<Wrench className="text-muted-foreground h-4 w-4" />}
              label="Visitors"
              value={String(ride.visitors)}
            />
          </div>

          {ride.status === 'repairing' && (
            <div>
              <div className="text-muted-foreground mb-1 text-xs">
                Repair progress ({ride.repairProgress}/{def.repairTime}s)
              </div>
              <div className="park-bar h-3">
                <div
                  className="bg-park-yellow h-full rounded-full transition-all duration-500"
                  style={{ width: `${(ride.repairProgress / def.repairTime) * 100}%` }}
                />
              </div>
            </div>
          )}

          <Separator />

          <div className="flex flex-wrap gap-2">
            {ride.status === 'broken' ? (
              <Button variant="coin" size="sm" onClick={() => repairRide(ride.id)} className="gap-1.5">
                <Wrench className="h-4 w-4" />
                Repair
              </Button>
            ) : ride.status !== 'repairing' ? (
              <Button
                variant={ride.status === 'operating' ? 'outline' : 'park'}
                size="sm"
                onClick={() => toggleRide(ride.id)}
                className="gap-1.5"
              >
                {ride.status === 'operating' ? (
                  <>
                    <Pause className="h-4 w-4" /> Stop
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" /> Start
                  </>
                )}
              </Button>
            ) : null}

            {ride.level < BALANCE.maxRideLevel && levelUpCost !== null && (
              <Button
                variant="coin"
                size="sm"
                disabled={!canLevelUp}
                onClick={() => levelUpRide(ride.id)}
                className="gap-1.5"
              >
                <ArrowUpCircle className="h-4 w-4" />
                Level Up ({formatMoney(levelUpCost)})
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
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
