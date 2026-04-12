import { configureSoundSettings, playGameSfx } from '@/audio/soundManager';
import ActionArena from '@/components/ActionArena';
import CoinFlyLayer, { type CoinFlyItem } from '@/components/CoinFlyLayer';
import HUD from '@/components/HUD';
import ParkView from '@/components/ParkView';
import RideInspector from '@/components/RideInspector';
import ShopPanel from '@/components/ShopPanel';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Toaster } from '@/components/ui/sonner';
import { startNotificationSync } from '@/lib/syncNotificationsToSonner';
import { useGameStore } from '@/store/gameStore';
import { BarChart3, Users } from 'lucide-react';
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';

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
  const rides = useGameStore((s) => s.rides);
  const selectedRideId = useGameStore((s) => s.selectedRideId);
  const selectRide = useGameStore((s) => s.selectRide);
  const [coinFlies, setCoinFlies] = useState<CoinFlyItem[]>([]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetKind, setSheetKind] = useState<'visitors' | 'stats'>('visitors');
  const nextCoinFlyId = useRef(0);

  const handleTicketCashFly = useCallback((ticketButton: HTMLElement, opts: { isCrit: boolean }) => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const count = opts.isCrit ? 3 : 1;
    for (let i = 0; i < count; i++) {
      const jitterX = (i - (count - 1) / 2) * 16;
      const jitterY = i * 5;
      window.setTimeout(() => {
        const target = document.getElementById('money-fly-target');
        if (!target) return;
        const fr = ticketButton.getBoundingClientRect();
        const tr = target.getBoundingClientRect();
        const id = nextCoinFlyId.current++;
        setCoinFlies((prev) => [
          ...prev,
          {
            id,
            sx: fr.left + fr.width / 2 + jitterX,
            sy: fr.top + fr.height / 2 + jitterY,
            ex: tr.left + tr.width / 2,
            ey: tr.top + tr.height / 2,
          },
        ]);
      }, i * 55);
    }
  }, []);

  const handleCoinFlyDone = useCallback((id: number) => {
    setCoinFlies((prev) => prev.filter((f) => f.id !== id));
  }, []);

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

  useEffect(() => {
    if (rides.length === 0) {
      if (selectedRideId !== null) selectRide(null);
      return;
    }
    const valid = selectedRideId !== null && rides.some((r) => r.id === selectedRideId);
    if (!valid) selectRide(rides[0].id);
  }, [rides, selectedRideId, selectRide]);

  const handleUserGesture = useCallback(() => {
    import('@/audio/soundManager').then((m) => m.retryThemeMusicAfterUserGesture());
  }, []);

  const openAux = useCallback((kind: 'visitors' | 'stats') => {
    playGameSfx('ui_toggle');
    setSheetKind(kind);
    setSheetOpen(true);
  }, []);

