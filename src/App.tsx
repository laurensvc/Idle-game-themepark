import { configureSoundSettings, playGameSfx } from '@/audio/soundManager';
import ActionArena from '@/components/ActionArena';
import HUD from '@/components/HUD';
import ParkView from '@/components/ParkView';
import RideInspector from '@/components/RideInspector';
import { Toaster } from '@/components/ui/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { startNotificationSync } from '@/lib/syncNotificationsToSonner';
import { useGameStore } from '@/store/gameStore';
import { BarChart3, Landmark, ShoppingCart, Users } from 'lucide-react';
import { lazy, Suspense, useCallback, useEffect } from 'react';

const ShopPanel = lazy(() => import('@/components/ShopPanel'));
const VisitorPanel = lazy(() => import('@/components/VisitorPanel'));
const StatsPanel = lazy(() => import('@/components/StatsPanel'));

const TabFallback: React.FC = () => (
  <div className="flex items-center justify-center py-16">
    <div className="border-primary h-6 w-6 animate-spin rounded-full border-2 border-t-transparent" />
  </div>
);

const App: React.FC = () => {
  const tick = useGameStore((s) => s.tick);
  const audioSettings = useGameStore((s) => s.audioSettings);

  useEffect(() => {
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [tick]);

  useEffect(() => {
    configureSoundSettings(audioSettings);
  }, [audioSettings]);

  useEffect(() => {
    const unsub = startNotificationSync();
    return unsub;
  }, []);

  const handleUserGesture = useCallback(() => {
    import('@/audio/soundManager').then((m) => m.retryThemeMusicAfterUserGesture());
  }, []);

  return (
    <div onClick={handleUserGesture}>
      <div className="bg-background text-foreground mx-auto flex h-dvh max-w-md flex-col overflow-hidden">
        <HUD />

        <Tabs
          defaultValue="park"
          className="flex min-h-0 flex-1 flex-col"
          onValueChange={() => {
            playGameSfx('ui_toggle');
          }}
        >
          <TabsContent value="park" className="mt-0 flex min-h-0 flex-1 flex-col">
            <ParkView />
          </TabsContent>
          <TabsContent value="shop" className="mt-0 flex min-h-0 flex-1 flex-col">
            <Suspense fallback={<TabFallback />}>
              <ShopPanel />
            </Suspense>
          </TabsContent>
          <TabsContent value="visitors" className="mt-0 flex min-h-0 flex-1 flex-col">
            <Suspense fallback={<TabFallback />}>
              <VisitorPanel />
            </Suspense>
          </TabsContent>
          <TabsContent value="stats" className="mt-0 flex min-h-0 flex-1 flex-col">
            <Suspense fallback={<TabFallback />}>
              <StatsPanel />
            </Suspense>
          </TabsContent>

          <ActionArena />

          <TabsList className="bg-card h-14 w-full gap-0 rounded-none border-t px-0">
            <TabsTrigger
              value="park"
              className="h-full flex-1 flex-col gap-0.5 rounded-none data-[state=active]:shadow-none"
            >
              <Landmark className="h-5 w-5" />
              <span className="text-[10px]">Park</span>
            </TabsTrigger>
            <TabsTrigger
              value="shop"
              className="h-full flex-1 flex-col gap-0.5 rounded-none data-[state=active]:shadow-none"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="text-[10px]">Shop</span>
            </TabsTrigger>
            <TabsTrigger
              value="visitors"
              className="h-full flex-1 flex-col gap-0.5 rounded-none data-[state=active]:shadow-none"
            >
              <Users className="h-5 w-5" />
              <span className="text-[10px]">Visitors</span>
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="h-full flex-1 flex-col gap-0.5 rounded-none data-[state=active]:shadow-none"
            >
              <BarChart3 className="h-5 w-5" />
              <span className="text-[10px]">Stats</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <RideInspector />
        <Toaster />
      </div>
    </div>
  );
};

export default App;
