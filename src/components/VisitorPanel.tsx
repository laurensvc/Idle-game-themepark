import { ScrollArea } from '@/components/ui/scroll-area';
import { selectTotalVisitors, useGameStore } from '@/store/gameStore';
import type { VisitorType } from '@/types/game';
import { Baby, PersonStanding, Sparkles, UserRound, Users } from 'lucide-react';
import { memo } from 'react';

const visitorTypeConfig: Record<VisitorType, { label: string; emoji: string; icon: typeof Users }> = {
  family: { label: 'Families', emoji: '👨‍👩‍👧‍👦', icon: Users },
  thrill_seeker: { label: 'Thrill Seekers', emoji: '🤩', icon: Sparkles },
  child: { label: 'Children', emoji: '👧', icon: Baby },
  elderly: { label: 'Elderly', emoji: '🧓', icon: PersonStanding },
  teen: { label: 'Teenagers', emoji: '🧑', icon: UserRound },
};

const VisitorPanel: React.FC = memo(() => {
  const visitors = useGameStore((s) => s.visitors);
  const totalVisitors = useGameStore(selectTotalVisitors);
  const happiness = useGameStore((s) => s.happiness);

  const countByType: Record<VisitorType, number> = {
    family: 0,
    thrill_seeker: 0,
    child: 0,
    elderly: 0,
    teen: 0,
  };
  for (let i = 0; i < visitors.length; i++) {
    countByType[visitors[i].type] += visitors[i].groupSize;
  }

  return (
    <ScrollArea className="min-h-0 flex-1">
      <div className="space-y-4 px-3 pb-3">
        <div className="border-border/60 bg-card divide-border/60 divide-y rounded-xl border">
          <div className="flex items-center justify-between px-4 py-3">
            <div>
              <div className="text-muted-foreground text-xs">Current Visitors</div>
              <div className="text-2xl font-bold tabular-nums">{totalVisitors}</div>
            </div>
            <div className="text-right">
              <div className="text-muted-foreground text-xs">Groups</div>
              <div className="text-2xl font-bold tabular-nums">{visitors.length}</div>
            </div>
          </div>
          <div className="px-4 py-3">
            <div className="text-muted-foreground mb-1 text-xs">Happiness influence</div>
            <div className="park-bar h-3">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${happiness}%`,
                  background:
                    happiness > 60
                      ? 'var(--color-park-green)'
                      : happiness > 30
                        ? 'var(--color-park-yellow)'
                        : 'var(--color-park-red)',
                }}
              />
            </div>
            <div className="text-muted-foreground mt-1 text-xs">
              {happiness < 20
                ? 'Visitors are leaving! Fix problems ASAP.'
                : happiness < 50
                  ? 'Visitors are unhappy. Start rides and keep them running!'
                  : 'Visitors are enjoying your park!'}
            </div>
          </div>
          {(Object.keys(visitorTypeConfig) as VisitorType[]).map((type) => {
            const { label, emoji } = visitorTypeConfig[type];
            const count = countByType[type];
            return (
              <div key={type} className="flex items-center gap-3 px-4 py-2.5">
                <span className="text-xl">{emoji}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold">{label}</div>
                </div>
                <span className="text-sm font-bold tabular-nums">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </ScrollArea>
  );
});

VisitorPanel.displayName = 'VisitorPanel';
export default VisitorPanel;
