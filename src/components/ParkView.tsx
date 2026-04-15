import { useGameStore } from '@/store/gameStore';
import { TreePine } from 'lucide-react';
import { memo } from 'react';
import RideCard from './RideCard';

const ParkView: React.FC = memo(() => {
  const rides = useGameStore((s) => s.rides);

  return (
    <div className="px-3 pb-2">
      {rides.length === 0 ? (
        <div className="text-muted-foreground/70 border-park-orange/25 flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-16">
          <TreePine className="text-park-green mb-3 h-12 w-12 opacity-40" aria-hidden />
          <p className="font-display text-foreground/90 text-sm font-semibold tracking-tight text-pretty">
            Your park is empty
          </p>
          <p className="text-muted-foreground/80 mt-2 max-w-[32ch] text-center text-xs leading-relaxed">
            Head to the Shop column and buy your first ride blueprint.
          </p>
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
