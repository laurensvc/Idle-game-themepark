import { ShoppingBag, Lock, CheckCircle, ChevronRight } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { useGameStore } from '../store/gameStore';
import { RIDE_DEFINITIONS, getRideDefinition } from '../data/rides';
import { UPGRADE_DEFINITIONS, getUpgradeDefinition } from '../data/upgrades';

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
    <div className="flex flex-col gap-4 overflow-y-auto">
      {/* Rides for sale */}
      {availableRides.length > 0 && (
        <section>
          <div className="mb-2 flex items-center gap-2">
            <ShoppingBag size={13} className="text-neon-orange" />
            <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">Build Rides</span>
          </div>
          <div className="space-y-2">
            {availableRides.map((def) => {
              const canAfford = money >= def.unlockCost;
              return (
                <button
                  key={def.id}
                  onClick={() => buyRide(def.id)}
                  disabled={!canAfford}
                  className={`pixel-button w-full cursor-pointer p-2.5 text-left transition-all duration-150 ${
                    canAfford
                      ? 'border-park-border hover:border-neon-orange/60 hover:bg-neon-orange/5 bg-park-surface'
                      : 'cursor-not-allowed border-[#1a1a30] bg-[#0f0f22] opacity-50'
                  } `}
                  aria-label={`Buy ${def.name} for ${formatMoney(def.unlockCost)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{def.icon}</span>
                      <div>
                        <div className="text-xs font-bold text-white">{def.name}</div>
                        <div className="mt-0.5 max-w-[140px] truncate text-[9px] text-slate-500">{def.description}</div>
                      </div>
                    </div>
                    <div className={`text-xs font-black ${canAfford ? 'text-neon-orange' : 'text-slate-600'}`}>
                      {formatMoney(def.unlockCost)}
                    </div>
                  </div>
                  {/* Thrill level dots */}
                  <div className="mt-1.5 ml-8 flex gap-0.5">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div
                        key={i}
                        className={`h-1 w-2 rounded-sm ${i < def.thrillLevel ? 'bg-neon-orange' : 'bg-park-border'}`}
                      />
                    ))}
                    <span className="ml-1 text-[9px] text-slate-500">thrill</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Upgrades */}
      <section>
        <div className="mb-2 flex items-center gap-2">
          <ChevronRight size={13} className="text-neon-violet" />
          <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">Upgrades</span>
        </div>
        <div className="space-y-1.5">
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
              <button
                key={upgrade.id}
                onClick={() => isAvailable && canAfford && buyUpgrade(upgrade.id)}
                disabled={!isAvailable || !canAfford}
                className={`pixel-button w-full p-2.5 text-left transition-all duration-150 ${
                  isPurchased
                    ? 'border-neon-green/30 bg-neon-green/5 cursor-default'
                    : isAvailable && canAfford
                      ? 'border-park-border hover:border-neon-violet/60 hover:bg-neon-purple/5 bg-park-surface cursor-pointer'
                      : 'cursor-not-allowed border-[#1a1a30] bg-[#0f0f22] opacity-50'
                } `}
                aria-label={`${isPurchased ? 'Purchased' : 'Buy'}: ${upgrade.name}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {rideDef && <span className="text-sm leading-none">{rideDef.icon}</span>}
                      <span className="truncate text-[11px] font-bold text-white">{upgrade.name}</span>
                      <span className="bg-park-border rounded px-1.5 py-0.5 text-[9px] text-slate-400">
                        {EFFECT_LABELS[upgrade.effect] ?? upgrade.effect}
                      </span>
                    </div>
                    <div className="mt-0.5 text-[9px] text-slate-500">{upgrade.description}</div>
                    {!prereqMet && prereqUpgrade && (
                      <div className="mt-0.5 flex items-center gap-1 text-[9px] text-yellow-500/70">
                        <Lock size={8} />
                        Requires: {prereqUpgrade.name}
                      </div>
                    )}
                  </div>
                  <div className="shrink-0">
                    {isPurchased ? (
                      <CheckCircle size={14} className="text-green-400" />
                    ) : (
                      <span
                        className={`text-xs font-black ${canAfford && isAvailable ? 'text-neon-violet' : 'text-slate-600'}`}
                      >
                        {formatMoney(upgrade.cost)}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
