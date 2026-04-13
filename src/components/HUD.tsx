import { formatMoney } from '@/lib/utils';
import { selectEstimatedAvgTicketCash, selectTotalVisitors, useGameStore } from '@/store/gameStore';
import { Heart, Settings, Sparkles, Users } from 'lucide-react';
import { memo, useState } from 'react';
import AudioSettingsSheet from './AudioSettingsSheet';
import BuffBar from './BuffBar';
import CountUp from './CountUp';

const HUD: React.FC = memo(() => {
  const [audioOpen, setAudioOpen] = useState(false);
  const money = useGameStore((s) => s.money);
  const happiness = useGameStore((s) => s.happiness);
  const totalVisitors = useGameStore(selectTotalVisitors);
  const avgTicketCash = useGameStore(selectEstimatedAvgTicketCash);

  return (
    <header className="flex flex-col gap-2 px-3 pt-3 pb-2">
      {/* Arcade-style money display with neon glow effect */}
      <div className="relative flex items-center justify-between">
        <div
          id="money-fly-target"
          className="from-park-orange/15 to-park-orange/15 ring-park-orange/20 relative flex items-center gap-2 rounded-[1rem] bg-gradient-to-r via-white px-3 py-1.5 ring-2"
        >
          <span
            className="relative z-10 text-2xl leading-none"
            role="img"
            aria-label="money"
          >
            💰
          </span>
          <CountUp
            value={money}
            format={formatMoney}
            className="text-park-orange font-display relative z-10 text-xl font-bold tabular-nums"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Arcade-style stats container with decorative elements */}
          <div className="to-park-cream/30 border-park-orange/10 flex items-center gap-4 rounded-xl border-2 bg-gradient-to-r from-white/80 p-1.5">
            <div className="flex items-center gap-2 px-2 py-1">
              <div
                className={`relative h-5 w-5 rounded-full transition-all duration-300 ${happiness > 60 ? 'text-park-red scale-100' : 'text-muted-foreground scale-90'}`}
                style={{
                  background:
                    happiness > 60
                      ? 'conic-gradient(from 270deg, oklch(0.6 0.15 28) 0deg 150deg, oklch(0.9 0.01 135) 150deg 360deg)'
                      : 'oklch(0.7 0.05 140)',
                  boxShadow: happiness > 60 ? '0 0 8px rgba(220,38,38,0.4)' : 'none',
                }}
              >
                <Heart
                  className={`h-4 w-4 ${happiness > 60 ? 'text-park-red scale-110' : 'text-muted-foreground scale-90'}`}
                  fill={happiness > 60 ? 'currentColor' : 'none'}
                />
              </div>
              <span className="font-display font-semibold tabular-nums">{Math.round(happiness)}%</span>
            </div>

            <div className="group relative flex items-center gap-2 px-2 py-1">
              <div className="via-park-blue absolute inset-x-1/2 h-[3px] w-full -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-60" />
              <Users className="text-park-blue relative z-10 h-4 w-5 scale-110 transition-transform group-hover:scale-100" />
              <span className="font-display font-semibold tabular-nums">{totalVisitors}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setAudioOpen(true)}
            className="text-muted-foreground/80 hover:text-foreground border-border/25 flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border-[2px] bg-white/60 transition-all duration-150 active:translate-y-[2px] active:border-transparent"
            aria-label="Open sound settings"
            style={{
              boxShadow: '0 2px 0 rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)',
            }}
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      <AudioSettingsSheet open={audioOpen} onOpenChange={setAudioOpen} />

      <BuffBar />

      {/* Typical ticket payout from park + upgrades (avg roll, no combo/crit). */}
      {avgTicketCash > 0 && (
        <div className="text-park-green flex items-center justify-center gap-1.5 text-xs">
          <Sparkles className="h-3 w-3" />
          <span className="font-display font-medium tabular-nums">
            ~{formatMoney(avgTicketCash)} / tap
          </span>
        </div>
      )}
    </header>
  );
});

HUD.displayName = 'HUD';
export default HUD;
