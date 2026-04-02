import { memo, useMemo } from 'react';
import { Pause, Play, DollarSign, Users, Heart, Clock, TrendingUp, Coins, Volume2, VolumeX } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
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
  animate?: boolean;
}

const StatPill = memo(({ icon, label, value, color, glowClass, animate = true }: StatPillProps) => (
  <div className={`pixel-panel flex items-center gap-2.5 px-3.5 py-2 ${color} ${glowClass} bg-[#1a1a35]`}>
    <span className="opacity-80">{icon}</span>
    <div className="flex flex-col leading-none">
      <span className="text-xs font-medium tracking-widest uppercase opacity-50">{label}</span>
      <span
        key={animate ? value : undefined}
        className={`font-display inline-block origin-left text-base font-bold ${animate ? 'animate-juicy-pop' : ''}`}
      >
        {value}
      </span>
    </div>
  </div>
));

StatPill.displayName = 'StatPill';

const statIcons = {
  cash: <DollarSign size={16} className="text-[#f97316]" />,
  guests: <Users size={16} className="text-[#06b6d4]" />,
  earned: <TrendingUp size={16} className="text-[#a78bfa]" />,
  time: <Clock size={16} className="text-slate-400" />,
} as const;

export const HUD = () => {
  const {
    money,
    visitors,
    parkHappiness,
    parkDirt,
    stats,
    isPaused,
    togglePause,
    gameTick,
    rides,
    collectAllCash,
    isAudioMuted,
    sfxVolume,
    toggleAudioMute,
    setSfxVolume,
  } = useGameStore(
    useShallow((s) => ({
      money: s.money,
      visitors: s.visitors,
      parkHappiness: s.parkHappiness,
      parkDirt: s.parkDirt,
      stats: s.stats,
      isPaused: s.isPaused,
      togglePause: s.togglePause,
      gameTick: s.gameTick,
      rides: s.rides,
      collectAllCash: s.collectAllCash,
      isAudioMuted: s.isAudioMuted,
      sfxVolume: s.sfxVolume,
      toggleAudioMute: s.toggleAudioMute,
      setSfxVolume: s.setSfxVolume,
    }))
  );

  const totalVisitors = visitors.reduce((sum, v) => sum + v.size, 0);
  const totalPendingCash = rides.reduce((sum, r) => sum + r.pendingCash, 0);
  const happinessColor =
    parkHappiness >= 70 ? 'text-green-400' : parkHappiness >= 40 ? 'text-yellow-400' : 'text-red-400';
  const dirtColor = parkDirt <= 30 ? 'text-green-400' : parkDirt <= 60 ? 'text-yellow-400' : 'text-red-400';
  const dirtLabel = parkDirt <= 20 ? 'Sparkling' : parkDirt <= 40 ? 'Clean' : parkDirt <= 70 ? 'Dirty' : 'Filthy';

  const happyIcon = useMemo(() => <Heart size={14} className={happinessColor} />, [happinessColor]);
  const dirtIcon = useMemo(() => <span className={`text-xs font-bold ${dirtColor}`}>🧹</span>, [dirtColor]);

  return (
    <header className="flex shrink-0 items-center justify-between border-b border-[#2a2a50] bg-[#0d0d24] px-4 py-2">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="font-display neon-text-purple text-2xl font-black tracking-tight text-[#a78bfa]">
          IDLE<span className="neon-text-orange text-[#f97316]">PARK</span>
        </div>
        <div className="hidden text-xs font-medium tracking-widest text-[#4a4a70] uppercase sm:block">
          Theme Park Tycoon
        </div>
      </div>

      {/* Stats row */}
      <div className="flex flex-wrap items-center gap-2">
        <StatPill
          icon={statIcons.cash}
          label="Cash"
          value={formatMoney(money)}
          color="border-[#f97316]/30"
          glowClass="neon-border-orange"
        />
        <StatPill
          icon={statIcons.guests}
          label="Guests"
          value={totalVisitors.toString()}
          color="border-[#06b6d4]/30"
          glowClass=""
        />
        <StatPill
          icon={happyIcon}
          label="Happy"
          value={`${Math.round(parkHappiness)}%`}
          color={parkHappiness >= 70 ? 'border-green-500/30' : 'border-yellow-500/30'}
          glowClass=""
        />
        <StatPill
          icon={dirtIcon}
          label="Park"
          value={dirtLabel}
          color={parkDirt <= 30 ? 'border-green-500/30' : parkDirt <= 60 ? 'border-yellow-500/30' : 'border-red-500/30'}
          glowClass=""
        />
        <StatPill
          icon={statIcons.earned}
          label="Earned"
          value={formatMoney(stats.totalEarnings)}
          color="border-[#7c3aed]/30"
          glowClass=""
        />
        <StatPill
          icon={statIcons.time}
          label="Time"
          value={formatTime(gameTick)}
          color="border-slate-600/30"
          glowClass=""
          animate={false}
        />
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        {/* Collect All button */}
        {totalPendingCash > 0 && (
          <button
            onClick={collectAllCash}
            className="pixel-button neon-border-orange flex cursor-pointer items-center gap-2 border-[#f97316] bg-[#f97316]/10 px-3 py-2 text-sm font-bold text-[#f97316] transition-all duration-200 hover:bg-[#f97316]/20"
            aria-label={`Collect all cash: ${formatMoney(totalPendingCash)}`}
          >
            <Coins size={14} />
            <span>{formatMoney(totalPendingCash)}</span>
          </button>
        )}

        {/* Pause button */}
        <button
          onClick={togglePause}
          className={`pixel-button flex cursor-pointer items-center gap-2 px-4 py-2 text-base font-bold transition-all duration-200 ${
            isPaused
              ? 'neon-border-orange border-[#f97316] bg-[#f97316]/10 text-[#f97316]'
              : 'border-[#7c3aed]/50 text-[#a78bfa] hover:border-[#7c3aed] hover:bg-[#7c3aed]/10'
          }`}
          aria-label={isPaused ? 'Resume game' : 'Pause game'}
        >
          {isPaused ? <Play size={14} /> : <Pause size={14} />}
          <span>{isPaused ? 'PAUSED' : 'PAUSE'}</span>
        </button>

        {/* Audio controls */}
        <div className="pixel-panel flex items-center gap-2 border-[#2a2a50] bg-[#151532] px-2 py-1.5">
          <button
            onClick={toggleAudioMute}
            className={`cursor-pointer transition-colors ${
              isAudioMuted ? 'text-slate-500 hover:text-slate-300' : 'text-[#06b6d4] hover:text-[#67e8f9]'
            }`}
            aria-label={isAudioMuted ? 'Unmute audio' : 'Mute audio'}
            title={isAudioMuted ? 'Audio muted' : 'Audio enabled'}
          >
            {isAudioMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={Math.round(sfxVolume * 100)}
            onChange={(event) => setSfxVolume(Number(event.target.value) / 100)}
            className="accent-[#06b6d4] h-1.5 w-20 cursor-pointer"
            aria-label="SFX volume"
          />
        </div>
      </div>
    </header>
  );
};