const columnChrome =
  'border-border/20 bg-gradient-to-br from-white to-park-cream/20 flex min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl border-[3px] border-park-orange/15 shadow-[0_6px_0_rgb(255,255,255)/.8] hover:shadow-[0_8px_0_rgb(255,255,255)/.7] transition-all duration-150 cursor-pointer active:translate-y-[3px] active:shadow-[0_3px_0_rgb(255,255,255)]';

  return (
    <div onClick={handleUserGesture}>
      {/* Arcade-style animated background pattern */}
      <div 
        className="absolute inset-0 -z-10 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, oklch(0.78 0.17 68) 2px, transparent 3px),
            radial-gradient(circle at 75% 75%, oklch(0.55 0.22 150) 2px, transparent 3px),
            radial-gradient(circle at 40% 60%, oklch(0.68 0.16 235) 1px, transparent 2px),
            radial-gradient(circle at 80% 30%, oklch(0.72 0.20 55) 1px, transparent 2px)
          `,
          backgroundSize: '60px 60px',
          animation: 'bg-drift 20s linear infinite'
        }}
      />

      {/* Arcade-style decorative border glow */}
      <div className="absolute inset-0 -z-10 rounded-[3rem] p-[3px] bg-gradient-to-br from-park-green/20 via-transparent to-park-orange/10 pointer-events-none" />

      <div className="bg-background text-foreground mx-auto flex h-dvh w-full max-w-[1600px] flex-col overflow-hidden relative">
        
        {/* Keyframe definition for background drift */}
        <style>{`
          @keyframes bg-drift {
            from { background-position: 0 0; }
            to { background-position: 60px 60px; }
          }
        `}</style>
        {/* Decorative header arcade frame */}
        <div className="shrink-0 px-3 pt-3 sm:px-4 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-park-yellow to-transparent" />
          <HUD />
        </div>
        {/* Arcade-style decorative elements for Action Arena */}
        <div className="shrink-0 px-3 sm:px-4 relative group">
          <div className="absolute inset-x-2 top-0 h-[1px] bg-gradient-to-r from-transparent via-park-green/40 to-transparent opacity-50" />
          <div className="absolute inset-x-2 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-park-orange/40 to-transparent opacity-50" />
          <ActionArena onTicketCashFly={handleTicketCashFly} />
        </div>
        <CoinFlyLayer items={coinFlies} onItemDone={handleCoinFlyDone} />

        <main className="grid min-h-0 flex-1 grid-cols-1 gap-3 px-3 pb-2 sm:px-4 lg:grid-cols-3 lg:gap-4">
          <section className={columnChrome}>
            <header className="border-border/60 shrink-0 border-b px-3 py-2.5">
              <h2 className="text-sm font-bold tracking-tight">Your rides</h2>
              <p className="text-muted-foreground text-xs">Click a ride to see upgrades in the center column.</p>
            </header>
            <div className="flex min-h-0 flex-1 flex-col">
              <ParkView />
            </div>
          </section>

          <section className={columnChrome}>
            <header className="border-border/60 shrink-0 border-b px-3 py-2.5">
              <h2 className="text-sm font-bold tracking-tight">Current ride</h2>
              <p className="text-muted-foreground text-xs">Stats and path upgrades for the selected ride.</p>
            </header>
            <div className="flex min-h-0 flex-1 flex-col">
              <RideInspector />
            </div>
          </section>

          <section className={columnChrome}>
            <header className="border-border/60 shrink-0 border-b px-3 py-2.5">
              <h2 className="text-sm font-bold tracking-tight">Shop</h2>
              <p className="text-muted-foreground text-xs">New rides and park-wide upgrades.</p>
            </header>
            <div className="flex min-h-0 flex-1 flex-col">
              <ShopPanel />
            </div>
          </section>
        </main>

        {/* Arcade-style footer with decorative elements */}
        <footer className="border-border/30 bg-gradient-to-b from-park-cream/40 to-park-cream/10 flex shrink-0 items-center justify-center gap-2 border-t-[3px] border-park-orange/15 px-3 py-2 relative">
          {/* Decorative corner accents */}
          <div className="absolute left-0 top-1/2 -translate-x-full translate-y-[-50%] w-3 h-3 rounded-bl-lg bg-park-orange opacity-60" />
          <div className="absolute right-0 top-1/2 translate-x-full translate-y-[-50%] w-3 h-3 rounded-br-lg bg-park-orange opacity-60" />
          <div className="absolute left-0 bottom-1/2 -translate-x-full translate-y-[50%] w-3 h-3 rounded-bl-lg bg-park-green opacity-40" />
          <div className="absolute right-0 bottom-1/2 translate-x-full translate-y-[50%] w-3 h-3 rounded-br-lg bg-park-green opacity-40" />
          <button
            type="button"
            onClick={() => openAux('visitors')}
            className="text-muted-foreground hover:text-foreground hover:bg-muted/80 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors"
          >
            <Users className="h-4 w-4" />
            Visitors
          </button>
          <button
            type="button"
            onClick={() => openAux('stats')}
            className="text-muted-foreground hover:text-foreground hover:bg-muted/80 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors"
          >
            <BarChart3 className="h-4 w-4" />
            Stats
          </button>
        </footer>

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
            <SheetHeader className="border-border/60 shrink-0 border-b px-6 py-4 pr-12 text-left">
              <SheetTitle>{sheetKind === 'visitors' ? 'Visitors' : 'Stats'}</SheetTitle>
            </SheetHeader>
            <div className="flex min-h-0 flex-1 flex-col">
              <Suspense fallback={<TabFallback />}>
                {sheetKind === 'visitors' && <VisitorPanel />}
                {sheetKind === 'stats' && <StatsPanel />}
              </Suspense>
            </div>
          </SheetContent>
        </Sheet>

        <Toaster />
      </div>
    </div>
  );
};

export default App;
