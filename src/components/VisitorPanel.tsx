import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/store/gameStore';
import type { VisitorType } from '@/types/game';
import { Heart, Users } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

const VISITOR_CONFIG: Record<VisitorType, { label: string; icon: string; color: string }> = {
  family: { label: 'Family', icon: '👨‍👩‍👧‍👦', color: '#06b6d4' },
  thrill_seeker: { label: 'Thrill Seeker', icon: '🤘', color: '#f97316' },
  child: { label: 'Child', icon: '🧒', color: '#ec4899' },
  elderly: { label: 'Elderly', icon: '👴', color: '#a78bfa' },
  teen: { label: 'Teen', icon: '🧑', color: '#22c55e' },
};

export const VisitorPanel = () => {
  const { visitors, parkHappiness, parkDirt, cleanPark, isAutoCleanEnabled } = useGameStore(
    useShallow((s) => ({
      visitors: s.visitors,
      parkHappiness: s.parkHappiness,
      parkDirt: s.parkDirt,
      cleanPark: s.cleanPark,
      isAutoCleanEnabled: s.isAutoCleanEnabled,
    }))
  );

  const totalVisitors = visitors.reduce((sum, v) => sum + v.size, 0);
  const typeCounts = visitors.reduce<Record<VisitorType, number>>(
    (acc, v) => ({ ...acc, [v.type]: (acc[v.type] ?? 0) + v.size }),
    {} as Record<VisitorType, number>
  );

  const avgHappiness =
    visitors.length > 0
      ? Math.round(visitors.reduce((sum, v) => sum + v.happiness, 0) / visitors.length)
      : Math.round(parkHappiness);

  const happinessColor = avgHappiness >= 70 ? '#22c55e' : avgHappiness >= 40 ? '#eab308' : '#ef4444';

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users size={16} className="text-neon-cyan" />
          <span className="text-muted-foreground text-sm font-bold tracking-wider uppercase">Guests</span>
        </div>
        <span className="font-heading text-neon-cyan text-xl font-black">{totalVisitors}</span>
      </div>

      <div className="flex flex-col gap-2">
        {(Object.keys(VISITOR_CONFIG) as VisitorType[]).map((type) => {
          const cfg = VISITOR_CONFIG[type];
          const count = typeCounts[type] ?? 0;
          const pct = totalVisitors > 0 ? (count / totalVisitors) * 100 : 0;
          return (
            <div key={type} className="flex items-center gap-2">
              <span className="w-6 text-base">{cfg.icon}</span>
              <div className="flex-1">
                <div className="text-muted-foreground mb-0.5 flex justify-between text-xs">
                  <span>{cfg.label}</span>
                  <span className="font-bold" style={{ color: cfg.color }}>
                    {count}
                  </span>
                </div>
                <div className="pixel-bar bg-muted h-2 overflow-hidden rounded-sm">
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      background: cfg.color,
                      boxShadow: `0 0 4px ${cfg.color}`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Separator />

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Heart size={14} style={{ color: happinessColor }} />
            <span className="text-muted-foreground text-xs tracking-wider uppercase">Happiness</span>
          </div>
          <span className="text-base font-bold" style={{ color: happinessColor }}>
            {avgHappiness}%
          </span>
        </div>
        <div className="pixel-bar bg-muted h-3 overflow-hidden rounded-sm">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${avgHappiness}%`,
              background: happinessColor,
              boxShadow: `0 0 8px ${happinessColor}`,
            }}
          />
        </div>
        <p className="text-muted-foreground mt-1 text-xs">
          {avgHappiness >= 80
            ? 'Guests are ecstatic!'
            : avgHappiness >= 60
              ? 'Guests are enjoying their visit'
              : avgHappiness >= 40
                ? 'Some guests are unhappy'
                : 'Guests are leaving! Fix this!'}
        </p>
      </div>

      <Card size="sm" className="gap-2 py-3 shadow-none">
        <div className="mb-1.5 flex items-center justify-between px-1">
          <span className="text-muted-foreground text-xs tracking-wider uppercase">Park Cleanliness</span>
          <span
            className={cn(
              'text-base font-bold',
              parkDirt <= 30 ? 'text-green-400' : parkDirt <= 60 ? 'text-yellow-400' : 'text-red-400'
            )}
          >
            {Math.round(100 - parkDirt)}%
          </span>
        </div>
        <div className="pixel-bar bg-muted h-3 overflow-hidden rounded-sm">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${100 - parkDirt}%`,
              background: parkDirt <= 30 ? '#22c55e' : parkDirt <= 60 ? '#eab308' : '#ef4444',
            }}
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          disabled={isAutoCleanEnabled || parkDirt <= 0}
          onClick={cleanPark}
          className="mt-2 w-full border-green-500/40 text-green-400 hover:bg-green-500/10 disabled:opacity-40"
          aria-label={
            isAutoCleanEnabled
              ? 'Clean the park (auto-clean enabled)'
              : parkDirt <= 0
                ? 'Clean the park (park is already clean)'
                : 'Clean the park'
          }
        >
          🧹 Clean Park
        </Button>
        {isAutoCleanEnabled && (
          <div className="text-muted-foreground mt-1 flex items-center gap-1 text-xs text-green-400/90">
            <span>✓</span>
            <span>Janitor on duty — auto-cleaning</span>
          </div>
        )}
      </Card>
    </div>
  );
};
