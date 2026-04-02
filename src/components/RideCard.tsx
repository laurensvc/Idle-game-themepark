import { Wrench, Zap, Users, AlertTriangle, CheckCircle, Settings } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { getRideDefinition } from '../data/rides';
import type { Ride } from '../types/game';

interface RideCardProps {
  ride: Ride;
}

const STATUS_CONFIG = {
  operating: {
    label: 'OPEN',
    color: 'text-green-400',
    borderClass: 'border-green-500/40 neon-border-green',
    bgClass: 'bg-green-500/5',
    icon: <CheckCircle size={12} />,
  },
  broken: {
    label: 'BROKEN',
    color: 'text-red-400',
    borderClass: 'border-red-500/40 neon-border-red animate-pulse-neon',
    bgClass: 'bg-red-500/5',
    icon: <AlertTriangle size={12} />,
  },
  repairing: {
    label: 'REPAIRING',
    color: 'text-yellow-400',
    borderClass: 'border-yellow-500/40',
    bgClass: 'bg-yellow-500/5',
    icon: <Wrench size={12} />,
  },
  idle: {
    label: 'IDLE',
    color: 'text-slate-400',
    borderClass: 'border-slate-600/40',
    bgClass: 'bg-slate-800/30',
    icon: null,
  },
  locked: {
    label: 'LOCKED',
    color: 'text-slate-500',
    borderClass: 'border-slate-700/40',
    bgClass: 'bg-slate-900/30',
    icon: null,
  },
};

export const RideCard = ({ ride }: RideCardProps) => {
  const { repairRide, selectRide, selectedRideId, purchasedUpgrades } = useGameStore();
  const def = getRideDefinition(ride.definitionId);
  if (!def) return null;

  const isSelected = selectedRideId === ride.instanceId;
  const statusCfg = STATUS_CONFIG[ride.status];
  const hasAutoRepair = purchasedUpgrades.some(
    (id) => id === `${ride.definitionId}_auto_repair` || id === `${ride.definitionId.split('_')[0]}_auto_repair`
  );
  const thrillBars = Array.from({ length: 5 }, (_, i) => i < def.thrillLevel);

  const handleRepair = (e: React.MouseEvent) => {
    e.stopPropagation();
    repairRide(ride.instanceId);
  };

  return (
    <div
      onClick={() => selectRide(isSelected ? null : ride.instanceId)}
      className={`relative cursor-pointer rounded-xl border-2 p-3 transition-all duration-200 select-none ${statusCfg.borderClass} ${statusCfg.bgClass} ${isSelected ? 'ring-neon-purple ring-offset-park-bg ring-2 ring-offset-1' : 'hover:brightness-125'} bg-park-card`}
      role="button"
      aria-label={`${def.name} - ${statusCfg.label}`}
    >
      {/* Header */}
      <div className="mb-2 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl leading-none">{def.icon}</span>
          <div>
            <div className="text-xs leading-none font-bold text-white">{def.name}</div>
            <div className={`mt-0.5 flex items-center gap-1 text-[10px] font-semibold ${statusCfg.color}`}>
              {statusCfg.icon}
              {statusCfg.label}
            </div>
          </div>
        </div>

        {/* Auto repair badge */}
        {hasAutoRepair && (
          <div className="bg-neon-purple/20 border-neon-purple/40 flex items-center gap-1 rounded border px-1.5 py-0.5">
            <Zap size={10} className="text-neon-violet" />
            <span className="text-neon-violet text-[9px] font-bold">AUTO</span>
          </div>
        )}
      </div>

      {/* Thrill meter */}
      <div className="mb-2 flex items-center gap-1">
        <span className="w-8 text-[9px] tracking-wider text-slate-500 uppercase">Thrill</span>
        <div className="flex gap-0.5">
          {thrillBars.map((filled, i) => (
            <div
              key={i}
              className={`h-1.5 w-3 rounded-sm ${filled ? 'bg-neon-orange' : 'bg-park-border'}`}
              style={filled ? { boxShadow: '0 0 4px #f97316' } : undefined}
            />
          ))}
        </div>
      </div>

      {/* Dirt bar */}
      {ride.dirtLevel > 0 && (
        <div className="mb-2">
          <div className="mb-0.5 flex justify-between text-[9px] text-slate-500">
            <span className="tracking-wider uppercase">Dirt</span>
            <span>{Math.round(ride.dirtLevel)}%</span>
          </div>
          <div className="bg-park-border h-1 overflow-hidden rounded-full">
            <div
              className="h-full rounded-full transition-all duration-500"
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
        <div className="flex items-center gap-1 text-[10px] text-slate-400">
          <Users size={10} className="text-neon-cyan" />
          <span className="font-medium">{ride.currentVisitors}</span>
          <span className="opacity-50">/ {def.baseCapacity} guests</span>
        </div>
      )}

      {/* Repair progress bar */}
      {ride.status === 'repairing' && (
        <div>
          <div className="mb-0.5 flex justify-between text-[9px] text-yellow-400">
            <span className="flex items-center gap-1 tracking-wider uppercase">
              <Wrench size={9} />
              {ride.isAutoRepair ? 'Auto Repair' : 'Repairing'}
            </span>
            <span>{Math.round(ride.repairProgress)}%</span>
          </div>
          <div className="bg-park-border h-1.5 overflow-hidden rounded-full">
            <div
              className="h-full rounded-full bg-yellow-400 transition-all duration-1000"
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
          className="bg-neon-orange/20 border-neon-orange/50 text-neon-orange hover:bg-neon-orange/30 neon-border-orange mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border py-1.5 text-xs font-bold tracking-wider uppercase transition-colors duration-150"
          aria-label={`Repair ${def.name}`}
        >
          <Wrench size={12} />
          Repair Now
        </button>
      )}

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-1 right-1">
          <Settings size={12} className="text-neon-purple animate-spin-slow" />
        </div>
      )}

      {/* Ride color accent stripe */}
      <div
        className="absolute top-0 bottom-0 left-0 w-1 rounded-l-xl opacity-80"
        style={{ background: def.gridColor, boxShadow: `0 0 8px ${def.gridColor}` }}
      />
    </div>
  );
};
