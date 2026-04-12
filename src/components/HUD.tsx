import { formatMoney } from '@/lib/utils';
import { selectIncomePerTick, selectTotalVisitors, useGameStore } from '@/store/gameStore';
import { Heart, Settings, Sparkles, Users } from 'lucide-react';
import { memo, useState } from 'react';
import AudioSettingsSheet from './AudioSettingsSheet';
import CountUp from './CountUp';
import ParkBatteryBar from './ParkBatteryBar';

const HUD: React.FC = memo(() => {
  const [audioOpen, setAudioOpen] = useState(false);
  const money = useGameStore((s) => s.money);
  const happiness = useGameStore((s) => s.happiness);
  const totalVisitors = useGameStore(selectTotalVisitors);
  const incomePerTick = useGameStore(selectIncomePerTick);

  return (
    <header className="flex flex-col gap-2 px-3 pt-3 pb-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-lg" role="img" aria-label="money">
            💰
          </span>
          <CountUp value={money} format={formatMoney} className="text-park-orange text-xl font-bold tabular-nums" />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm">
              <Heart
                className={`h-4 w-4 ${happiness > 60 ? 'text-park-red' : 'text-muted-foreground'}`}
                fill={happiness > 60 ? 'currentColor' : 'none'}
              />
              <span className="font-semibold tabular-nums">{Math.round(happiness)}%</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Users className="text-park-blue h-4 w-4" />
              <span className="font-semibold tabular-nums">{totalVisitors}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setAudioOpen(true)}
            className="text-muted-foreground hover:text-foreground border-border/60 bg-card flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border transition-colors"
            aria-label="Open sound settings"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AudioSettingsSheet open={audioOpen} onOpenChange={setAudioOpen} />

      <ParkBatteryBar />

      {incomePerTick > 0 && (
        <div className="text-park-green flex items-center justify-center gap-1 text-xs">
          <Sparkles className="h-3 w-3" />
          <span className="font-medium">+{formatMoney(incomePerTick)}/s</span>
        </div>
      )}
    </header>
  );
});

HUD.displayName = 'HUD';
export default HUD;
