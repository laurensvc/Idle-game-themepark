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
      <div className="relative flex items-center justify-between">
        <div
          id="money-fly-target"
          className="border-border/60 bg-card text-card-foreground relative flex items-center gap-2 rounded-lg border px-3 py-1.5"
        >
          <span className="text-2xl leading-none" role="img" aria-label="money">
            💰
          </span>
          <CountUp
            value={money}
            format={formatMoney}
            className="text-park-orange font-display text-xl font-bold tabular-nums"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="border-border/60 bg-card flex items-center gap-4 rounded-lg border px-2 py-1.5">
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

            <div className="flex items-center gap-2 px-2 py-1">
              <Users className="text-park-blue h-4 w-5" />
              <span className="font-display font-semibold tabular-nums">{totalVisitors}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setAudioOpen(true)}
            className="text-muted-foreground hover:text-foreground border-border/60 bg-card flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg border transition-colors"
            aria-label="Open sound settings"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      <AudioSettingsSheet open={audioOpen} onOpenChange={setAudioOpen} />

      <BuffBar />

      {/* Average $ banked per fill tap (avg dice × park; combo/crit vary). */}
      {avgTicketCash > 0 && (
        <div className="text-park-green flex items-center justify-center gap-1.5 text-xs">
          <Sparkles className="h-3 w-3" />
          <span className="font-display font-medium tabular-nums">~{formatMoney(avgTicketCash)} banked / fill tap</span>
        </div>
      )}
    </header>
  );
});

HUD.displayName = 'HUD';
export default HUD;
