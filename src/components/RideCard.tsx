import { useCallback } from 'react';
import { Wrench, Zap, Users, AlertTriangle, CheckCircle, Settings, DollarSign } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { getRideDefinition } from '@/data/rides';
import { purchasedUpgradesIncludeAutoRepairForRide } from '@/data/upgrades';
import type { Ride } from '@/types/game';
import { playGameSfx } from '@/audio/soundManager';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
    badgeClass: 'border-green-500/40 bg-green-500/10 text-green-400',
    bgClass: 'bg-green-500/5',
    icon: <CheckCircle size={12} />,
    dot: 'bg-green-400',
    dotGlow: 'shadow-[0_0_6px_#22c55e]',
  },
  broken: {
    label: 'BROKEN',
    color: 'text-red-400',
    badgeClass: 'border-red-500/40 bg-red-500/10 text-red-400',
    bgClass: 'bg-red-500/5',
    icon: <AlertTriangle size={12} />,
    dot: 'bg-red-400',
    dotGlow: 'shadow-[0_0_6px_#ef4444]',
  },
  repairing: {
    label: 'REPAIRING',
    color: 'text-yellow-400',
    badgeClass: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-400',
    bgClass: 'bg-yellow-500/5',
    icon: <Wrench size={12} />,
    dot: 'bg-yellow-400',
    dotGlow: 'shadow-[0_0_6px_#eab308]',
  },
  idle: {
    label: 'IDLE',
    color: 'text-muted-foreground',
    badgeClass: 'border-muted bg-muted/30',
    bgClass: 'bg-muted/20',
    icon: null,
    dot: 'bg-muted-foreground',
    dotGlow: '',
  },
  locked: {
    label: 'LOCKED',
    color: 'text-muted-foreground',
    badgeClass: 'border-muted bg-muted/20',
    bgClass: 'bg-muted/10',
    icon: null,
    dot: 'bg-muted-foreground/80',
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
    <Card
      size="sm"
      onClick={handleSelect}
      className={cn(
        'relative cursor-pointer gap-3 py-4 pr-4 pl-5 transition-all select-none',
        statusCfg.bgClass,
        isSelected && 'ring-primary ring-offset-background ring-2 ring-offset-2',
        !isSelected && 'hover:bg-card/80',
        ride.status === 'broken' && 'animate-shake'
      )}
      style={{ backgroundColor: `color-mix(in srgb, ${def.gridColor} 10%, var(--card))` }}
      role="button"
      aria-label={`${def.name} - ${statusCfg.label}`}
    >
      <div
        className="absolute top-0 bottom-0 left-0 w-1 rounded-l-xl opacity-80"
        style={{ background: def.gridColor, boxShadow: `0 0 8px ${def.gridColor}` }}
      />

      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-3xl leading-none">{def.icon}</span>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm leading-none font-bold">{def.name}</span>
              {ride.level > 1 && (
                <Badge
                  variant="outline"
                  className="font-heading border-neon-cyan/50 text-neon-cyan px-1 py-0 text-[10px]"
                >
                  L{ride.level}
                </Badge>
              )}
            </div>
            <Badge
              variant="outline"
              className={cn(
                'mt-1 gap-1.5 border px-1.5 py-0.5 text-xs font-semibold',
                statusCfg.badgeClass,
                ride.status === 'broken' && 'animate-pulse-neon'
              )}
            >
              <span
                className={cn(
                  'inline-block h-2 w-2 shrink-0 rounded-full',
                  statusCfg.dot,
                  statusCfg.dotGlow,
                  ride.status === 'broken' && 'animate-pulse'
                )}
              />
              {statusCfg.icon}
              {statusCfg.label}
            </Badge>
          </div>
        </div>

        {hasAutoRepair && (
          <Badge
            variant="secondary"
            className="border-neon-purple/40 bg-neon-purple/15 text-neon-violet shrink-0 gap-1"
          >
            <Zap size={12} />
            AUTO
          </Badge>
        )}
      </div>

      <div className="mb-2 flex items-center gap-1.5">
        <span className="text-muted-foreground w-10 text-xs tracking-wider uppercase">Thrill</span>
        <div className="flex gap-0.5">
          {thrillBars.map((filled, i) => (
            <div
              key={i}
              className={cn('h-2 w-4 rounded-sm', filled ? 'bg-neon-orange' : 'bg-muted')}
              style={filled ? { boxShadow: '0 0 4px #f97316' } : undefined}
            />
          ))}
        </div>
      </div>

      {ride.dirtLevel > 0 && (
        <div className="mb-2">
          <div className="text-muted-foreground mb-0.5 flex justify-between text-xs">
            <span className="tracking-wider uppercase">Dirt</span>
            <span>{Math.round(ride.dirtLevel)}%</span>
          </div>
          <div className="pixel-bar h-2 overflow-hidden rounded-sm">
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

      {ride.status === 'operating' && (
        <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <Users size={12} className="text-neon-cyan" />
          <span className="font-medium">{ride.currentVisitors}</span>
          <span className="opacity-50">/ {def.baseCapacity} guests</span>
        </div>
      )}

      {ride.status === 'repairing' && (
        <div>
          <div className="mb-0.5 flex justify-between text-xs text-yellow-400">
            <span className="flex items-center gap-1 tracking-wider uppercase">
              <Wrench size={11} />
              {ride.isAutoRepair ? 'Auto Repair' : 'Repairing'}
            </span>
            <span>{Math.round(ride.repairProgress)}%</span>
          </div>
          <div className="pixel-bar h-2 overflow-hidden rounded-sm">
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

      <Button
        variant="destructive"
        size="sm"
        disabled={ride.status !== 'broken'}
        className="mt-2 w-full font-bold uppercase disabled:opacity-40"
        onClick={handleRepair}
        aria-label={
          ride.status === 'broken' ? `Repair ${def.name}` : `Repair ${def.name} (ride is not broken)`
        }
      >
        <Wrench size={14} />
        Repair Now
      </Button>

      <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
        <Button
          variant="outline"
          size="sm"
          disabled={ride.pendingCash <= 0}
          onClick={handleCollect}
          className="border-neon-orange/60 text-neon-orange hover:bg-neon-orange/10 h-auto gap-1 px-2 py-1 text-xs font-bold disabled:opacity-40"
          aria-label={
            ride.pendingCash > 0
              ? `Collect ${formatMoney(ride.pendingCash)}`
              : 'Collect cash (none pending)'
          }
        >
          <DollarSign size={12} />
          <CountUp
            to={ride.pendingCash}
            formatDisplay={formatMoneyCount}
            duration={0.65}
            className="tabular-nums"
            startWhen
          />
        </Button>
        {isSelected && (
          <Settings size={14} className="text-primary animate-spin-slow" aria-hidden />
        )}
      </div>
    </Card>
  );
};
