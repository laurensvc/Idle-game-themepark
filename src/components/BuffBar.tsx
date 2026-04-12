import { cn } from '@/lib/utils';
import { selectActiveBuffsSnapshot, useGameStore } from '@/store/gameStore';
import type { ActiveBuff } from '@/types/game';
import { Flame, Ticket, Users } from 'lucide-react';
import { memo, useMemo, type ReactNode } from 'react';

const buffMeta = (b: ActiveBuff): { label: string; icon: ReactNode } => {
  switch (b.kind) {
    case 'ride_income':
      return {
        label: `${b.magnitude}× rides`,
        icon: <Flame className="text-park-orange h-3.5 w-3.5 shrink-0" />,
      };
    case 'ticket_cash':
      return {
        label: `${b.magnitude}× tickets`,
        icon: <Ticket className="text-park-green h-3.5 w-3.5 shrink-0" />,
      };
    case 'visitor_spawn':
      return {
        label: `${b.magnitude}× crowds`,
        icon: <Users className="text-park-blue h-3.5 w-3.5 shrink-0" />,
      };
    default:
      return { label: '', icon: null };
  }
};

const BuffBar: React.FC = memo(() => {
  const snapshot = useGameStore(selectActiveBuffsSnapshot);
  const { tickCount, buffs } = useMemo(() => {
    const parsed = JSON.parse(snapshot) as { tick: number; buffs: ActiveBuff[] };
    return { tickCount: parsed.tick, buffs: parsed.buffs };
  }, [snapshot]);

  if (buffs.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center gap-1.5 px-1">
      {buffs.map((b) => {
        const ticksLeft = Math.max(0, b.expiresAtTick - tickCount);
        const { label, icon } = buffMeta(b);
        return (
          <div
            key={b.id}
            className={cn(
              'border-border/70 bg-card/95 text-foreground flex items-center gap-1 rounded-full border px-2 py-0.5',
              'text-[10px] font-semibold tabular-nums shadow-sm'
            )}
          >
            {icon}
            <span>{label}</span>
            <span className="text-muted-foreground">{ticksLeft}s</span>
          </div>
        );
      })}
    </div>
  );
});

BuffBar.displayName = 'BuffBar';

export default BuffBar;
