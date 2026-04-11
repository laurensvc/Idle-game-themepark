import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  RIDE_BATTERY_CHARGE_PER_CLICK,
  TICKET_BOOTH_CASH_MAX,
  TICKET_BOOTH_CASH_MIN,
  useGameStore,
} from '@/store/gameStore';
import { Battery, MousePointer2, Ticket, Wind, Wrench } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

type FloatText = {
  id: number;
  x: number;
  y: number;
  text: string;
  className: string;
};

type FloaterCursor = {
  id: number;
  left: string;
  top: string;
  dx: string;
  dy: string;
  rot: string;
};

let burstId = 0;
let cursorId = 0;

export const ActionArena = () => {
  const ticketBoothClick = useGameStore((s) => s.ticketBoothClick);
  const arenaQuickSweep = useGameStore((s) => s.arenaQuickSweep);
  const arenaMaintenanceClick = useGameStore((s) => s.arenaMaintenanceClick);
  const chargeParkBattery = useGameStore((s) => s.chargeParkBattery);
  const parkBatteryLevel = useGameStore((s) => s.parkBatteryLevel);
  const parkDirt = useGameStore((s) => s.parkDirt);
  const rides = useGameStore((s) => s.rides);

  const [bursts, setBursts] = useState<FloatText[]>([]);
  const [cursors, setCursors] = useState<FloaterCursor[]>([]);
  const [ticketSquish, setTicketSquish] = useState(false);
  const arenaRef = useRef<HTMLDivElement>(null);

  const pushBurst = useCallback((x: number, y: number, text: string, className: string) => {
    const id = ++burstId;
    setBursts((b) => [...b, { id, x, y, text, className }]);
    window.setTimeout(() => setBursts((b) => b.filter((item) => item.id !== id)), 780);
  }, []);

  const maybeSpawnHelperCursor = useCallback(() => {
    if (Math.random() > 0.18) return;
    const id = ++cursorId;
    const left = `${12 + Math.random() * 56}%`;
    const top = `${18 + Math.random() * 38}%`;
    const dx = `${-30 + Math.random() * 60}px`;
    const dy = `${-40 - Math.random() * 36}px`;
    const rot = `${-35 + Math.random() * 70}deg`;
    setCursors((c) => [...c, { id, left, top, dx, dy, rot }]);
    window.setTimeout(() => setCursors((c) => c.filter((item) => item.id !== id)), 1100);
  }, []);

  const handleTicketPointer = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const gain = ticketBoothClick();
      if (gain <= 0) return;
      pushBurst(
        x,
        y,
        `+$${gain}`,
        'font-heading text-neon-orange text-lg font-black drop-shadow-[0_0_8px_rgba(249,115,22,0.9)]'
      );
      maybeSpawnHelperCursor();
      setTicketSquish(true);
      window.setTimeout(() => setTicketSquish(false), 160);
    },
    [maybeSpawnHelperCursor, pushBurst, ticketBoothClick]
  );

  const handleSweep = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const dirtTotal = () =>
        useGameStore.getState().parkDirt +
        useGameStore.getState().rides.reduce((acc, r) => acc + r.dirtLevel, 0);
      const before = dirtTotal();
      arenaQuickSweep();
      const after = dirtTotal();
      if (before === after) {
        pushBurst(x, y, 'Already clean', 'text-muted-foreground text-xs font-medium');
      } else {
        pushBurst(
          x,
          y,
          after <= 0.01 ? '✨ spotless' : '✨ cleaner',
          'text-neon-cyan text-sm font-bold'
        );
      }
    },
    [arenaQuickSweep, pushBurst]
  );

  const handleMaintenance = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      arenaMaintenanceClick();
      pushBurst(x, y, '🔧 +$1', 'text-neon-violet text-sm font-bold');
      if (Math.random() < 0.12) maybeSpawnHelperCursor();
    },
    [arenaMaintenanceClick, maybeSpawnHelperCursor, pushBurst]
  );

  const handleGenerator = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const prev = useGameStore.getState().parkBatteryLevel;
      if (prev >= 100) {
        pushBurst(x, y, 'MAX', 'text-muted-foreground text-xs font-bold');
        return;
      }
      chargeParkBattery();
      const next = useGameStore.getState().parkBatteryLevel;
      const added = Math.round(next - prev);
      pushBurst(x, y, `⚡ +${added}%`, 'text-neon-cyan text-sm font-black');
    },
    [chargeParkBattery, pushBurst]
  );

  const hasDirt = parkDirt > 0 || rides.some((r) => r.dirtLevel > 0);
  const canCharge = parkBatteryLevel < 100;

  return (
    <aside
      ref={arenaRef}
      className="border-border/80 from-park-surface/90 to-background relative flex max-h-[min(42vh,22rem)] w-full shrink-0 flex-col gap-3 overflow-y-auto border-b bg-linear-to-b p-3 lg:max-h-none lg:h-full lg:w-[min(20rem,100%)] lg:overflow-visible lg:border-r lg:border-b-0"
      aria-label="Front gate — tap actions"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 20%, rgba(167,139,250,0.35), transparent 55%)`,
          }}
        />
      </div>

      <div className="relative space-y-1">
        <h2 className="font-heading text-foreground text-xs font-black tracking-widest uppercase">Front gate</h2>
        <p className="text-muted-foreground text-[11px] leading-snug">
          Start here: tap the roll for cash, then power the park. Rides live in the grid; Shop is on the right.
        </p>
      </div>

      <div className="relative min-h-[200px] flex-1">
        {bursts.map((b) => (
          <span
            key={b.id}
            className={cn('animate-arena-float-text absolute z-20 font-sans', b.className)}
            style={{ left: b.x, top: b.y }}
          >
            {b.text}
          </span>
        ))}
        {cursors.map((c) => (
          <MousePointer2
            key={c.id}
            className="animate-arena-cursor-wander text-neon-orange absolute z-10 size-7 drop-shadow-[0_0_6px_rgba(249,115,22,0.85)]"
            style={
              {
                left: c.left,
                top: c.top,
                ['--dx' as string]: c.dx,
                ['--dy' as string]: c.dy,
                ['--rot' as string]: c.rot,
              } as React.CSSProperties
            }
            aria-hidden
          />
        ))}

        <button
          type="button"
          onPointerDown={handleTicketPointer}
          className={cn(
            'group border-neon-orange/50 from-amber-500/25 via-orange-500/20 to-rose-500/15 hover:border-neon-orange/80 relative w-full cursor-pointer rounded-2xl border-2 bg-linear-to-br p-4 text-center shadow-[0_0_24px_rgba(249,115,22,0.12)] transition-[box-shadow,transform] outline-none select-none hover:shadow-[0_0_32px_rgba(249,115,22,0.22)] active:scale-[0.98]',
            ticketSquish && 'animate-arena-ticket-squish'
          )}
          aria-label={`Sell tickets for about ${TICKET_BOOTH_CASH_MIN} to ${TICKET_BOOTH_CASH_MAX} dollars per tap`}
        >
          <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-30 mix-blend-screen">
            <div
              className="h-full w-full rounded-2xl bg-[repeating-linear-gradient(135deg,transparent,transparent_6px,rgba(255,255,255,0.06)_6px,rgba(255,255,255,0.06)_7px)]"
              aria-hidden
            />
          </div>
          <Ticket
            className="text-neon-orange mx-auto mb-2 size-14 drop-shadow-[0_0_12px_rgba(249,115,22,0.6)] transition-transform group-hover:scale-105"
            strokeWidth={1.75}
            aria-hidden
          />
          <div className="font-heading text-foreground text-sm font-black tracking-wide">Ticket roll</div>
          <div className="text-muted-foreground mt-0.5 text-[10px] leading-tight">
            Tap fast — like a cookie, but it’s tickets · ~${TICKET_BOOTH_CASH_MIN}–${TICKET_BOOTH_CASH_MAX}/tap
          </div>
        </button>

        <div className="mt-3 grid grid-cols-3 gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onPointerDown={handleGenerator}
            disabled={!canCharge}
            className={cn(
              'h-auto flex-col gap-1 py-2.5 text-[10px] font-bold tracking-wide uppercase',
              canCharge && 'border-neon-cyan/40 hover:bg-neon-cyan/10 text-neon-cyan'
            )}
            aria-label={canCharge ? 'Crank generator to charge park power' : 'Park power full'}
          >
            <Battery className="size-4" aria-hidden />
            Power
            <span className="text-muted-foreground font-normal normal-case">+{RIDE_BATTERY_CHARGE_PER_CLICK}%</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onPointerDown={handleSweep}
            disabled={!hasDirt}
            className={cn(
              'h-auto flex-col gap-1 py-2.5 text-[10px] font-bold tracking-wide uppercase',
              hasDirt && 'border-neon-cyan/40 hover:bg-neon-cyan/10 text-neon-cyan'
            )}
            aria-label="Sweep paths — reduces park and ride dirt a little"
          >
            <Wind className="size-4" aria-hidden />
            Sweep
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onPointerDown={handleMaintenance}
            className="h-auto flex-col gap-1 border-neon-violet/35 py-2.5 text-[10px] font-bold tracking-wide text-neon-violet uppercase hover:bg-neon-violet/10"
            aria-label="Maintenance tap — small tip and happiness bump"
          >
            <Wrench className="size-4" aria-hidden />
            Tune-up
          </Button>
        </div>

        <Card size="sm" className="mt-3 border-dashed py-2.5 shadow-none ring-1 ring-foreground/10">
          <p className="text-muted-foreground px-2 text-center text-[10px] leading-snug">
            Helpers sometimes pop in when the crowd goes wild — keep tapping tickets to grow your park.
          </p>
        </Card>
      </div>
    </aside>
  );
};
