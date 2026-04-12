import { ScrollArea } from '@/components/ui/scroll-area';
import { formatMoney, formatNumber } from '@/lib/utils';
import { selectIncomePerTick, selectOperatingCount, selectTotalVisitors, useGameStore } from '@/store/gameStore';
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
  const incomePerTick = useGameStore(selectIncomePerTick);
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
      label: 'Income / second',
      value: `${formatMoney(incomePerTick)}/s`,
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
    <ScrollArea className="flex-1">
      <div className="space-y-2 px-3 pb-3">
        {stats.map((stat) => (
          <div key={stat.label} className="park-card flex items-center gap-3 p-3">
            {stat.icon}
            <div className="flex-1">
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
