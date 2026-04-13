import { ScrollArea } from '@/components/ui/scroll-area';
import { formatMoney, formatNumber } from '@/lib/utils';
import { selectEstimatedAvgTicketCash, selectOperatingCount, selectTotalVisitors, useGameStore } from '@/store/gameStore';
import { Clock, DollarSign, ShoppingBag, Star, Ticket, TrendingUp, Users } from 'lucide-react';
import { memo } from 'react';

const StatsPanel: React.FC = memo(() => {
  const money = useGameStore((s) => s.money);
  const totalMoneyEarned = useGameStore((s) => s.totalMoneyEarned);
  const totalVisitorsServed = useGameStore((s) => s.totalVisitorsServed);
  const rides = useGameStore((s) => s.rides);
  const upgrades = useGameStore((s) => s.upgrades);
  const tickCount = useGameStore((s) => s.tickCount);
  const happiness = useGameStore((s) => s.happiness);
  const avgTicketCash = useGameStore(selectEstimatedAvgTicketCash);
  const currentVisitors = useGameStore(selectTotalVisitors);
  const operatingCount = useGameStore(selectOperatingCount);

  const stats = [
    {
      icon: <DollarSign className="text-park-orange h-5 w-5" />,
      label: 'Current Balance',
      value: formatMoney(money),
    },
    {
      icon: <TrendingUp className="text-park-green h-5 w-5" />,
      label: 'Est. ticket tap',
      value: `~${formatMoney(avgTicketCash)} (avg roll)`,
    },
    {
      icon: <DollarSign className="text-park-coin h-5 w-5" />,
      label: 'Total Earned',
      value: formatMoney(totalMoneyEarned),
    },
    {
      icon: <Users className="text-park-blue h-5 w-5" />,
      label: 'Current Visitors',
      value: formatNumber(currentVisitors),
    },
    {
      icon: <Users className="text-park-purple h-5 w-5" />,
      label: 'Total Visitors Served',
      value: formatNumber(totalVisitorsServed),
    },
    {
      icon: <Ticket className="text-park-red h-5 w-5" />,
      label: 'Rides Owned',
      value: `${rides.length} (${operatingCount} running)`,
    },
    {
      icon: <ShoppingBag className="text-park-green h-5 w-5" />,
      label: 'Upgrades Purchased',
      value: String(upgrades.length),
    },
    {
      icon: <Star className="text-park-yellow h-5 w-5" />,
      label: 'Happiness',
      value: `${Math.round(happiness)}%`,
    },
    {
      icon: <Clock className="text-muted-foreground h-5 w-5" />,
      label: 'Time Played',
      value: formatTime(tickCount),
    },
  ];

  return (
    <ScrollArea className="min-h-0 flex-1">
      <div className="border-border/60 bg-card divide-border/60 mx-3 mb-3 divide-y rounded-xl border">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-3 px-3 py-2.5">
            {stat.icon}
            <div className="min-w-0 flex-1">
              <div className="text-muted-foreground text-xs">{stat.label}</div>
              <div className="text-sm font-bold tabular-nums">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
});

const formatTime = (ticks: number): string => {
  const hours = Math.floor(ticks / 3600);
  const minutes = Math.floor((ticks % 3600) / 60);
  const seconds = ticks % 60;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
};

StatsPanel.displayName = 'StatsPanel';
export default StatsPanel;
