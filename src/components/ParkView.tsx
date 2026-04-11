import { playGameSfx } from '@/audio/soundManager';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/store/gameStore';
import { BarChart2, Layers, ShoppingBag, Users } from 'lucide-react';
import { lazy, Suspense, useState } from 'react';
import { ActionArena } from './ActionArena';
import { RideCard } from './RideCard';
import { RideInspector } from './RideInspector';

const ShopPanel = lazy(() => import('./ShopPanel').then((m) => ({ default: m.ShopPanel })));
const VisitorPanel = lazy(() => import('./VisitorPanel').then((m) => ({ default: m.VisitorPanel })));
const StatsPanel = lazy(() => import('./StatsPanel').then((m) => ({ default: m.StatsPanel })));

const panelFallback = (
  <div className="text-muted-foreground text-sm" role="status">
    Loading…
  </div>
);

type SideTab = 'rides' | 'shop' | 'visitors' | 'stats';

const TABS: { id: SideTab; label: string; icon: React.ReactNode }[] = [
  { id: 'rides', label: 'Rides', icon: <Layers size={16} /> },
  { id: 'shop', label: 'Shop', icon: <ShoppingBag size={16} /> },
  { id: 'visitors', label: 'Guests', icon: <Users size={16} /> },
  { id: 'stats', label: 'Stats', icon: <BarChart2 size={16} /> },
];

