import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { RIDE_DEFINITIONS } from '@/data/rides';
import { UPGRADE_DEFINITIONS } from '@/data/upgrades';
import { cn, formatMoney } from '@/lib/utils';
import { useGameStore } from '@/store/gameStore';
import { Lock, ShoppingCart } from 'lucide-react';
import { memo } from 'react';

const ShopPanel: React.FC = memo(() => {
  const money = useGameStore((s) => s.money);
  const rides = useGameStore((s) => s.rides);
  const buyRide = useGameStore((s) => s.buyRide);
  const buyUpgrade = useGameStore((s) => s.buyUpgrade);
  const purchasedUpgrades = useGameStore((s) => s.upgrades);

  const ownedRideTypes = new Set(rides.map((r) => r.definitionId));
  const ownedUpgradeIds = new Set(purchasedUpgrades.map((u) => u.upgradeId));

  return (
    <ScrollArea className="min-h-0 flex-1">
      <div className="space-y-4 px-3 pb-3">
        <section>
          <h2 className="text-foreground mb-2 flex items-center gap-1.5 text-sm font-bold">
            <ShoppingCart className="h-4 w-4" />
            Rides
          </h2>
          <div className="grid gap-2">
            {RIDE_DEFINITIONS.map((def) => {
              const owned = ownedRideTypes.has(def.id);
              const canAfford = money >= def.baseCost;
              const canBuy = !owned && canAfford;
              return (
                <div
                  key={def.id}
                  className={cn(
                    'park-card flex items-center gap-3 p-3',
                    owned && 'bg-park-green/5 opacity-70',
                    !owned && !canAfford && 'opacity-60'
                  )}
                >
                  <span className="shrink-0 text-2xl">{def.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold">{def.name}</div>
                    <div className="text-muted-foreground text-xs">
                      {def.baseIncome}/s income · {def.baseCapacity} cap · one per park
                    </div>
                  </div>
                  {owned ? (
                    <span className="text-park-green shrink-0 text-xs font-semibold">In park</span>
                  ) : (
                    <Button
                      variant="coin"
                      size="sm"
                      disabled={!canBuy}
                      onClick={() => buyRide(def.id)}
                      className="shrink-0"
                    >
                      {formatMoney(def.baseCost)}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-foreground mb-2 flex items-center gap-1.5 text-sm font-bold">
            <span className="text-base">⬆️</span>
            Upgrades
          </h2>
          <div className="grid gap-2">
            {UPGRADE_DEFINITIONS.map((def) => {
              const owned = ownedUpgradeIds.has(def.id);
              const prereqMet = !def.prerequisiteId || ownedUpgradeIds.has(def.prerequisiteId);
              const canAfford = money >= def.cost;
              const canBuy = !owned && prereqMet && canAfford;

              return (
                <div
                  key={def.id}
                  className={cn(
                    'park-card flex items-center gap-3 p-3',
                    owned && 'bg-park-green/5 opacity-50',
                    !prereqMet && 'opacity-40'
                  )}
                >
                  <span className="shrink-0 text-xl">{def.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1 text-sm font-semibold">
                      {def.name}
                      {!prereqMet && <Lock className="text-muted-foreground h-3 w-3" />}
                    </div>
                    <div className="text-muted-foreground text-xs">{def.description}</div>
                  </div>
                  {owned ? (
                    <span className="text-park-green text-xs font-semibold">Owned</span>
                  ) : (
                    <Button
                      variant="coin"
                      size="sm"
                      disabled={!canBuy}
                      onClick={() => buyUpgrade(def.id)}
                      className="shrink-0"
                    >
                      {formatMoney(def.cost)}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </ScrollArea>
  );
});

ShopPanel.displayName = 'ShopPanel';
export default ShopPanel;
