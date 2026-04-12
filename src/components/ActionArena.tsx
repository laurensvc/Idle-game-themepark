import { cn } from '@/lib/utils';
import { useGameStore } from '@/store/gameStore';
import { DollarSign, Paintbrush, Wrench, Zap } from 'lucide-react';
import { memo, useCallback, useRef, useState } from 'react';

interface FloatingText {
  id: number;
  text: string;
  x: number;
  y: number;
}

let feedbackId = 0;

const ActionArena: React.FC = memo(() => {
  const ticketBooth = useGameStore((s) => s.ticketBooth);
  const rechargeBattery = useGameStore((s) => s.rechargeBattery);
  const cleanPark = useGameStore((s) => s.cleanPark);
  const tuneUp = useGameStore((s) => s.tuneUp);

  const [floats, setFloats] = useState<FloatingText[]>([]);
  const arenaRef = useRef<HTMLDivElement>(null);

  const spawnFloat = useCallback((text: string, buttonEl: HTMLElement) => {
    if (!arenaRef.current) return;
    const arenaRect = arenaRef.current.getBoundingClientRect();
    const btnRect = buttonEl.getBoundingClientRect();
    const x = btnRect.left - arenaRect.left + btnRect.width / 2;
    const y = btnRect.top - arenaRect.top;
    const id = feedbackId++;
    setFloats((prev) => [...prev, { id, text, x, y }]);
    setTimeout(() => {
      setFloats((prev) => {
        const idx = prev.findIndex((f) => f.id === id);
        if (idx === -1) return prev;
        const next = [...prev];
        next.splice(idx, 1);
        return next;
      });
    }, 700);
  }, []);

  const handleTicket = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const amount = ticketBooth();
      spawnFloat(`+$${amount}`, e.currentTarget);
    },
    [ticketBooth, spawnFloat]
  );

  const handleBattery = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      rechargeBattery();
      spawnFloat('+14%', e.currentTarget);
    },
    [rechargeBattery, spawnFloat]
  );

  const handleClean = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      cleanPark();
      spawnFloat('Cleaned!', e.currentTarget);
    },
    [cleanPark, spawnFloat]
  );

  const handleTuneUp = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      tuneUp();
      spawnFloat('+$1', e.currentTarget);
    },
    [tuneUp, spawnFloat]
  );

  return (
    <div ref={arenaRef} className="relative px-3 py-2">
      <div className="grid grid-cols-4 gap-2">
        <ArenaButton
          icon={<DollarSign className="h-5 w-5" />}
          label="Tickets"
          color="bg-park-orange text-white"
          onClick={handleTicket}
        />
        <ArenaButton
          icon={<Zap className="h-5 w-5" />}
          label="Charge"
          color="bg-park-yellow text-foreground"
          onClick={handleBattery}
        />
        <ArenaButton
          icon={<Paintbrush className="h-5 w-5" />}
          label="Sweep"
          color="bg-park-blue text-white"
          onClick={handleClean}
        />
        <ArenaButton
          icon={<Wrench className="h-5 w-5" />}
          label="Tune-Up"
          color="bg-park-purple text-white"
          onClick={handleTuneUp}
        />
      </div>

      {floats.map((f) => (
        <span
          key={f.id}
          className="arena-feedback text-park-green"
          style={{ left: f.x, top: f.y, transform: 'translateX(-50%)' }}
        >
          {f.text}
        </span>
      ))}
    </div>
  );
});

ActionArena.displayName = 'ActionArena';

interface ArenaButtonProps {
  icon: React.ReactNode;
  label: string;
  color: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ArenaButton: React.FC<ArenaButtonProps> = memo(({ icon, label, color, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      'flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-2.5',
      'cursor-pointer transition-all duration-150 select-none',
      'shadow-sm hover:shadow-md active:scale-90',
      color
    )}
  >
    {icon}
    <span className="text-[10px] font-semibold">{label}</span>
  </button>
));

ArenaButton.displayName = 'ArenaButton';

export default ActionArena;
