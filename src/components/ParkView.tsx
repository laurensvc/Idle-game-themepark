import { useGameStore } from '@/store/gameStore';
import { TreePine } from 'lucide-react';
import { memo } from 'react';
import RideCard from './RideCard';

const ParkView: React.FC = memo(() => {
  const rides = useGameStore((s) => s.rides);

  return (
    <div className="px-3 pb-2">
      {/* Arcade-style decorative divider */}
      <div className="via-park-yellow/60 mb-3 h-1 rounded-lg bg-linear-to-r from-transparent to-transparent shadow-inner" />

      {rides.length === 0 ? (
        <div className="text-muted-foreground/70 border-park-orange/25 flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-16">
          <TreePine className="text-park-green mb-3 h-12 w-12 opacity-40" />
          <p className="font-display text-sm tracking-wide">Your park is empty</p>
          <p className="text-muted-foreground/60 mt-1 text-xs">Buy a ride in the shop column.</p>
        </div>
      ) : (
        <div className="grid gap-2">
          {rides.map((ride) => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </div>
      )}
    </div>
  );
});

ParkView.displayName = 'ParkView';
export default ParkView;
