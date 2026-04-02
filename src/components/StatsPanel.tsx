import { BarChart2, Trophy, Wrench, Clock } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { useGameStore } from '../store/gameStore';
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
  <div className="flex items-center justify-between border-b border-[#2a2a50]/50 py-2 last:border-0">
    <div className="flex items-center gap-2 text-xs text-slate-400">
      {icon}
      <span className="tracking-wider uppercase">{label}</span>
    </div>
    {countUp ? (
      <CountUp
        to={countUp.to}
        formatDisplay={countUp.formatDisplay}
        separator={countUp.separator ?? ''}
        duration={PANEL_COUNT_DURATION}
        className="text-sm font-bold text-white tabular-nums"
        startWhen
      />
    ) : (
      <span className="text-sm font-bold text-white">{value}</span>
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
    <div className="space-y-3">
      <div className="mb-1 flex items-center gap-2">
        <BarChart2 size={14} className="text-[#a78bfa]" />
        <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Park Stats</span>
      </div>

      <div>
        <StatRow
          icon={<span className="text-sm text-[#f97316]">$</span>}
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
          icon={<Wrench size={12} className="text-slate-400" />}
          label="Rides Fixed"
          value={String(stats.ridesFixed)}
          countUp={{ to: stats.ridesFixed, separator: ',' }}
        />
        <StatRow
          icon={<Clock size={12} className="text-slate-400" />}
          label="Time Played"
          value={formatTime(stats.timePlayed)}
          countUp={{ to: stats.timePlayed, formatDisplay: formatTimeCount }}
        />
      </div>

      {/* Ride status summary */}
      <div className="border-t border-[#2a2a50] pt-3">
        <div className="mb-2 text-xs tracking-wider text-slate-500 uppercase">Ride Status</div>
        <div className="grid grid-cols-3 gap-2">
          <div className="pixel-panel bg-green-500/10 p-2 text-center">
            <CountUp
              to={operatingRides}
              separator=","
              duration={PANEL_COUNT_DURATION}
              className="font-display text-xl font-black text-green-400 tabular-nums"
              startWhen
            />
            <div className="text-xs tracking-wide text-green-400/70 uppercase">Open</div>
          </div>
          <div className="pixel-panel bg-red-500/10 p-2 text-center">
            <CountUp
              to={brokenRides}
              separator=","
              duration={PANEL_COUNT_DURATION}
              className="font-display text-xl font-black text-red-400 tabular-nums"
              startWhen
            />
            <div className="text-xs tracking-wide text-red-400/70 uppercase">Broken</div>
          </div>
          <div className="pixel-panel bg-yellow-500/10 p-2 text-center">
            <CountUp
              to={repairingRides}
              separator=","
              duration={PANEL_COUNT_DURATION}
              className="font-display text-xl font-black text-yellow-400 tabular-nums"
              startWhen
            />
            <div className="text-xs tracking-wide text-yellow-400/70 uppercase">Repair</div>
          </div>
        </div>
      </div>
    </div>
  );
};
