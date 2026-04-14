import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { RIDE_DEFINITIONS } from '@/config/rideDataConfig';
import { UPGRADE_DEFINITIONS } from '@/config/upgradesConfig';
import { getRideShopDiscovery, prerequisiteRideName } from '@/lib/rideDiscovery';
import { cn, formatMoney } from '@/lib/utils';
import { useGameStore } from '@/store/gameStore';
import { HelpCircle, Lock, ShoppingCart } from 'lucide-react';
import { memo } from 'react';

const ShopPanel: React.FC = memo(() => {
  const money = useGameStore((s) => s.money);
  const rides = useGameStore((s) => s.rides);
  const buyRide = useGameStore((s) => s.buyRide);
  const buyUpgrade = useGameStore((s) => s.buyUpgrade);
  const purchasedUpgrades = useGameStore((s) => s.upgrades);

  const ownedRideTypes = new Set(rides.map((r) => r.definitionId));
  const ownedUpgradeIds = new Set(purchasedUpgrades.map((u) => u.upgradeId));

  let firstUndiscoveredShown = false;

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
              const discovery = getRideShopDiscovery(def, ownedRideTypes);
              const owned = discovery === 'owned';
              const undiscovered = discovery === 'undiscovered';
              const canAfford = money >= def.baseCost;
              const canBuy = discovery === 'discovered' && canAfford;
              const prevName = prerequisiteRideName(def.id);
              const showNextLabel = undiscovered && !firstUndiscoveredShown;
              if (undiscovered) firstUndiscoveredShown = true;

              return (
                <div
                  key={def.id}
                  className={cn(
                    'border-border/60 bg-card flex items-center gap-3 rounded-lg border px-3 py-3',
                    owned && 'bg-park-green/5 opacity-70',
                    undiscovered && 'opacity-55',
                    !owned && !undiscovered && !canAfford && 'opacity-60'
                  )}
                >
                  <span className="text-muted-foreground shrink-0 text-2xl" aria-hidden>
                    {undiscovered ? '❔' : def.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    {showNextLabel && (
                      <p className="text-park-orange mb-0.5 text-[10px] font-bold tracking-wide uppercase">
                        Next attraction
                      </p>
                    )}
                    <div className="flex items-center gap-1 text-sm font-semibold">
                      {undiscovered ? <span className="text-muted-foreground">???</span> : <span>{def.name}</span>}
                      {undiscovered && <Lock className="text-muted-foreground h-3 w-3 shrink-0" />}
                    </div>
                    <div className="text-muted-foreground flex items-start gap-1 text-xs">
                      {undiscovered ? (
                        <>
                          <HelpCircle className="mt-0.5 h-3 w-3 shrink-0" />
                          <span>Build {prevName ?? 'the previous ride'} to reveal this blueprint.</span>
                        </>
                      ) : (
                        <span>
                          +{def.baseIncome} tap value · {def.baseCapacity} cap · one per park
                        </span>
                      )}
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
                      {undiscovered ? '—' : formatMoney(def.baseCost)}
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
                    'border-border/60 bg-card flex items-center gap-3 rounded-lg border px-3 py-3',
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
