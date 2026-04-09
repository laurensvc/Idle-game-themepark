import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RIDE_DEFINITIONS, getRideDefinition } from '@/data/rides';
import { UPGRADE_DEFINITIONS, getUpgradeDefinition } from '@/data/upgrades';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/store/gameStore';
import { CheckCircle, ChevronRight, Lock, ShoppingBag } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

const formatMoney = (amount: number): string => {
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(1)}K`;
  return `$${amount}`;
};

const EFFECT_LABELS: Record<string, string> = {
  auto_repair: '⚙ Auto-Repair',
  capacity_boost: '👥 +Capacity',
  income_boost: '💰 +Income',
  breakdown_reduction: '🛡 -Breakdowns',
  auto_clean: '🧹 Auto-Clean',
  visitor_attraction: '📣 +Visitors',
};

export const ShopPanel = () => {
  const { money, rides, purchasedUpgrades, buyRide, buyUpgrade } = useGameStore(
    useShallow((s) => ({
      money: s.money,
      rides: s.rides,
      purchasedUpgrades: s.purchasedUpgrades,
      buyRide: s.buyRide,
      buyUpgrade: s.buyUpgrade,
    }))
  );

  const unlockedRideIds = new Set(rides.map((r) => r.definitionId));
  const availableRides = RIDE_DEFINITIONS.filter((def) => !unlockedRideIds.has(def.id));

  return (
    <div className="flex flex-col gap-4">
      {availableRides.length > 0 && (
        <section>
          <div className="text-muted-foreground mb-2 flex items-center gap-2">
            <ShoppingBag size={14} className="text-neon-orange" />
            <span className="text-xs font-semibold tracking-widest uppercase">Build Rides</span>
          </div>
          <div className="flex flex-col gap-2">
            {availableRides.map((def) => {
              const canAfford = money >= def.unlockCost;
              return (
                <Button
                  key={def.id}
                  variant="outline"
                  disabled={!canAfford}
                  onClick={() => buyRide(def.id)}
                  className={cn(
                    'h-auto min-h-20 w-full flex-col items-stretch gap-1 p-3 text-left whitespace-normal',
                    canAfford && 'hover:border-neon-orange/50 hover:bg-neon-orange/5'
                  )}
                  aria-label={`Buy ${def.name} for ${formatMoney(def.unlockCost)}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{def.icon}</span>
                      <div>
                        <div className="text-sm font-bold">{def.name}</div>
                        <div className="text-muted-foreground mt-0.5 max-w-[160px] truncate text-xs">
                          {def.description}
                        </div>
                      </div>
                    </div>
                    <span
                      className={cn('text-sm font-black', canAfford ? 'text-neon-orange' : 'text-muted-foreground')}
                    >
                      {formatMoney(def.unlockCost)}
                    </span>
                  </div>
                  <div className="mt-1 ml-9 flex items-center gap-0.5">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div
                        key={i}
                        className={cn('h-1.5 w-3 rounded-sm', i < def.thrillLevel ? 'bg-neon-orange' : 'bg-muted')}
                      />
                    ))}
                    <span className="text-muted-foreground ml-1.5 text-xs">thrill</span>
                  </div>
                </Button>
              );
            })}
          </div>
        </section>
      )}

      <section>
        <div className="text-muted-foreground mb-2 flex items-center gap-2">
          <ChevronRight size={14} className="text-neon-violet" />
          <span className="text-xs font-semibold tracking-widest uppercase">Upgrades</span>
        </div>
        <div className="flex flex-col gap-2">
          {UPGRADE_DEFINITIONS.map((upgrade) => {
            const isPurchased = purchasedUpgrades.includes(upgrade.id);
            const rideExists = !upgrade.rideId || unlockedRideIds.has(upgrade.rideId);
            const prereqMet = !upgrade.requires || purchasedUpgrades.includes(upgrade.requires);
            const canAfford = money >= upgrade.cost;
            const rideDef = upgrade.rideId ? getRideDefinition(upgrade.rideId) : null;
            const prereqUpgrade = upgrade.requires ? getUpgradeDefinition(upgrade.requires) : null;
            const isAvailable = rideExists && prereqMet && !isPurchased;

            if (!rideExists) return null;

            return (
              <Button
                key={upgrade.id}
                variant="outline"
                disabled={!isAvailable || !canAfford}
                onClick={() => isAvailable && canAfford && buyUpgrade(upgrade.id)}
                className={cn(
                  'h-auto min-h-16 w-full flex-col items-stretch gap-0 p-3 text-left whitespace-normal',
                  isPurchased && 'border-green-500/30 bg-green-500/5',
                  isAvailable && canAfford && !isPurchased && 'hover:border-neon-violet/50 hover:bg-neon-purple/5'
                )}
                aria-label={`${isPurchased ? 'Purchased' : 'Buy'}: ${upgrade.name}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {rideDef && <span className="text-base leading-none">{rideDef.icon}</span>}
                      <span className="truncate text-sm font-bold">{upgrade.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {EFFECT_LABELS[upgrade.effect] ?? upgrade.effect}
                      </Badge>
                    </div>
                    <div className="text-muted-foreground mt-0.5 text-xs">{upgrade.description}</div>
                    {!prereqMet && prereqUpgrade && (
                      <div className="mt-0.5 flex items-center gap-1 text-xs text-yellow-500/80">
                        <Lock size={10} />
                        Requires: {prereqUpgrade.name}
                      </div>
                    )}
                  </div>
                  <div className="shrink-0">
                    {isPurchased ? (
                      <CheckCircle size={16} className="text-green-400" />
                    ) : (
                      <span
                        className={cn(
                          'text-sm font-black',
                          canAfford && isAvailable ? 'text-neon-violet' : 'text-muted-foreground'
                        )}
                      >
                        {formatMoney(upgrade.cost)}
                      </span>
                    )}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
