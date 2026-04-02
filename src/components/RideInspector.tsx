import { X, Wrench, Users, Zap, Lock, CheckCircle, AlertTriangle, ArrowUp, DollarSign } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { useGameStore } from '../store/gameStore';
import { getRideDefinition, getLevelUpCost, getLevelCapacityMultiplier, getLevelIncomeMultiplier } from '../data/rides';
import { UPGRADE_DEFINITIONS, getUpgradeDefinition } from '../data/upgrades';

const formatMoney = (amount: number): string => {
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(1)}K`;
  return `$${amount}`;
};

const EFFECT_LABELS: Record<string, string> = {
  auto_repair: 'Auto-Repair',
  capacity_boost: '+Capacity',
  income_boost: '+Income',
  breakdown_reduction: '-Breakdowns',
};

const STATUS_COLORS: Record<string, { text: string; bg: string; border: string; dot: string }> = {
  operating: { text: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/50', dot: 'bg-green-400' },
  broken: { text: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/50', dot: 'bg-red-400' },
  repairing: { text: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/50', dot: 'bg-yellow-400' },
  idle: { text: 'text-slate-400', bg: 'bg-slate-500/20', border: 'border-slate-500/50', dot: 'bg-slate-400' },
  locked: { text: 'text-slate-500', bg: 'bg-slate-600/20', border: 'border-slate-600/50', dot: 'bg-slate-500' },
};

export const RideInspector = () => {
  const {
    selectedRideId,
    rides,
    selectRide,
    repairRide,
    cleanRide,
    levelUpRide,
    collectRideCash,
    purchasedUpgrades,
    money,
    buyUpgrade,
  } = useGameStore(
    useShallow((s) => ({
      selectedRideId: s.selectedRideId,
      rides: s.rides,
      selectRide: s.selectRide,
      repairRide: s.repairRide,
      cleanRide: s.cleanRide,
      levelUpRide: s.levelUpRide,
      collectRideCash: s.collectRideCash,
      purchasedUpgrades: s.purchasedUpgrades,
      money: s.money,
      buyUpgrade: s.buyUpgrade,
    })),
  );

  const ride = rides.find((r) => r.instanceId === selectedRideId);
  if (!ride) return null;

  const def = getRideDefinition(ride.definitionId);
  if (!def) return null;

  const statusStyle = STATUS_COLORS[ride.status] ?? STATUS_COLORS.idle;
  const rideUpgrades = UPGRADE_DEFINITIONS.filter((u) => u.rideId === ride.definitionId);

  const levelUpCost = getLevelUpCost(def, ride.level);
  const canLevelUp = ride.level < def.maxLevel && money >= levelUpCost;
  const isMaxLevel = ride.level >= def.maxLevel;

  const currentCapacity = Math.floor(def.baseCapacity * getLevelCapacityMultiplier(ride.level));
  const currentIncomeMult = getLevelIncomeMultiplier(ride.level);
  const nextCapacity = !isMaxLevel
    ? Math.floor(def.baseCapacity * getLevelCapacityMultiplier(ride.level + 1))
    : currentCapacity;
  const nextIncomeMult = !isMaxLevel ? getLevelIncomeMultiplier(ride.level + 1) : currentIncomeMult;

  return (
    <div className="flex flex-col gap-4">
      {/* Close button */}
      <button
        onClick={() => selectRide(null)}
        className="flex cursor-pointer items-center gap-2 self-start text-sm text-slate-500 transition-colors hover:text-white"
        aria-label="Close ride inspector"
      >
        <X size={14} />
        <span>Back</span>
      </button>

      {/* Ride header */}
      <div className="pixel-panel bg-park-card flex flex-col items-center gap-2 p-4" style={{ borderColor: def.gridColor }}>
        <span className="text-5xl leading-none">{def.icon}</span>
        <h2 className="font-display text-center text-sm text-white" style={{ color: def.gridColor }}>
          {def.name}
        </h2>

        {/* Level badge */}
        <div className="font-display text-xs text-slate-400">
          LVL {ride.level} / {def.maxLevel}
        </div>

        {/* Status badge with LED dot */}
        <div
          className={`pixel-panel flex items-center gap-2 ${statusStyle.bg} ${statusStyle.border} ${statusStyle.text} px-3 py-1 text-xs font-bold uppercase`}
        >
          <span
            className={`inline-block h-2.5 w-2.5 ${statusStyle.dot} ${ride.status === 'broken' ? 'animate-pulse' : ''}`}
          />
          {ride.status === 'broken' && <AlertTriangle size={12} />}
          {ride.status === 'repairing' && <Wrench size={12} />}
          {ride.status}
        </div>
        <p className="mt-1 text-center text-xs text-slate-500">{def.description}</p>
      </div>

      {/* Pending cash collection */}
      {ride.pendingCash > 0 && (
        <button
          onClick={() => collectRideCash(ride.instanceId)}
          className="pixel-button animate-pulse-neon w-full cursor-pointer bg-neon-orange/20 py-3 text-sm font-bold text-neon-orange uppercase transition-colors hover:bg-neon-orange/30"
          style={{ borderColor: '#f97316' }}
          aria-label={`Collect ${formatMoney(ride.pendingCash)}`}
        >
          <DollarSign size={16} className="mr-1 inline" />
          Collect {formatMoney(ride.pendingCash)}
        </button>
      )}

      {/* Live stats */}
      <div className="pixel-panel bg-park-card space-y-2 p-3">
        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Live Stats</div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-sm text-slate-400">
            <Users size={14} className="text-neon-cyan" />
            Guests
          </span>
          <span className="font-display text-sm text-white">
            {ride.currentVisitors} <span className="text-xs text-slate-500">/ {currentCapacity}</span>
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">$/tick</span>
          <span className="font-display text-sm text-neon-orange">
            ${Math.floor(def.baseCostPerTick * currentIncomeMult)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">Total served</span>
          <span className="font-display text-sm text-white">{ride.totalVisitorsServed}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">Thrill</span>
          <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className={`h-3 w-4 ${i < def.thrillLevel ? 'bg-neon-orange' : 'bg-park-border'}`}
                style={i < def.thrillLevel ? { boxShadow: '0 0 4px #f97316' } : undefined}
              />
            ))}
          </div>
        </div>

        {/* Dirt bar + clean button */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm text-slate-400">Dirt</span>
            <span
              className={`font-display text-sm ${ride.dirtLevel > 70 ? 'text-red-400' : ride.dirtLevel > 40 ? 'text-yellow-400' : 'text-green-400'}`}
            >
              {Math.round(ride.dirtLevel)}%
            </span>
          </div>
          <div className="pixel-bar h-3 overflow-hidden bg-park-border">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${ride.dirtLevel}%`,
                background: ride.dirtLevel > 70 ? '#ef4444' : ride.dirtLevel > 40 ? '#eab308' : '#8b7355',
              }}
            />
          </div>
          {ride.dirtLevel > 0 && ride.status !== 'broken' && ride.status !== 'repairing' && (
            <button
              onClick={() => cleanRide(ride.instanceId)}
              className="pixel-button mt-2 w-full cursor-pointer bg-green-500/10 py-1.5 text-sm font-bold tracking-wider text-green-400 uppercase transition-colors hover:bg-green-500/20"
              aria-label={`Clean ${def.name}`}
            >
              🧹 Clean Ride
            </button>
          )}
        </div>
      </div>

      {/* Level-up section */}
      <div className="pixel-panel bg-park-card space-y-2 p-3">
        <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
          <ArrowUp size={12} className="text-neon-cyan" />
          Level Up
        </div>

        {isMaxLevel ? (
          <div className="text-center text-sm text-neon-green">MAX LEVEL</div>
        ) : (
          <>
            <div className="space-y-1 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Capacity</span>
                <span>
                  {currentCapacity} → <span className="text-neon-cyan">{nextCapacity}</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span>Income mult</span>
                <span>
                  {currentIncomeMult.toFixed(2)}x → <span className="text-neon-orange">{nextIncomeMult.toFixed(2)}x</span>
                </span>
              </div>
            </div>
            <button
              onClick={() => levelUpRide(ride.instanceId)}
              disabled={!canLevelUp}
              className={`pixel-button w-full cursor-pointer py-2 text-sm font-bold uppercase transition-colors ${
                canLevelUp
                  ? 'bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/30'
                  : 'cursor-not-allowed bg-slate-800 text-slate-600'
              }`}
              style={canLevelUp ? { borderColor: '#06b6d4' } : undefined}
              aria-label={`Level up ${def.name} for ${formatMoney(levelUpCost)}`}
            >
              <ArrowUp size={14} className="mr-1 inline" />
              Level {ride.level + 1} — {formatMoney(levelUpCost)}
            </button>
          </>
        )}
      </div>

      {/* Repair section */}
      {ride.status === 'broken' && (
        <button
          onClick={() => repairRide(ride.instanceId)}
          className="pixel-button animate-pulse-neon w-full cursor-pointer bg-red-500/20 py-3 text-sm font-bold text-red-400 uppercase transition-colors hover:bg-red-500/30"
          style={{ borderColor: '#ef4444' }}
          aria-label={`Repair ${def.name}`}
        >
          <Wrench size={16} className="mr-2 inline" />
          Repair Now
        </button>
      )}

      {ride.status === 'repairing' && (
        <div className="pixel-panel bg-yellow-500/10 p-3" style={{ borderColor: '#eab308' }}>
          <div className="mb-1 flex items-center justify-between text-sm text-yellow-400">
            <span className="flex items-center gap-1.5 font-bold uppercase">
              <Wrench size={14} />
              {ride.isAutoRepair ? 'Auto Repair' : 'Repairing'}
            </span>
            <span className="font-display">{Math.round(ride.repairProgress)}%</span>
          </div>
          <div className="pixel-bar h-3 overflow-hidden bg-park-border">
            <div
              className="h-full bg-yellow-400 transition-all duration-1000"
              style={{ width: `${ride.repairProgress}%`, boxShadow: '0 0 8px #eab308' }}
            />
          </div>
        </div>
      )}

      {/* Ride upgrades */}
      {rideUpgrades.length > 0 && (
        <div className="pixel-panel bg-park-card space-y-2 p-3">
          <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Zap size={12} className="text-neon-violet" />
            Ride Upgrades
          </div>

          {rideUpgrades.map((upgrade) => {
            const isPurchased = purchasedUpgrades.includes(upgrade.id);
            const prereqMet = !upgrade.requires || purchasedUpgrades.includes(upgrade.requires);
            const canAfford = money >= upgrade.cost;
            const prereqUpgrade = upgrade.requires ? getUpgradeDefinition(upgrade.requires) : null;
            const isAvailable = prereqMet && !isPurchased;

            return (
              <button
                key={upgrade.id}
                onClick={() => isAvailable && canAfford && buyUpgrade(upgrade.id)}
                disabled={!isAvailable || !canAfford}
                className={`pixel-button w-full p-2.5 text-left transition-all duration-150 ${
                  isPurchased
                    ? 'cursor-default border-neon-green/30 bg-neon-green/5'
                    : isAvailable && canAfford
                      ? 'cursor-pointer border-park-border bg-park-surface hover:border-neon-violet/60 hover:bg-neon-purple/5'
                      : 'cursor-not-allowed border-[#1a1a30] bg-[#0f0f22] opacity-50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-white">{upgrade.name}</span>
                      <span className="bg-park-border px-1.5 py-0.5 text-xs text-slate-400">
                        {EFFECT_LABELS[upgrade.effect] ?? upgrade.effect}
                      </span>
                    </div>
                    <div className="mt-0.5 text-xs text-slate-500">{upgrade.description}</div>
                    {!prereqMet && prereqUpgrade && (
                      <div className="mt-1 flex items-center gap-1 text-xs text-yellow-500/70">
                        <Lock size={10} />
                        Requires: {prereqUpgrade.name}
                      </div>
                    )}
                  </div>
                  <div className="shrink-0">
                    {isPurchased ? (
                      <CheckCircle size={16} className="text-green-400" />
                    ) : (
                      <span className={`text-sm font-black ${canAfford && isAvailable ? 'text-neon-violet' : 'text-slate-600'}`}>
                        {formatMoney(upgrade.cost)}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
