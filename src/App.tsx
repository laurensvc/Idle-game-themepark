import { configureSoundSettings, playGameSfx } from '@/audio/soundManager';
import ActionArena from '@/components/ActionArena';
import CoinFlyLayer, { type CoinFlyItem } from '@/components/CoinFlyLayer';
import HUD from '@/components/HUD';
import NextGoalHint from '@/components/NextGoalHint';
import ParkView from '@/components/ParkView';
import RideInspector from '@/components/RideInspector';
import ShopPanel from '@/components/ShopPanel';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Toaster } from '@/components/ui/sonner';
import { saveGameToLocalStorage } from '@/lib/gameSave';
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
  const coinFlyTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const handleTicketCashFly = useCallback(
    (ticketButton: HTMLElement, opts: { isCrit: boolean; isCashIn: true; cashInAmount: number }) => {
      if (!opts.isCashIn) return;
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }
      const amt = opts.cashInAmount;
      const count = Math.max(2, Math.min(8, 2 + Math.floor(amt / 350)));
      for (let i = 0; i < count; i++) {
        const jitterX = (i - (count - 1) / 2) * 16;
        const jitterY = i * 5;
        const tid = window.setTimeout(() => {
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
        coinFlyTimeoutsRef.current.push(tid);
      }
    },
    []
  );

  const handleCoinFlyDone = useCallback((id: number) => {
    setCoinFlies((prev) => prev.filter((f) => f.id !== id));
  }, []);

  useEffect(() => {
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [tick]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      saveGameToLocalStorage(useGameStore.getState);
    }, 10_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    configureSoundSettings(audioSettings);
  }, [audioSettings]);

  useEffect(() => {
    const unsub = startNotificationSync();
    return unsub;
  }, []);

  useEffect(() => {
    return () => {
      for (const id of coinFlyTimeoutsRef.current) {
        window.clearTimeout(id);
      }
      coinFlyTimeoutsRef.current = [];
    };
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
    'border-border/60 bg-card flex min-h-0 min-w-0 flex-col overflow-hidden rounded-xl border shadow-sm';

  return (
    <div onClick={handleUserGesture}>
      <a href="#main-content" className="skip-link">
        Skip to park
      </a>
      <div className="bg-background text-foreground relative mx-auto flex h-dvh w-full max-w-[1600px] flex-col overflow-hidden">
        <h1 className="sr-only">Idle Theme Park</h1>
        <div className="relative flex shrink-0 flex-col gap-2 px-3 pt-3 sm:px-4">
          <HUD />
          <NextGoalHint />
        </div>
        <div className="relative shrink-0 px-3 sm:px-4">
          <ActionArena onTicketCashFly={handleTicketCashFly} />
        </div>
        <CoinFlyLayer items={coinFlies} onItemDone={handleCoinFlyDone} />

        <main
          id="main-content"
          tabIndex={-1}
          className="grid min-h-0 flex-1 scroll-mt-2 grid-cols-1 gap-3 px-3 pb-2 outline-none sm:px-4 lg:grid-cols-3 lg:gap-4"
        >
          <section className={columnChrome} aria-labelledby="section-rides-heading">
            <header className="border-border/60 shrink-0 border-b px-3 py-3">
              <h2 id="section-rides-heading" className="font-display text-base font-bold tracking-tight text-pretty">
                Your rides
              </h2>
              <p className="text-muted-foreground mt-1 text-xs leading-snug">
                Choose a ride to open path upgrades in the middle column.
              </p>
            </header>
            <div className="flex min-h-0 flex-1 flex-col">
              <ParkView />
            </div>
          </section>

          <section className={columnChrome} aria-labelledby="section-inspector-heading">
            <header className="border-border/60 shrink-0 border-b px-3 py-3">
              <h2
                id="section-inspector-heading"
                className="font-display text-base font-bold tracking-tight text-pretty"
              >
                Ride details
              </h2>
              <p className="text-muted-foreground mt-1 text-xs leading-snug">
                Stats and upgrade paths for the ride you selected.
              </p>
            </header>
            <div className="flex min-h-0 flex-1 flex-col">
              <RideInspector />
            </div>
          </section>

          <section className={columnChrome} aria-labelledby="section-shop-heading">
            <header className="border-border/60 shrink-0 border-b px-3 py-3">
              <h2 id="section-shop-heading" className="font-display text-base font-bold tracking-tight text-pretty">
                Shop
              </h2>
              <p className="text-muted-foreground mt-1 text-xs leading-snug">
                Unlock new attractions and park-wide perks with cash.
              </p>
            </header>
            <div className="flex min-h-0 flex-1 flex-col">
              <ShopPanel />
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-border/30 from-park-cream/40 to-park-cream/10 flex shrink-0 items-center justify-center gap-2 border-t-[3px] bg-linear-to-b px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={() => openAux('visitors')}
            className="text-muted-foreground hover:text-foreground hover:bg-muted/80 focus-visible:ring-ring flex min-h-11 min-w-11 items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-[color,background-color,box-shadow] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <Users className="h-4 w-4" />
            Visitors
          </button>
          <button
            type="button"
            onClick={() => openAux('stats')}
            className="text-muted-foreground hover:text-foreground hover:bg-muted/80 focus-visible:ring-ring flex min-h-11 min-w-11 items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-[color,background-color,box-shadow] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
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
