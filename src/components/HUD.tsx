import { Pause, Play, DollarSign, Users, Heart, Clock, TrendingUp } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const formatMoney = (amount: number): string => {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(1)}K`;
  return `$${Math.floor(amount)}`;
};

const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

interface StatPillProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  glowClass: string;
}

const StatPill = ({ icon, label, value, color, glowClass }: StatPillProps) => (
  <div className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${color} ${glowClass} bg-[#1a1a35]`}>
    <span className="opacity-80">{icon}</span>
    <div className="flex flex-col leading-none">
      <span className="text-[10px] font-medium tracking-widest uppercase opacity-50">{label}</span>
      <span className="font-display text-sm font-bold">{value}</span>
    </div>
  </div>
);

export const HUD = () => {
  const { money, visitors, parkHappiness, parkDirt, stats, isPaused, togglePause, gameTick } = useGameStore();

  const totalVisitors = visitors.reduce((sum, v) => sum + v.size, 0);
  const happinessColor =
    parkHappiness >= 70 ? 'text-green-400' : parkHappiness >= 40 ? 'text-yellow-400' : 'text-red-400';
  const dirtColor = parkDirt <= 30 ? 'text-green-400' : parkDirt <= 60 ? 'text-yellow-400' : 'text-red-400';
  const dirtLabel = parkDirt <= 20 ? 'Sparkling' : parkDirt <= 40 ? 'Clean' : parkDirt <= 70 ? 'Dirty' : 'Filthy';

  return (
    <header className="flex shrink-0 items-center justify-between border-b border-[#2a2a50] bg-[#0d0d24] px-4 py-2">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="font-display neon-text-purple text-xl font-black tracking-tight text-[#a78bfa]">
          IDLE<span className="neon-text-orange text-[#f97316]">PARK</span>
        </div>
        <div className="hidden text-[10px] font-medium tracking-widest text-[#4a4a70] uppercase sm:block">
          Theme Park Tycoon
        </div>
      </div>

      {/* Stats row */}
      <div className="flex flex-wrap items-center gap-2">
        <StatPill
          icon={<DollarSign size={14} className="text-[#f97316]" />}
          label="Cash"
          value={formatMoney(money)}
          color="border-[#f97316]/30"
          glowClass="neon-border-orange"
        />
        <StatPill
          icon={<Users size={14} className="text-[#06b6d4]" />}
          label="Guests"
          value={totalVisitors.toString()}
          color="border-[#06b6d4]/30"
          glowClass=""
        />
        <StatPill
          icon={<Heart size={14} className={happinessColor} />}
          label="Happy"
          value={`${Math.round(parkHappiness)}%`}
          color={parkHappiness >= 70 ? 'border-green-500/30' : 'border-yellow-500/30'}
          glowClass=""
        />
        <StatPill
          icon={<span className={`text-xs font-bold ${dirtColor}`}>🧹</span>}
          label="Park"
          value={dirtLabel}
          color={parkDirt <= 30 ? 'border-green-500/30' : parkDirt <= 60 ? 'border-yellow-500/30' : 'border-red-500/30'}
          glowClass=""
        />
        <StatPill
          icon={<TrendingUp size={14} className="text-[#a78bfa]" />}
          label="Earned"
          value={formatMoney(stats.totalEarnings)}
          color="border-[#7c3aed]/30"
          glowClass=""
        />
        <StatPill
          icon={<Clock size={14} className="text-slate-400" />}
          label="Time"
          value={formatTime(gameTick)}
          color="border-slate-600/30"
          glowClass=""
        />
      </div>

      {/* Pause button */}
      <button
        onClick={togglePause}
        className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm font-bold transition-all duration-200 ${
          isPaused
            ? 'neon-border-orange border-[#f97316] bg-[#f97316]/10 text-[#f97316]'
            : 'border-[#7c3aed]/50 text-[#a78bfa] hover:border-[#7c3aed] hover:bg-[#7c3aed]/10'
        } `}
        aria-label={isPaused ? 'Resume game' : 'Pause game'}
      >
        {isPaused ? <Play size={14} /> : <Pause size={14} />}
        <span>{isPaused ? 'PAUSED' : 'PAUSE'}</span>
      </button>
    </header>
  );
};
