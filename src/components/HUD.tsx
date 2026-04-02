import { memo, useMemo } from 'react';
import { Pause, Play, DollarSign, Users, Heart, Clock, TrendingUp, Coins, Volume2, VolumeX, Music } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { useGameStore } from '@/store/gameStore';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import CountUp from './CountUp';

const formatMoney = (amount: number): string => {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(1)}K`;
  return `$${Math.floor(amount)}`;
};

const formatMoneyCount = (n: number) => formatMoney(n);

const formatHappinessCount = (n: number) => `${Math.round(n)}%`;

const HUD_COUNT_DURATION = 0.85;

const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

interface StatPillCountUp {
  to: number;
  formatDisplay?: (n: number) => string;
  separator?: string;
  duration?: number;
}

interface StatPillProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  borderAccent?: string;
  animate?: boolean;
  countUp?: StatPillCountUp;
}

const StatPill = memo(({ icon, label, value, borderAccent, animate = true, countUp }: StatPillProps) => (
  <Card
    size="sm"
    className={cn(
      'ring-foreground/10 flex flex-row items-center gap-2.5 py-2 pr-3 pl-3 shadow-xs ring-1',
      borderAccent
    )}
  >
    <span className="text-muted-foreground">{icon}</span>
    <div className="flex min-w-0 flex-col leading-none">
      <span className="text-muted-foreground text-[10px] font-medium tracking-widest uppercase">{label}</span>
      {countUp ? (
        <CountUp
          to={countUp.to}
          formatDisplay={countUp.formatDisplay}
          separator={countUp.separator ?? ''}
          duration={countUp.duration ?? HUD_COUNT_DURATION}
          className="font-heading text-foreground inline-block text-sm font-bold tabular-nums"
          startWhen
        />
      ) : (
        <span
          key={animate ? value : undefined}
          className={cn('font-heading text-foreground inline-block text-sm font-bold', animate && 'animate-juicy-pop')}
        >
          {value}
        </span>
      )}
    </div>
  </Card>
));

StatPill.displayName = 'StatPill';

const statIcons = {
  cash: <DollarSign size={16} className="text-neon-orange" />,
  guests: <Users size={16} className="text-neon-cyan" />,
  earned: <TrendingUp size={16} className="text-neon-violet" />,
  time: <Clock size={16} className="text-muted-foreground" />,
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
    musicVolume,
    toggleAudioMute,
    setSfxVolume,
    setMusicVolume,
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
      musicVolume: s.musicVolume,
      toggleAudioMute: s.toggleAudioMute,
      setSfxVolume: s.setSfxVolume,
      setMusicVolume: s.setMusicVolume,
    }))
  );

  const totalVisitors = visitors.reduce((sum, v) => sum + v.size, 0);
  const totalPendingCash = rides.reduce((sum, r) => sum + r.pendingCash, 0);
  const happinessColor =
    parkHappiness >= 70 ? 'text-green-400' : parkHappiness >= 40 ? 'text-yellow-400' : 'text-red-400';
  const dirtColor = parkDirt <= 30 ? 'text-green-400' : parkDirt <= 60 ? 'text-yellow-400' : 'text-red-400';
  const dirtLabel = parkDirt <= 20 ? 'Sparkling' : parkDirt <= 40 ? 'Clean' : parkDirt <= 70 ? 'Dirty' : 'Filthy';

  const happyIcon = useMemo(() => <Heart size={14} className={happinessColor} />, [happinessColor]);
  const dirtIcon = useMemo(() => <span className={cn('text-xs font-bold', dirtColor)}>🧹</span>, [dirtColor]);

  return (
    <header className="bg-card/80 flex shrink-0 items-center justify-between gap-3 border-b px-4 py-2 backdrop-blur-md">
      <div className="flex min-w-0 items-center gap-3">
        <div className="font-heading neon-text-purple text-neon-violet text-lg font-black tracking-tight sm:text-xl">
          IDLE<span className="neon-text-orange text-neon-orange">PARK</span>
        </div>
        <Separator orientation="vertical" className="hidden h-8 sm:block" />
        <div className="text-muted-foreground hidden text-xs font-medium tracking-widest uppercase sm:block">
          Theme Park Tycoon
        </div>
      </div>

      <div className="flex min-w-0 flex-wrap items-center justify-center gap-2">
        <StatPill
          icon={statIcons.cash}
          label="Cash"
          value={formatMoney(money)}
          borderAccent="border-neon-orange/25"
          countUp={{ to: money, formatDisplay: formatMoneyCount }}
        />
        <StatPill
          icon={statIcons.guests}
          label="Guests"
          value={totalVisitors.toString()}
          borderAccent="border-neon-cyan/25"
          countUp={{ to: totalVisitors, separator: ',' }}
        />
        <StatPill
          icon={happyIcon}
          label="Happy"
          value={`${Math.round(parkHappiness)}%`}
          borderAccent={
            parkHappiness >= 70
              ? 'border-green-500/25'
              : parkHappiness >= 40
                ? 'border-yellow-500/25'
                : 'border-red-500/25'
          }
          countUp={{ to: parkHappiness, formatDisplay: formatHappinessCount }}
        />
        <StatPill
          icon={dirtIcon}
          label="Park"
          value={dirtLabel}
          borderAccent={
            parkDirt <= 30 ? 'border-green-500/25' : parkDirt <= 60 ? 'border-yellow-500/25' : 'border-red-500/25'
          }
        />
        <StatPill
          icon={statIcons.earned}
          label="Earned"
          value={formatMoney(stats.totalEarnings)}
          borderAccent="border-neon-purple/25"
          countUp={{ to: stats.totalEarnings, formatDisplay: formatMoneyCount }}
        />
        <StatPill
          icon={statIcons.time}
          label="Time"
          value={formatTime(gameTick)}
          borderAccent="border-muted"
          animate={false}
        />
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={totalPendingCash <= 0}
          onClick={collectAllCash}
          className="border-neon-orange/50 text-neon-orange hover:bg-neon-orange/10 gap-1.5 font-bold disabled:opacity-40"
          aria-label={
            totalPendingCash > 0
              ? `Collect all cash: ${formatMoney(totalPendingCash)}`
              : 'Collect all cash (nothing to collect)'
          }
        >
          <Coins size={14} />
          <CountUp
            to={totalPendingCash}
            formatDisplay={formatMoneyCount}
            duration={0.65}
            className="font-bold tabular-nums"
            startWhen
          />
        </Button>

        <Button
          variant={isPaused ? 'default' : 'secondary'}
          size="sm"
          onClick={togglePause}
          className={cn(
            'font-heading gap-1.5 text-xs',
            isPaused && 'bg-neon-orange text-primary-foreground hover:bg-neon-orange/90'
          )}
          aria-label={isPaused ? 'Resume game' : 'Pause game'}
        >
          {isPaused ? <Play size={14} /> : <Pause size={14} />}
          {isPaused ? 'PAUSED' : 'PAUSE'}
        </Button>

        <Card size="sm" className="flex flex-row items-center gap-2 py-2 pr-2 pl-2 shadow-xs">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggleAudioMute}
            className="text-muted-foreground shrink-0"
            aria-label={isAudioMuted ? 'Unmute audio' : 'Mute audio'}
            title={isAudioMuted ? 'Audio muted' : 'Audio enabled'}
          >
            {isAudioMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </Button>
          <Separator orientation="vertical" className="h-8" />
          <div className="flex min-w-[7rem] flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground w-6 text-[9px] tracking-wide uppercase">SFX</span>
              <Slider
                value={[Math.round(sfxVolume * 100)]}
                max={100}
                step={1}
                onValueChange={(v) => setSfxVolume(v[0]! / 100)}
                className="flex-1"
                aria-label="SFX volume"
              />
            </div>
            <div className="flex items-center gap-2">
              <Music size={12} className="text-muted-foreground shrink-0" aria-hidden />
              <Slider
                value={[Math.round(musicVolume * 100)]}
                max={100}
                step={1}
                onValueChange={(v) => setMusicVolume(v[0]! / 100)}
                className="flex-1"
                aria-label="Theme music volume"
              />
            </div>
          </div>
        </Card>
      </div>
    </header>
  );
};
