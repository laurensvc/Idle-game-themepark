import { ScrollArea } from '@/components/ui/scroll-area';
import { useGameStore } from '@/store/gameStore';
import { Droplets, TreePine } from 'lucide-react';
import { memo } from 'react';
import RideCard from './RideCard';

const ParkView: React.FC = memo(() => {
  const rides = useGameStore((s) => s.rides);
  const parkDirt = useGameStore((s) => s.parkDirt);

  return (
    <ScrollArea className="flex-1">
      <div className="space-y-3 px-3 pb-3">
        {parkDirt > 10 && (
          <div className="bg-park-orange/10 text-park-orange flex items-center gap-2 rounded-xl px-3 py-2 text-xs">
            <Droplets className="h-4 w-4 shrink-0" />
            <span>
              Park dirt: <strong>{Math.round(parkDirt)}%</strong> — Tap sweep to clean!
            </span>
          </div>
        )}

        {rides.length === 0 ? (
          <div className="text-muted-foreground flex flex-col items-center justify-center py-16">
            <TreePine className="mb-3 h-12 w-12 opacity-40" />
            <p className="text-sm font-medium">Your park is empty</p>
            <p className="mt-1 text-xs">Buy a ride from the Shop tab!</p>
          </div>
        ) : (
          <div className="grid gap-2">
            {rides.map((ride) => (
              <RideCard key={ride.id} ride={ride} />
            ))}
          </div>
        )}
      </div>
    </ScrollArea>
  );
});

ParkView.displayName = 'ParkView';
export default ParkView;
