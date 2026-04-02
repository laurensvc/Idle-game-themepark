import { useCallback } from 'react';
import { Wrench, Zap, Users, AlertTriangle, CheckCircle, Settings, DollarSign } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { getRideDefinition } from '../data/rides';
import { purchasedUpgradesIncludeAutoRepairForRide } from '../data/upgrades';
import type { Ride } from '../types/game';
import { playGameSfx } from '../audio/soundManager';
import CountUp from './CountUp';

interface RideCardProps {
  ride: Ride;
}

const formatMoney = (amount: number): string => {
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(1)}K`;
  return `$${amount}`;
};

const formatMoneyCount = (n: number) => formatMoney(n);

const STATUS_CONFIG = {
  operating: {
    label: 'OPEN',
    color: 'text-green-400',
    borderClass: 'border-green-500/40 neon-border-green',
    bgClass: 'bg-green-500/5',
    icon: <CheckCircle size={12} />,
    dot: 'bg-green-400',
    dotGlow: 'shadow-[0_0_6px_#22c55e]',
  },
  broken: {
    label: 'BROKEN',
    color: 'text-red-400',
    borderClass: 'border-red-500/40 neon-border-red',
    bgClass: 'bg-red-500/5',
    icon: <AlertTriangle size={12} />,
    dot: 'bg-red-400',
    dotGlow: 'shadow-[0_0_6px_#ef4444]',
  },
  repairing: {
    label: 'REPAIRING',
    color: 'text-yellow-400',
    borderClass: 'border-yellow-500/40',
    bgClass: 'bg-yellow-500/5',
    icon: <Wrench size={12} />,
    dot: 'bg-yellow-400',
    dotGlow: 'shadow-[0_0_6px_#eab308]',
  },
  idle: {
    label: 'IDLE',
    color: 'text-slate-400',
    borderClass: 'border-slate-600/40',
    bgClass: 'bg-slate-800/30',
    icon: null,
    dot: 'bg-slate-400',
    dotGlow: '',
  },
  locked: {
    label: 'LOCKED',
    color: 'text-slate-500',
    borderClass: 'border-slate-700/40',
    bgClass: 'bg-slate-900/30',
    icon: null,
    dot: 'bg-slate-500',
    dotGlow: '',
  },
};

export const RideCard = ({ ride }: RideCardProps) => {
  const defId = ride.definitionId;
  const repairRide = useGameStore((s) => s.repairRide);
  const selectRide = useGameStore((s) => s.selectRide);
  const collectRideCash = useGameStore((s) => s.collectRideCash);
  const selectedRideId = useGameStore((s) => s.selectedRideId);
  const hasAutoRepair = useGameStore(
    useCallback((s) => purchasedUpgradesIncludeAutoRepairForRide(s.purchasedUpgrades, defId), [defId])
  );
  const def = getRideDefinition(ride.definitionId);
  if (!def) return null;

  const isSelected = selectedRideId === ride.instanceId;
  const statusCfg = STATUS_CONFIG[ride.status];
  const thrillBars = Array.from({ length: 5 }, (_, i) => i < def.thrillLevel);

  const handleRepair = (e: React.MouseEvent) => {
    e.stopPropagation();
    repairRide(ride.instanceId);
  };

  const handleCollect = (e: React.MouseEvent) => {
    e.stopPropagation();
    collectRideCash(ride.instanceId);
  };

  const handleSelect = () => {
    playGameSfx('ui_click');
    selectRide(isSelected ? null : ride.instanceId);
  };

  return (
    <div
      onClick={handleSelect}
      className={`pixel-panel relative cursor-pointer p-4 transition-all duration-200 select-none ${statusCfg.borderClass} ${statusCfg.bgClass} ${isSelected ? 'ring-neon-purple ring-offset-park-bg ring-2 ring-offset-1' : 'hover:brightness-125'} bg-park-card ${ride.status === 'broken' ? 'animate-shake' : ''}`}
      style={{ backgroundColor: `color-mix(in srgb, ${def.gridColor} 6%, var(--color-park-card))` }}
      role="button"
      aria-label={`${def.name} - ${statusCfg.label}`}
    >
      {/* Header */}
      <div className="mb-2 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="text-3xl leading-none">{def.icon}</span>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm leading-none font-bold text-white">{def.name}</span>
              {ride.level > 1 && <span className="font-display text-neon-cyan text-xs">L{ride.level}</span>}
            </div>
            {/* Status badge with LED dot */}
            <div
              className={`mt-1 inline-flex items-center gap-1.5 px-1.5 py-0.5 text-xs font-semibold ${statusCfg.color} ${statusCfg.bgClass} ${ride.status === 'broken' ? 'animate-pulse-neon' : ''}`}
            >
              <span
                className={`inline-block h-2 w-2 shrink-0 ${statusCfg.dot} ${statusCfg.dotGlow} ${ride.status === 'broken' ? 'animate-pulse' : ''}`}
              />
              {statusCfg.icon}
              {statusCfg.label}
            </div>
          </div>
        </div>

        {/* Auto repair badge */}
        {hasAutoRepair && (
          <div className="bg-neon-purple/20 border-neon-purple/40 flex items-center gap-1 border px-1.5 py-0.5">
            <Zap size={12} className="text-neon-violet" />
            <span className="text-neon-violet text-xs font-bold">AUTO</span>
          </div>
        )}
      </div>

      {/* Thrill meter */}
      <div className="mb-2 flex items-center gap-1.5">
        <span className="w-10 text-xs tracking-wider text-slate-500 uppercase">Thrill</span>
        <div className="flex gap-0.5">
          {thrillBars.map((filled, i) => (
            <div
              key={i}
              className={`h-2 w-4 ${filled ? 'bg-neon-orange' : 'bg-park-border'}`}
              style={filled ? { boxShadow: '0 0 4px #f97316' } : undefined}
            />
          ))}
        </div>
      </div>

      {/* Dirt bar */}
      {ride.dirtLevel > 0 && (
        <div className="mb-2">
          <div className="mb-0.5 flex justify-between text-xs text-slate-500">
            <span className="tracking-wider uppercase">Dirt</span>
            <span>{Math.round(ride.dirtLevel)}%</span>
          </div>
          <div className="pixel-bar h-2 overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${ride.dirtLevel}%`,
                background: ride.dirtLevel > 70 ? '#ef4444' : ride.dirtLevel > 40 ? '#eab308' : '#8b7355',
              }}
            />
          </div>
        </div>
      )}

      {/* Visitors count */}
      {ride.status === 'operating' && (
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Users size={12} className="text-neon-cyan" />
          <span className="font-medium">{ride.currentVisitors}</span>
          <span className="opacity-50">/ {def.baseCapacity} guests</span>
        </div>
      )}

      {/* Repair progress bar */}
      {ride.status === 'repairing' && (
        <div>
          <div className="mb-0.5 flex justify-between text-xs text-yellow-400">
            <span className="flex items-center gap-1 tracking-wider uppercase">
              <Wrench size={11} />
              {ride.isAutoRepair ? 'Auto Repair' : 'Repairing'}
            </span>
            <span>{Math.round(ride.repairProgress)}%</span>
          </div>
          <div className="pixel-bar h-2 overflow-hidden">
            <div
              className="h-full bg-yellow-400 transition-all duration-1000"
              style={{
                width: `${ride.repairProgress}%`,
                boxShadow: '0 0 6px #eab308',
              }}
            />
          </div>
        </div>
      )}

      {/* Repair button for broken rides */}
      {ride.status === 'broken' && (
        <button
          onClick={handleRepair}
          className="pixel-button bg-neon-orange/20 border-neon-orange/50 text-neon-orange hover:bg-neon-orange/30 neon-border-orange mt-2 flex w-full cursor-pointer items-center justify-center gap-2 py-1.5 text-sm font-bold tracking-wider uppercase transition-colors duration-150"
          aria-label={`Repair ${def.name}`}
        >
          <Wrench size={14} />
          Repair Now
        </button>
      )}

      {/* Pending cash badge */}
      {ride.pendingCash > 0 && (
        <button
          onClick={handleCollect}
          className="neon-border-orange text-neon-orange absolute top-2 right-2 flex cursor-pointer items-center gap-1 bg-[#1a1a35] px-2 py-1 text-xs font-bold transition-transform hover:scale-110"
          aria-label={`Collect ${formatMoney(ride.pendingCash)}`}
        >
          <DollarSign size={12} />
          <CountUp
            to={ride.pendingCash}
            formatDisplay={formatMoneyCount}
            duration={0.65}
            className="tabular-nums"
            startWhen
          />
        </button>
      )}

      {/* Selected indicator */}
      {isSelected && !ride.pendingCash && (
        <div className="absolute top-1 right-1">
          <Settings size={14} className="text-neon-purple animate-spin-slow" />
        </div>
      )}

      {/* Ride color accent stripe */}
      <div
        className="absolute top-0 bottom-0 left-0 w-1.5 opacity-80"
        style={{ background: def.gridColor, boxShadow: `0 0 8px ${def.gridColor}` }}
      />
    </div>
  );
};
