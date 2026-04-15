import { Button } from '@/components/ui/button';
import { BALANCE } from '@/config/balanceConfig';
import { cn, formatMoney } from '@/lib/utils';
import { selectGoldenTicket, selectTickCount, useGameStore } from '@/store/gameStore';
import { DollarSign, Sparkles } from 'lucide-react';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

type FloatVariant = 'bank' | 'cashin' | 'crit' | 'combo';

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
  /** Fired when banked tickets are cashed in; use for wallet fly animations. */
  onTicketCashFly?: (
    ticketButton: HTMLElement,
    opts: { isCrit: boolean; isCashIn: true; cashInAmount: number }
  ) => void;
}

const applyCashInFeedback = (
  result: { amount: number; isCrit: boolean; comboLevel: number },
  boothEl: HTMLElement,
  opts: {
    spawnFloat: (text: string, el: HTMLElement, v: FloatVariant) => void;
    onTicketCashFly?: ActionArenaProps['onTicketCashFly'];
    setCashInFlash: (v: boolean) => void;
    onFirstCashIn?: () => void;
  }
): void => {
  if (result.amount <= 0) return;

  opts.onFirstCashIn?.();

  const label = `Cashed! ${formatMoney(result.amount)}`;
  opts.spawnFloat(label, boothEl, 'cashin');
  opts.onTicketCashFly?.(boothEl, {
    isCrit: result.isCrit,
    isCashIn: true,
    cashInAmount: result.amount,
  });

  if (BALANCE.cashInToastMinBanked > 0 && result.amount >= BALANCE.cashInToastMinBanked) {
    toast.success(`Big cash-in! ${formatMoney(result.amount)}`);
  }

  opts.setCashInFlash(true);
  window.setTimeout(() => opts.setCashInFlash(false), 380);
};

const ActionArena: React.FC<ActionArenaProps> = memo(({ onTicketCashFly }) => {
  const ticketBooth = useGameStore((s) => s.ticketBooth);
  const cashInTicketBooth = useGameStore((s) => s.cashInTicketBooth);
  const collectGoldenTicket = useGameStore((s) => s.collectGoldenTicket);
  const golden = useGameStore(selectGoldenTicket);
  const tickCount = useGameStore(selectTickCount);
  const ticketStock = useGameStore((s) => s.ticketStock);
  const bankedTicketCash = useGameStore((s) => s.bankedTicketCash);

  const [floats, setFloats] = useState<FloatingText[]>([]);
  const [critPulse, setCritPulse] = useState(false);
  const [cashInFlash, setCashInFlash] = useState(false);
  const arenaRef = useRef<HTMLDivElement>(null);
  const boothBtnRef = useRef<HTMLButtonElement>(null);
  const mountedRef = useRef(true);
  const hasCashedInRef = useRef(false);

  const nudgeFirstCashIn = useCallback(() => {
    if (hasCashedInRef.current) return;
    hasCashedInRef.current = true;
    toast.info('Cash-ins fuel the park — check the Shop for rides and upgrades.', { duration: 3200 });
  }, []);

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
      const boothEl = e.currentTarget;
      const result = ticketBooth(performance.now());

      if (result.mode === 'cash_in') {
        applyCashInFeedback(result, boothEl, {
          spawnFloat,
          onTicketCashFly,
          setCashInFlash,
          onFirstCashIn: nudgeFirstCashIn,
        });
        return;
      }

      let label = `+${formatMoney(result.amount)} bank`;
      if (result.isCrit) label = `CRIT! +${formatMoney(result.amount)} bank`;
      else if (result.comboLevel >= 3) label = `+${formatMoney(result.amount)} · ×${result.comboLevel}`;

      const variant: FloatVariant = result.isCrit ? 'crit' : result.comboLevel >= 3 ? 'combo' : 'bank';
      spawnFloat(label, boothEl, variant);

      if (result.isCrit) {
        setCritPulse(true);
        window.setTimeout(() => {
          if (!mountedRef.current) return;
          setCritPulse(false);
        }, 420);
      }
    },
    [ticketBooth, spawnFloat, onTicketCashFly, nudgeFirstCashIn]
  );

  const handleCashIn = useCallback(() => {
    const boothEl = boothBtnRef.current;
    if (!boothEl) return;
    const result = cashInTicketBooth();
    if (!result) return;
    applyCashInFeedback(result, boothEl, {
      spawnFloat,
      onTicketCashFly,
      setCashInFlash,
      onFirstCashIn: nudgeFirstCashIn,
    });
  }, [cashInTicketBooth, spawnFloat, onTicketCashFly, nudgeFirstCashIn]);

  const goldenTicksLeft = golden.visible ? Math.max(0, golden.expiresAtTick - tickCount) : 0;
  const goldenProgress =
    golden.visible && BALANCE.goldenLifetimeTicks > 0 ? goldenTicksLeft / BALANCE.goldenLifetimeTicks : 0;

  const maxStock = BALANCE.ticketStockMax;
  const stockPct = maxStock > 0 ? Math.min(100, (ticketStock / maxStock) * 100) : 0;
  const barFull = ticketStock >= maxStock && maxStock > 0;
  const canCashIn = bankedTicketCash > 0;

  return (
    <div ref={arenaRef} className={cn('border-border/60 bg-muted/20 relative border-b px-3 pt-2 pb-3')}>
      <div className="flex flex-col gap-2">
        <button
          ref={boothBtnRef}
          type="button"
          onClick={handleTicket}
          className={cn(
            'ticket-booth-btn group relative flex min-h-17 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl px-3 py-3',
            'from-park-orange to-park-orange/90 bg-linear-to-b text-white shadow-md select-none',
            'ring-park-orange/25 cursor-pointer transition-[transform,box-shadow] duration-150',
            'hover:shadow-lg hover:ring-2 active:scale-[0.97]',
            critPulse && 'arena-crit-pulse',
            cashInFlash && 'arena-cash-in-flash',
            barFull && 'ticket-booth-ready-pulse'
          )}
        >
          <div
            className="bg-park-cream/35 absolute inset-x-0 bottom-0 h-2 origin-left transition-[width] duration-200 ease-out"
            style={{ width: `${stockPct}%` }}
            aria-hidden
          />
          <div className="relative z-10 flex flex-col items-center justify-center gap-1">
            <div className="flex items-center gap-2 drop-shadow-sm">
              <DollarSign className="h-6 w-6 transition-transform duration-200 group-active:scale-110" />
              <span className="text-sm font-bold tracking-tight">Tickets</span>
              <Sparkles className="h-5 w-5 opacity-90 transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <span className="text-park-cream text-[10px] font-medium opacity-90">
              Fill the bar · bank $ each tap · cash in anytime or tap again when full
            </span>
            {(ticketStock > 0 || bankedTicketCash > 0) && (
              <span className="text-park-cream/95 font-display text-[11px] font-semibold tabular-nums">
                {ticketStock}/{maxStock} · {formatMoney(bankedTicketCash)} banked
              </span>
            )}
          </div>
        </button>

        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={!canCashIn}
          onClick={handleCashIn}
          className="w-full shrink-0 font-semibold"
        >
          Cash in {canCashIn ? `(${formatMoney(bankedTicketCash)})` : ''}
        </Button>
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
            'arena-feedback pointer-events-none absolute font-bold',
            f.variant === 'crit' && 'text-park-yellow text-sm drop-shadow-sm',
            f.variant === 'combo' && 'text-park-orange text-sm',
            f.variant === 'bank' && 'text-park-green text-sm',
            f.variant === 'cashin' && 'text-park-yellow text-base drop-shadow-md'
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
