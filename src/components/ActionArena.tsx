import { BALANCE } from '@/data/balance';
import { cn } from '@/lib/utils';
import { selectGoldenTicket, selectTickCount, useGameStore } from '@/store/gameStore';
import { DollarSign, Sparkles } from 'lucide-react';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

type FloatVariant = 'cash' | 'crit' | 'combo';

interface FloatingText {
  id: number;
  text: string;
  x: number;
  y: number;
  variant: FloatVariant;
}

let feedbackId = 0;

const GOLDEN_EMOJI = ['🎫', '🌟', '✨'] as const;

export interface ActionArenaProps {
  /** Fired after a successful ticket tap; use for wallet fly animations. */
  onTicketCashFly?: (ticketButton: HTMLElement, opts: { isCrit: boolean }) => void;
}

const ActionArena: React.FC<ActionArenaProps> = memo(({ onTicketCashFly }) => {
  const ticketBooth = useGameStore((s) => s.ticketBooth);
  const collectGoldenTicket = useGameStore((s) => s.collectGoldenTicket);
  const golden = useGameStore(selectGoldenTicket);
  const tickCount = useGameStore(selectTickCount);

  const [floats, setFloats] = useState<FloatingText[]>([]);
  const [critPulse, setCritPulse] = useState(false);
  const arenaRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const spawnFloat = useCallback((text: string, buttonEl: HTMLElement, variant: FloatVariant) => {
    if (!arenaRef.current) return;
    const arenaRect = arenaRef.current.getBoundingClientRect();
    const btnRect = buttonEl.getBoundingClientRect();
    const x = btnRect.left - arenaRect.left + btnRect.width / 2;
    const y = btnRect.top - arenaRect.top;
    const id = feedbackId++;
    setFloats((prev) => [...prev, { id, text, x, y, variant }]);
    window.setTimeout(() => {
      if (!mountedRef.current) return;
      setFloats((prev) => {
        const idx = prev.findIndex((f) => f.id === id);
        if (idx === -1) return prev;
        const next = [...prev];
        next.splice(idx, 1);
        return next;
      });
    }, 700);
  }, []);

  const handleTicket = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const result = ticketBooth(performance.now());
      let label = `+$${result.amount}`;
      if (result.isCrit) label = `CRIT! +$${result.amount}`;
      else if (result.comboLevel >= 3) label = `+$${result.amount} · ×${result.comboLevel}`;

      const variant: FloatVariant = result.isCrit ? 'crit' : result.comboLevel >= 3 ? 'combo' : 'cash';
      spawnFloat(label, e.currentTarget, variant);
      onTicketCashFly?.(e.currentTarget, { isCrit: result.isCrit });

      if (result.isCrit) {
        setCritPulse(true);
        window.setTimeout(() => {
          if (!mountedRef.current) return;
          setCritPulse(false);
        }, 420);
      }
    },
    [ticketBooth, spawnFloat, onTicketCashFly]
  );

  const goldenTicksLeft = golden.visible ? Math.max(0, golden.expiresAtTick - tickCount) : 0;
  const goldenProgress =
    golden.visible && BALANCE.goldenLifetimeTicks > 0 ? goldenTicksLeft / BALANCE.goldenLifetimeTicks : 0;

  return (
    <div
      ref={arenaRef}
      className={cn('border-border/60 relative border-b bg-muted/20 px-3 pt-2 pb-3')}
    >
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={handleTicket}
          className={cn(
            'ticket-booth-btn group flex min-h-17 flex-col items-center justify-center gap-1 rounded-2xl px-3 py-3',
            'from-park-orange to-park-orange/90 bg-linear-to-b text-white shadow-md select-none',
            'ring-park-orange/25 cursor-pointer transition-[transform,box-shadow] duration-150',
            'hover:shadow-lg hover:ring-2 active:scale-[0.97]',
            critPulse && 'arena-crit-pulse'
          )}
        >
          <div className="flex items-center gap-2 drop-shadow-sm">
            <DollarSign className="h-6 w-6 transition-transform duration-200 group-active:scale-110" />
            <span className="text-sm font-bold tracking-tight">Tickets</span>
            <Sparkles className="h-5 w-5 opacity-90 transition-transform duration-300 group-hover:rotate-12" />
          </div>
          <span className="text-park-cream text-[10px] font-medium opacity-90">
            Rides boost each tap · combo · crits · golden tickets grant buffs
          </span>
        </button>
      </div>

      {golden.visible && (
        <button
          type="button"
          onClick={() => collectGoldenTicket()}
          className="golden-ticket-btn border-park-yellow bg-card absolute top-2 right-4 z-10 flex h-16 w-16 flex-col items-center justify-center rounded-full border-2 shadow-lg select-none"
          aria-label="Collect golden ticket"
        >
          <span className="text-2xl leading-none" role="img" aria-hidden>
            {GOLDEN_EMOJI[golden.variant % GOLDEN_EMOJI.length]}
          </span>
          <div className="bg-muted mt-1 h-1 w-10 overflow-hidden rounded-full">
            <div
              className="bg-park-yellow h-full rounded-full transition-[width] duration-1000 ease-linear"
              style={{ width: `${Math.min(100, goldenProgress * 100)}%` }}
            />
          </div>
        </button>
      )}

      {floats.map((f) => (
        <span
          key={f.id}
          className={cn(
            'arena-feedback pointer-events-none absolute text-sm font-bold',
            f.variant === 'crit' && 'text-park-yellow drop-shadow-sm',
            f.variant === 'combo' && 'text-park-orange',
            f.variant === 'cash' && 'text-park-green'
          )}
          style={{ left: f.x, top: f.y, transform: 'translateX(-50%)' }}
        >
          {f.text}
        </span>
      ))}
    </div>
  );
});

ActionArena.displayName = 'ActionArena';

export default ActionArena;
