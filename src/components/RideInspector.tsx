import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getLevelCapacityMultiplier, getLevelIncomeMultiplier, getLevelUpCost, getRideDefinition } from '@/data/rides';
import { UPGRADE_DEFINITIONS, getUpgradeDefinition } from '@/data/upgrades';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/store/gameStore';
import { AlertTriangle, ArrowUp, Battery, CheckCircle, Lock, Users, Wrench, X, Zap } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

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
  operating: { text: 'text-green-400', bg: 'bg-green-500/15', border: 'border-green-500/40', dot: 'bg-green-400' },
  broken: { text: 'text-red-400', bg: 'bg-red-500/15', border: 'border-red-500/40', dot: 'bg-red-400' },
  repairing: { text: 'text-yellow-400', bg: 'bg-yellow-500/15', border: 'border-yellow-500/40', dot: 'bg-yellow-400' },
  idle: { text: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-500/40', dot: 'bg-amber-400' },
  locked: { text: 'text-muted-foreground', bg: 'bg-muted/20', border: 'border-border', dot: 'bg-muted-foreground' },
};

export const RideInspector = () => {
  const {
    selectedRideId,
    rides,
    selectRide,
    repairRide,
    cleanRide,
    levelUpRide,
    chargeRideBattery,
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
      chargeRideBattery: s.chargeRideBattery,
      purchasedUpgrades: s.purchasedUpgrades,
      money: s.money,
      buyUpgrade: s.buyUpgrade,
    }))
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

  const canChargeBattery = ride.status !== 'broken' && ride.status !== 'repairing' && ride.batteryLevel < 100;

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => selectRide(null)}
        className="text-muted-foreground hover:text-foreground w-fit gap-2 px-0"
        aria-label="Close ride inspector"
      >
        <X size={14} />
        Back
      </Button>

      <Card size="sm" className="gap-3 py-4 text-center shadow-none ring-1" style={{ borderColor: def.gridColor }}>
        <span className="text-5xl leading-none">{def.icon}</span>
        <h2 className="font-heading text-sm" style={{ color: def.gridColor }}>
          {def.name}
        </h2>
        <div className="text-muted-foreground font-heading text-xs">
          LVL {ride.level} / {def.maxLevel}
        </div>
        <Badge
          variant="outline"
          className={cn(
            'mx-auto gap-2 border px-3 py-1 text-xs font-bold uppercase',
            statusStyle.bg,
            statusStyle.border,
            statusStyle.text
          )}
        >
          <span
            className={cn(
              'inline-block h-2.5 w-2.5 rounded-full',
              statusStyle.dot,
              ride.status === 'broken' && 'animate-pulse'
            )}
          />
          {ride.status === 'broken' && <AlertTriangle size={12} />}
          {ride.status === 'repairing' && <Wrench size={12} />}
          {ride.status === 'idle' && <Zap size={12} />}
          {ride.status === 'idle' ? 'off' : ride.status}
        </Badge>
        <p className="text-muted-foreground px-2 text-xs">{def.description}</p>
      </Card>

      <Card
        size="sm"
        className={cn(
          'gap-3 py-4 shadow-none transition-colors',
          canChargeBattery && 'ring-neon-violet/20 hover:ring-neon-violet/40 cursor-pointer ring-1'
        )}
        role={canChargeBattery ? 'button' : undefined}
        tabIndex={canChargeBattery ? 0 : undefined}
        onClick={() => canChargeBattery && chargeRideBattery(ride.instanceId)}
        onKeyDown={(e) => {
          if (!canChargeBattery) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            chargeRideBattery(ride.instanceId);
          }
        }}
        aria-label={
          canChargeBattery
            ? `Charge battery for ${def.name}, ${Math.round(ride.batteryLevel)} percent`
            : ride.batteryLevel >= 100
              ? `Battery full for ${def.name}`
              : `Battery ${Math.round(ride.batteryLevel)} percent — cannot charge while broken or repairing`
        }
      >
        <div className="text-muted-foreground flex items-center gap-2 px-4 text-xs font-bold tracking-wider uppercase">
          <Battery size={14} className="text-neon-cyan" />
          Battery — tap to charge
        </div>
        <Separator />
        <div className="px-4">
          <div className="mb-1 flex justify-between text-sm">
            <span className="text-muted-foreground">Charge</span>
            <span className="font-heading tabular-nums">{Math.round(ride.batteryLevel)}%</span>
          </div>
          <div className="pixel-bar bg-muted h-3 overflow-hidden rounded-sm">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${ride.batteryLevel}%`,
                background: ride.batteryLevel > 40 ? '#22d3ee' : ride.batteryLevel > 15 ? '#eab308' : '#f97316',
                boxShadow:
                  ride.batteryLevel > 0 ? `0 0 10px ${ride.batteryLevel > 40 ? '#22d3ee' : '#f59e0b'}` : undefined,
              }}
            />
          </div>
          {!canChargeBattery && ride.batteryLevel < 100 && (
            <p className="text-muted-foreground mt-2 text-center text-xs">
              Available when ride is not broken or under repair.
            </p>
          )}
          {ride.batteryLevel >= 100 && ride.status !== 'broken' && ride.status !== 'repairing' && (
            <p className="text-muted-foreground mt-2 text-center text-xs">Battery full.</p>
          )}
        </div>
      </Card>

      <Card size="sm" className="gap-3 py-4 shadow-none">
        <div className="text-muted-foreground px-4 text-xs font-bold tracking-wider uppercase">Live Stats</div>
        <Separator />
        <div className="text-foreground flex items-center justify-between px-4 text-sm">
          <span className="text-muted-foreground flex items-center gap-1.5">
            <Users size={14} className="text-neon-cyan" />
            Guests
          </span>
          <span className="font-heading text-sm">
            {ride.currentVisitors} <span className="text-muted-foreground text-xs">/ {currentCapacity}</span>
          </span>
        </div>
        <div className="flex items-center justify-between px-4 text-sm">
          <span className="text-muted-foreground">$/tick</span>
          <span className="font-heading text-neon-orange text-sm">
            ${Math.floor(def.baseCostPerTick * currentIncomeMult)}
          </span>
        </div>
        <div className="flex items-center justify-between px-4 text-sm">
          <span className="text-muted-foreground">Total served</span>
          <span className="font-heading text-sm">{ride.totalVisitorsServed}</span>
        </div>
        <div className="flex items-center justify-between px-4 text-sm">
          <span className="text-muted-foreground">Thrill</span>
          <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className={cn('h-3 w-4 rounded-sm', i < def.thrillLevel ? 'bg-neon-orange' : 'bg-muted')}
                style={i < def.thrillLevel ? { boxShadow: '0 0 4px #f97316' } : undefined}
              />
            ))}
          </div>
        </div>
        <div className="px-4">
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Dirt</span>
            <span
              className={cn(
                'font-heading text-sm',
                ride.dirtLevel > 70 ? 'text-red-400' : ride.dirtLevel > 40 ? 'text-yellow-400' : 'text-green-400'
              )}
            >
              {Math.round(ride.dirtLevel)}%
            </span>
          </div>
          <div className="pixel-bar bg-muted h-3 overflow-hidden rounded-sm">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${ride.dirtLevel}%`,
                background: ride.dirtLevel > 70 ? '#ef4444' : ride.dirtLevel > 40 ? '#eab308' : '#8b7355',
              }}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled={ride.dirtLevel <= 0 || ride.status === 'broken' || ride.status === 'repairing'}
            onClick={() => cleanRide(ride.instanceId)}
            className="mt-2 w-full border-green-500/40 text-green-400 hover:bg-green-500/10 disabled:opacity-40"
            aria-label={`Clean ${def.name}`}
          >
            🧹 Clean Ride
          </Button>
        </div>
      </Card>

      <Card size="sm" className="gap-3 py-4 shadow-none">
        <div className="text-muted-foreground flex items-center gap-2 px-4 text-xs font-bold tracking-wider uppercase">
          <ArrowUp size={12} className="text-neon-cyan" />
          Level Up
        </div>
        <Separator />
        {isMaxLevel ? (
          <div className="text-neon-green px-4 text-center text-sm font-medium">MAX LEVEL</div>
        ) : (
          <div className="flex flex-col gap-3 px-4">
            <div className="text-muted-foreground space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Capacity</span>
                <span>
                  {currentCapacity} → <span className="text-neon-cyan">{nextCapacity}</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span>Income mult</span>
                <span>
                  {currentIncomeMult.toFixed(2)}x →{' '}
                  <span className="text-neon-orange">{nextIncomeMult.toFixed(2)}x</span>
                </span>
              </div>
            </div>
            <Button
              variant="secondary"
              disabled={!canLevelUp}
              onClick={() => levelUpRide(ride.instanceId)}
              className={cn(
                'border-neon-cyan/50 w-full gap-2 font-bold uppercase',
                canLevelUp && 'bg-neon-cyan/15 text-neon-cyan hover:bg-neon-cyan/25'
              )}
              aria-label={`Level up ${def.name} for ${formatMoney(levelUpCost)}`}
            >
              <ArrowUp size={14} />
              Level {ride.level + 1} — {formatMoney(levelUpCost)}
            </Button>
          </div>
        )}
      </Card>

      <Button
        variant="destructive"
        size="lg"
        disabled={ride.status !== 'broken'}
        onClick={() => repairRide(ride.instanceId)}
        className={cn(
          'w-full gap-2 font-bold uppercase disabled:opacity-40',
          ride.status === 'broken' && 'animate-pulse-neon'
        )}
        aria-label={ride.status === 'broken' ? `Repair ${def.name}` : `Repair ${def.name} (ride is not broken)`}
      >
        <Wrench size={16} />
        Repair Now
      </Button>

      {ride.status === 'repairing' && (
        <Card size="sm" className="gap-2 border-yellow-500/30 bg-yellow-500/10 py-3 shadow-none">
          <div className="flex items-center justify-between text-sm text-yellow-400">
            <span className="flex items-center gap-1.5 font-bold uppercase">
              <Wrench size={14} />
              {ride.isAutoRepair ? 'Auto Repair' : 'Repairing'}
            </span>
            <span className="font-heading">{Math.round(ride.repairProgress)}%</span>
          </div>
          <div className="pixel-bar bg-muted h-3 overflow-hidden rounded-sm">
            <div
              className="h-full bg-yellow-400 transition-all duration-1000"
              style={{ width: `${ride.repairProgress}%`, boxShadow: '0 0 8px #eab308' }}
            />
          </div>
        </Card>
      )}

      {rideUpgrades.length > 0 && (
        <Card size="sm" className="gap-2 py-4 shadow-none">
          <div className="text-muted-foreground flex items-center gap-2 px-4 text-xs font-bold tracking-wider uppercase">
            <Zap size={12} className="text-neon-violet" />
            Ride Upgrades
          </div>
          <Separator />
          <div className="flex flex-col gap-2 px-2">
            {rideUpgrades.map((upgrade) => {
              const isPurchased = purchasedUpgrades.includes(upgrade.id);
              const prereqMet = !upgrade.requires || purchasedUpgrades.includes(upgrade.requires);
              const canAfford = money >= upgrade.cost;
              const prereqUpgrade = upgrade.requires ? getUpgradeDefinition(upgrade.requires) : null;
              const isAvailable = prereqMet && !isPurchased;

              return (
                <Button
                  key={upgrade.id}
                  variant="outline"
                  disabled={!isAvailable || !canAfford}
                  onClick={() => isAvailable && canAfford && buyUpgrade(upgrade.id)}
                  className={cn(
                    'h-auto min-h-14 w-full flex-col items-stretch gap-0 p-3 text-left whitespace-normal',
                    isPurchased && 'border-green-500/30 bg-green-500/5',
                    isAvailable && canAfford && !isPurchased && 'hover:border-neon-violet/50 hover:bg-neon-purple/5',
                    (!isAvailable || !canAfford) && !isPurchased && 'opacity-50'
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-sm font-bold">{upgrade.name}</span>
                        <Badge variant="secondary" className="text-muted-foreground text-xs">
                          {EFFECT_LABELS[upgrade.effect] ?? upgrade.effect}
                        </Badge>
                      </div>
                      <div className="text-muted-foreground mt-0.5 text-xs">{upgrade.description}</div>
                      {!prereqMet && prereqUpgrade && (
                        <div className="mt-1 flex items-center gap-1 text-xs text-yellow-500/80">
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
        </Card>
      )}
    </div>
  );
};
