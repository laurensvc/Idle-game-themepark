import { cn } from '@/lib/utils';
import { useGameStore } from '@/store/gameStore';
import { Battery, BatteryFull, BatteryLow, Zap } from 'lucide-react';
import { memo } from 'react';

const getBatteryColor = (level: number): string => {
  if (level > 60) return 'bg-park-green';
  if (level > 30) return 'bg-park-yellow';
  return 'bg-park-red';
};

const getBatteryIcon = (level: number) => {
  if (level > 60) return BatteryFull;
  if (level > 20) return Battery;
  return BatteryLow;
};

const ParkBatteryBar: React.FC = memo(() => {
  const battery = useGameStore((s) => s.parkBattery);
  const recharge = useGameStore((s) => s.rechargeBattery);
  const Icon = getBatteryIcon(battery);

  return (
    <button
      onClick={recharge}
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 transition-all duration-150 select-none active:scale-95',
        'bg-card border-border/60 border shadow-sm hover:shadow-md',
        battery <= 15 && 'animate-pulse-glow'
      )}
      aria-label={`Recharge battery. Current: ${Math.round(battery)}%`}
    >
      <Icon className={cn('h-5 w-5', battery <= 15 ? 'text-park-red' : 'text-park-green')} />
      <div className="min-w-[80px] flex-1">
        <div className="park-bar h-2.5">
          <div
            className={cn('h-full rounded-full transition-all duration-300', getBatteryColor(battery))}
            style={{ width: `${Math.min(100, battery)}%` }}
          />
        </div>
      </div>
      <span className="w-9 text-right font-mono text-xs font-bold tabular-nums">{Math.round(battery)}%</span>
      <Zap className="text-park-yellow h-3.5 w-3.5" />
    </button>
  );
});

ParkBatteryBar.displayName = 'ParkBatteryBar';
export default ParkBatteryBar;
