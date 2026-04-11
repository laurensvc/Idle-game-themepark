import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/store/gameStore';
import { Battery } from 'lucide-react';

export const ParkBatteryBar = () => {
  const parkBatteryLevel = useGameStore((s) => s.parkBatteryLevel);
  const chargeParkBattery = useGameStore((s) => s.chargeParkBattery);

  const canCharge = parkBatteryLevel < 100;

  return (
    <div className="border-border/60 bg-background/95 shrink-0 border-b px-3 py-2 backdrop-blur-sm">
      <Card
        size="sm"
        className={cn(
          'mx-auto max-w-2xl gap-0 py-2.5 pr-3 pl-3 shadow-xs ring-1 ring-foreground/10 transition-colors',
          canCharge &&
            'hover:ring-neon-violet/30 cursor-pointer hover:bg-neon-violet/5 focus-within:ring-neon-violet/40'
        )}
        role={canCharge ? 'button' : 'region'}
        tabIndex={canCharge ? 0 : undefined}
        onClick={() => canCharge && chargeParkBattery()}
        onKeyDown={(e) => {
          if (!canCharge) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            chargeParkBattery();
          }
        }}
        aria-label={
          canCharge
            ? `Park battery ${Math.round(parkBatteryLevel)} percent, tap to charge`
            : `Park battery full at ${Math.round(parkBatteryLevel)} percent`
        }
      >
        <div className="text-muted-foreground mb-1 flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 font-semibold tracking-wider uppercase">
            <Battery
              size={14}
              className={parkBatteryLevel > 30 ? 'text-neon-cyan' : 'text-amber-400'}
              aria-hidden
            />
            Park power
          </span>
          <span className="tabular-nums">{Math.round(parkBatteryLevel)}%</span>
        </div>
        <div className="pixel-bar bg-muted h-2.5 overflow-hidden rounded-sm">
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${parkBatteryLevel}%`,
              background: parkBatteryLevel > 40 ? '#22d3ee' : parkBatteryLevel > 15 ? '#eab308' : '#f97316',
              boxShadow:
                parkBatteryLevel > 0
                  ? `0 0 8px ${parkBatteryLevel > 40 ? '#22d3ee' : '#f59e0b'}`
                  : undefined,
            }}
          />
        </div>
        {canCharge ? (
          <span className="text-muted-foreground mt-1 block text-center text-[10px] tracking-wide">
            Tap to charge — powers all rides
          </span>
        ) : (
          <span className="text-muted-foreground mt-1 block text-center text-[10px] tracking-wide">Fully charged</span>
        )}
      </Card>
    </div>
  );
};
