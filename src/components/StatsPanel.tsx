import { BarChart2, Trophy, Wrench, Clock } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { useGameStore } from '../store/gameStore';

const formatMoney = (amount: number): string => {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(1)}K`;
  return `$${Math.floor(amount)}`;
};

const formatTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m ${s}s`;
};

interface StatRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const StatRow = ({ icon, label, value }: StatRowProps) => (
  <div className="flex items-center justify-between border-b border-[#2a2a50]/50 py-1.5 last:border-0">
    <div className="flex items-center gap-2 text-[10px] text-slate-400">
      {icon}
      <span className="tracking-wider uppercase">{label}</span>
    </div>
    <span className="text-xs font-bold text-white">{value}</span>
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
        <BarChart2 size={13} className="text-[#a78bfa]" />
        <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">Park Stats</span>
      </div>

      <div>
        <StatRow
          icon={<span className="text-[#f97316]">$</span>}
          label="Total Earned"
          value={formatMoney(stats.totalEarnings)}
        />
        <StatRow
          icon={<Trophy size={10} className="text-yellow-400" />}
          label="Peak Guests"
          value={String(stats.peakVisitors)}
        />
        <StatRow
          icon={<Wrench size={10} className="text-slate-400" />}
          label="Rides Fixed"
          value={String(stats.ridesFixed)}
        />
        <StatRow
          icon={<Clock size={10} className="text-slate-400" />}
          label="Time Played"
          value={formatTime(stats.timePlayed)}
        />
      </div>

      {/* Ride status summary */}
      <div className="border-t border-[#2a2a50] pt-3">
        <div className="mb-2 text-[10px] tracking-wider text-slate-500 uppercase">Ride Status</div>
        <div className="grid grid-cols-3 gap-1.5">
          <div className="pixel-panel bg-green-500/10 p-1.5 text-center">
            <div className="text-lg font-black text-green-400">{operatingRides}</div>
            <div className="text-[9px] tracking-wide text-green-400/70 uppercase">Open</div>
          </div>
          <div className="pixel-panel bg-red-500/10 p-1.5 text-center">
            <div className="text-lg font-black text-red-400">{brokenRides}</div>
            <div className="text-[9px] tracking-wide text-red-400/70 uppercase">Broken</div>
          </div>
          <div className="pixel-panel bg-yellow-500/10 p-1.5 text-center">
            <div className="text-lg font-black text-yellow-400">{repairingRides}</div>
            <div className="text-[9px] tracking-wide text-yellow-400/70 uppercase">Repair</div>
          </div>
        </div>
      </div>
    </div>
  );
};
