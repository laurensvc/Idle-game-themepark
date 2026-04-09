import { Card } from '@/components/ui/card';
import { useGameStore } from '@/store/gameStore';
import { BarChart2, Clock, Trophy, Wrench } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import CountUp from './CountUp';

const formatMoney = (amount: number): string => {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(1)}K`;
  return `$${Math.floor(amount)}`;
};

const formatMoneyCount = (n: number) => formatMoney(n);

const formatTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m ${s}s`;
};

const formatTimeCount = (n: number) => formatTime(Math.floor(n));

const PANEL_COUNT_DURATION = 0.85;

interface StatRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  countUp?: { to: number; formatDisplay?: (n: number) => string; separator?: string };
}

const StatRow = ({ icon, label, value, countUp }: StatRowProps) => (
  <div className="border-border/60 flex items-center justify-between border-b py-2 last:border-0">
    <div className="text-muted-foreground flex items-center gap-2 text-xs">
      {icon}
      <span className="tracking-wider uppercase">{label}</span>
    </div>
    {countUp ? (
      <CountUp
        to={countUp.to}
        formatDisplay={countUp.formatDisplay}
        separator={countUp.separator ?? ''}
        duration={PANEL_COUNT_DURATION}
        className="text-foreground text-sm font-bold tabular-nums"
        startWhen
      />
    ) : (
      <span className="text-foreground text-sm font-bold">{value}</span>
    )}
  </div>
);

export const StatsPanel = () => {
  const { stats, rides } = useGameStore(
    useShallow((s) => ({
      stats: s.stats,
      rides: s.rides,
    }))
  );

  const operatingRides = rides.filter((r) => r.status === 'operating').length;
  const brokenRides = rides.filter((r) => r.status === 'broken').length;
  const repairingRides = rides.filter((r) => r.status === 'repairing').length;

  return (
    <div className="flex flex-col gap-3">
      <div className="text-muted-foreground flex items-center gap-2">
        <BarChart2 size={14} className="text-neon-violet" />
        <span className="text-xs font-semibold tracking-widest uppercase">Park Stats</span>
      </div>

      <Card size="sm" className="gap-0 py-3 shadow-none">
        <div className="px-4">
          <StatRow
            icon={<span className="text-neon-orange text-sm">$</span>}
            label="Total Earned"
            value={formatMoney(stats.totalEarnings)}
            countUp={{ to: stats.totalEarnings, formatDisplay: formatMoneyCount }}
          />
          <StatRow
            icon={<Trophy size={12} className="text-yellow-400" />}
            label="Peak Guests"
            value={String(stats.peakVisitors)}
            countUp={{ to: stats.peakVisitors, separator: ',' }}
          />
          <StatRow
            icon={<Wrench size={12} className="text-muted-foreground" />}
            label="Rides Fixed"
            value={String(stats.ridesFixed)}
            countUp={{ to: stats.ridesFixed, separator: ',' }}
          />
          <StatRow
            icon={<Clock size={12} className="text-muted-foreground" />}
            label="Time Played"
            value={formatTime(stats.timePlayed)}
            countUp={{ to: stats.timePlayed, formatDisplay: formatTimeCount }}
          />
        </div>
      </Card>

      <div>
        <div className="text-muted-foreground mb-2 text-xs tracking-wider uppercase">Ride Status</div>
        <div className="grid grid-cols-3 gap-2">
          <Card size="sm" className="gap-1 border-green-500/20 bg-green-500/10 py-3 text-center shadow-none ring-0">
            <CountUp
              to={operatingRides}
              separator=","
              duration={PANEL_COUNT_DURATION}
              className="font-heading text-xl font-black text-green-400 tabular-nums"
              startWhen
            />
            <div className="text-xs tracking-wide text-green-400/80 uppercase">Open</div>
          </Card>
          <Card size="sm" className="gap-1 border-red-500/20 bg-red-500/10 py-3 text-center shadow-none ring-0">
            <CountUp
              to={brokenRides}
              separator=","
              duration={PANEL_COUNT_DURATION}
              className="font-heading text-xl font-black text-red-400 tabular-nums"
              startWhen
            />
            <div className="text-xs tracking-wide text-red-400/80 uppercase">Broken</div>
          </Card>
          <Card size="sm" className="gap-1 border-yellow-500/20 bg-yellow-500/10 py-3 text-center shadow-none ring-0">
            <CountUp
              to={repairingRides}
              separator=","
              duration={PANEL_COUNT_DURATION}
              className="font-heading text-xl font-black text-yellow-400 tabular-nums"
              startWhen
            />
            <div className="text-xs tracking-wide text-yellow-400/80 uppercase">Repair</div>
          </Card>
        </div>
      </div>
    </div>
  );
};
