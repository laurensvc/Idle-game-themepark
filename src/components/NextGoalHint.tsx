import { pickNextParkGoal } from '@/lib/nextParkGoal';
import { formatMoney } from '@/lib/utils';
import { useGameStore } from '@/store/gameStore';
import { Flag, Sparkles } from 'lucide-react';
import { memo, useMemo } from 'react';

const NextGoalHint: React.FC = memo(() => {
  const money = useGameStore((s) => s.money);
  const rides = useGameStore((s) => s.rides);
  const upgrades = useGameStore((s) => s.upgrades);

  const snapshot = useMemo(() => {
    const purchasedUpgradeIds = new Set(upgrades.map((u) => u.upgradeId));
    return pickNextParkGoal(money, rides, purchasedUpgradeIds);
  }, [money, rides, upgrades]);

  if (!snapshot) {
    return (
      <div
        role="status"
        className="border-border/50 bg-park-green/8 text-park-green flex items-center gap-2 rounded-lg border px-3 py-2 text-xs"
      >
        <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden />
        <span className="leading-snug font-medium">
          You have bought everything in this build. Keep tapping for fun or wait for new content.
        </span>
      </div>
    );
  }

  const { goal, canAfford } = snapshot;
  const progressPct = goal.cost > 0 ? Math.min(100, Math.round((money / goal.cost) * 100)) : 100;
  const remaining = Math.max(0, goal.cost - money);

  const title =
    goal.kind === 'ride'
      ? `${goal.emoji} ${goal.label}`
      : goal.kind === 'upgrade'
        ? `${goal.icon} ${goal.label}`
        : `${goal.rideEmoji} ${goal.trackName} · ${goal.rideName}`;

  const where =
    goal.kind === 'path'
      ? 'Select the ride on the left, then use Path upgrades in the middle column.'
      : 'Open the Shop column on the right.';

  return (
    <section
      className="border-border/60 bg-card/80 text-foreground flex flex-col gap-1.5 rounded-lg border px-3 py-2 shadow-sm"
      aria-label="Next savings goal"
    >
      <div className="flex items-center gap-2">
        <Flag className="text-park-orange h-3.5 w-3.5 shrink-0" aria-hidden />
        <span className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">Next milestone</span>
      </div>
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <span className="font-display text-sm font-semibold tracking-tight text-pretty">{title}</span>
        <span className="text-muted-foreground font-display text-xs tabular-nums">{formatMoney(goal.cost)}</span>
      </div>
      {canAfford ? (
        <p className="text-park-green text-xs leading-snug font-medium">{where}</p>
      ) : (
        <>
          <div
            className="bg-muted h-1.5 overflow-hidden rounded-full"
            role="progressbar"
            aria-valuenow={progressPct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progress toward next purchase"
          >
            <div
              className="from-park-orange to-park-orange/85 h-full rounded-full bg-linear-to-r transition-[width] duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-muted-foreground text-xs leading-snug tabular-nums">
            {formatMoney(remaining)} left to save ({progressPct}%)
          </p>
        </>
      )}
    </section>
  );
});

NextGoalHint.displayName = 'NextGoalHint';
export default NextGoalHint;