export const ParkView = () => {
  const rides = useGameStore((s) => s.rides);
  const selectedRideId = useGameStore((s) => s.selectedRideId);
  const selectRide = useGameStore((s) => s.selectRide);
  const [activeTab, setActiveTab] = useState<SideTab>('rides');

  const brokenCount = rides.filter((r) => r.status === 'broken').length;
  const operatingCount = rides.filter((r) => r.status === 'operating').length;
  const repairingCount = rides.filter((r) => r.status === 'repairing').length;
  const hasSelection = selectedRideId !== null;

  const handleTabChange = (value: string) => {
    playGameSfx('ui_click');
    if (hasSelection) selectRide(null);
    setActiveTab(value as SideTab);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
      <ActionArena />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden md:flex-row">
      <main className="relative flex min-h-0 flex-1 flex-col overflow-hidden p-4">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(124,58,237,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(124,58,237,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="font-heading text-foreground text-lg leading-none font-black sm:text-xl">
              Your <span className="neon-text-purple text-neon-violet">Theme Park</span>
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              {rides.length} ride{rides.length !== 1 ? 's' : ''} installed
              {brokenCount > 0 && (
                <span className="animate-pulse-neon ml-2 font-semibold text-red-400">⚠ {brokenCount} broken</span>
              )}
            </p>
          </div>
          <p className="text-muted-foreground max-w-md text-xs leading-snug sm:text-right">
            Tap rides to inspect · use <span className="text-foreground font-semibold">Shop</span> on the right for
            upgrades · power bar on top feeds every ride
          </p>
        </div>

        <ScrollArea className="relative min-h-0 flex-1 pr-3">
          <div className="grid grid-cols-2 gap-3 pb-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {rides.map((ride) => (
              <RideCard key={ride.instanceId} ride={ride} />
            ))}

            {rides.length === 0 && (
              <div className="text-muted-foreground col-span-full flex flex-col items-center justify-center py-16">
                <div className="mb-3 text-5xl">🎪</div>
                <div className="text-base font-medium">Your park is empty</div>
                <div className="mt-1 text-sm">Buy a ride from the Shop to get started!</div>
              </div>
            )}

            {Array.from({ length: Math.max(0, 3 - rides.length) }, (_, i) => (
              <Card
                key={`empty-${i}`}
                className="border-muted-foreground/20 flex h-28 items-center justify-center border-2 border-dashed bg-transparent shadow-none ring-0"
              >
                <span className="text-muted-foreground/40 text-2xl">+</span>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </main>

      <aside className="bg-sidebar border-sidebar-border flex w-full shrink-0 flex-col overflow-hidden border-t md:w-80 md:border-t-0 md:border-l">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="flex h-full min-h-0 flex-1 flex-col gap-0">
          <TabsList
            variant="line"
            className={cn(
              'bg-sidebar h-auto w-full shrink-0 flex-wrap justify-start gap-0 rounded-none border-b p-0 px-1',
              hasSelection && 'opacity-60'
            )}
          >
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="font-heading data-[state=active]:after:bg-primary relative flex-1 flex-col gap-0.5 py-2.5 text-[10px] tracking-widest uppercase"
                aria-label={`Switch to ${tab.label} tab`}
              >
                <span className="relative inline-flex flex-col items-center gap-0.5">
                  {tab.icon}
                  {tab.label}
                  {tab.id === 'rides' && brokenCount > 0 && (
                    <Badge variant="destructive" className="absolute -top-1 -right-2 h-4 min-w-4 px-0.5 text-[9px]">
                      {brokenCount}
                    </Badge>
                  )}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="min-h-0 flex-1">
            {hasSelection ? (
              <ScrollArea className="h-full max-h-[calc(100vh-8rem)]">
                <div className="p-3">
                  <RideInspector />
                </div>
              </ScrollArea>
            ) : (
              <>
                <TabsContent value="rides" className="mt-0 h-full min-h-0 flex-1 overflow-hidden outline-none">
                  <ScrollArea className="h-full max-h-[calc(100vh-8rem)]">
                    <div className="space-y-3 p-3">
                      <div className="text-muted-foreground text-xs tracking-widest uppercase">
                        {rides.length} ride{rides.length !== 1 ? 's' : ''} — click in grid to inspect
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <Card
                          size="sm"
                          className="gap-1 border-green-500/20 bg-green-500/10 py-3 text-center shadow-none"
                        >
                          <div className="font-heading text-xl font-black text-green-400">{operatingCount}</div>
                          <div className="text-xs tracking-wide text-green-400/80 uppercase">Open</div>
                        </Card>
                        <Card size="sm" className="gap-1 border-red-500/20 bg-red-500/10 py-3 text-center shadow-none">
                          <div className="font-heading text-xl font-black text-red-400">{brokenCount}</div>
                          <div className="text-xs tracking-wide text-red-400/80 uppercase">Broken</div>
                        </Card>
                        <Card
                          size="sm"
                          className="gap-1 border-yellow-500/20 bg-yellow-500/10 py-3 text-center shadow-none"
                        >
                          <div className="font-heading text-xl font-black text-yellow-400">{repairingCount}</div>
                          <div className="text-xs tracking-wide text-yellow-400/80 uppercase">Repair</div>
                        </Card>
                      </div>
                      {rides.length === 0 && (
                        <div className="text-muted-foreground py-8 text-center text-sm">
                          No rides yet. Visit the Shop tab!
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="shop" className="mt-0 h-full min-h-0 flex-1 outline-none">
                  <ScrollArea className="h-full max-h-[calc(100vh-8rem)]">
                    <div className="p-3">
                      <Suspense fallback={panelFallback}>
                        <ShopPanel />
                      </Suspense>
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="visitors" className="mt-0 h-full min-h-0 flex-1 outline-none">
                  <ScrollArea className="h-full max-h-[calc(100vh-8rem)]">
                    <div className="p-3">
                      <Suspense fallback={panelFallback}>
                        <VisitorPanel />
                      </Suspense>
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="stats" className="mt-0 h-full min-h-0 flex-1 outline-none">
                  <ScrollArea className="h-full max-h-[calc(100vh-8rem)]">
                    <div className="p-3">
                      <Suspense fallback={panelFallback}>
                        <StatsPanel />
                      </Suspense>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </>
            )}
          </div>
        </Tabs>
      </aside>
      </div>
    </div>
  );
};
