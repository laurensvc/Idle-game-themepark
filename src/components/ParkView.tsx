import { lazy, Suspense, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { RideCard } from './RideCard';
import { RideInspector } from './RideInspector';
import { ShoppingBag, Users, BarChart2, Layers } from 'lucide-react';

const ShopPanel = lazy(() => import('./ShopPanel').then((m) => ({ default: m.ShopPanel })));
const VisitorPanel = lazy(() => import('./VisitorPanel').then((m) => ({ default: m.VisitorPanel })));
const StatsPanel = lazy(() => import('./StatsPanel').then((m) => ({ default: m.StatsPanel })));

const panelFallback = (
  <div className="text-sm text-slate-500" role="status">
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

  const handleTabClick = (tabId: SideTab) => {
    if (hasSelection) selectRide(null);
    setActiveTab(tabId);
  };

  return (
    <div className="flex flex-1 gap-0 overflow-hidden">
      {/* Main park area */}
      <main className="relative flex-1 overflow-hidden p-4">
        {/* Park background grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(124,58,237,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(124,58,237,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Park title */}
        <div className="relative mb-4 flex items-center gap-3">
          <div>
            <h1 className="font-display text-xl leading-none font-black text-white">
              Your <span className="neon-text-purple text-[#a78bfa]">Theme Park</span>
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {rides.length} ride{rides.length !== 1 ? 's' : ''} installed
              {brokenCount > 0 && (
                <span className="animate-pulse-neon ml-2 font-semibold text-red-400">⚠ {brokenCount} broken</span>
              )}
            </p>
          </div>
        </div>

        {/* Ride grid */}
        <div className="relative grid max-h-[calc(100vh-160px)] grid-cols-2 gap-3 overflow-y-auto pb-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {rides.map((ride) => (
            <RideCard key={ride.instanceId} ride={ride} />
          ))}

          {/* Empty park slots */}
          {rides.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-slate-600">
              <div className="mb-3 text-5xl">🎪</div>
              <div className="text-base font-medium">Your park is empty</div>
              <div className="mt-1 text-sm">Buy a ride from the Shop to get started!</div>
            </div>
          )}

          {Array.from({ length: Math.max(0, 3 - rides.length) }, (_, i) => (
            <div
              key={`empty-${i}`}
              className="border-park-border/50 bg-park-card flex h-28 items-center justify-center border-2 border-dashed opacity-50"
            >
              <span className="text-2xl text-[#2a2a50]">+</span>
            </div>
          ))}
        </div>
      </main>

      {/* Side panel */}
      <aside className="flex w-80 flex-col overflow-hidden border-l border-[#2a2a50] bg-[#0d0d24]">
        {/* Tabs */}
        <div className={`flex shrink-0 border-b border-[#2a2a50] ${hasSelection ? 'opacity-50' : ''}`}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`relative flex flex-1 cursor-pointer flex-col items-center gap-1 py-2.5 text-xs font-bold tracking-widest uppercase transition-colors duration-150 ${
                !hasSelection && activeTab === tab.id
                  ? 'bg-[#7c3aed]/10 text-[#a78bfa]'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
              aria-label={`Switch to ${tab.label} tab`}
              aria-selected={!hasSelection && activeTab === tab.id}
            >
              {tab.icon}
              {tab.label}
              {tab.id === 'rides' && brokenCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center bg-red-500 text-[8px] font-black text-white">
                  {brokenCount}
                </span>
              )}
              {!hasSelection && activeTab === tab.id && (
                <div className="bg-neon-purple absolute right-0 bottom-0 left-0 h-1" />
              )}
            </button>
          ))}
        </div>

        {/* Panel content */}
        <div className="flex-1 overflow-y-auto p-3">
          {hasSelection ? (
            <RideInspector />
          ) : (
            <>
              {activeTab === 'rides' && (
                <div className="space-y-3">
                  <div className="mb-2 text-xs tracking-widest text-slate-500 uppercase">
                    {rides.length} ride{rides.length !== 1 ? 's' : ''} — click in grid to inspect
                  </div>

                  {/* Ride status summary */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="pixel-panel bg-green-500/10 p-2 text-center">
                      <div className="font-display text-xl font-black text-green-400">{operatingCount}</div>
                      <div className="text-xs tracking-wide text-green-400/70 uppercase">Open</div>
                    </div>
                    <div className="pixel-panel bg-red-500/10 p-2 text-center">
                      <div className="font-display text-xl font-black text-red-400">{brokenCount}</div>
                      <div className="text-xs tracking-wide text-red-400/70 uppercase">Broken</div>
                    </div>
                    <div className="pixel-panel bg-yellow-500/10 p-2 text-center">
                      <div className="font-display text-xl font-black text-yellow-400">{repairingCount}</div>
                      <div className="text-xs tracking-wide text-yellow-400/70 uppercase">Repair</div>
                    </div>
                  </div>

                  {rides.length === 0 && (
                    <div className="py-8 text-center text-sm text-slate-600">No rides yet. Visit the Shop tab!</div>
                  )}
                </div>
              )}
              {activeTab === 'shop' && (
                <Suspense fallback={panelFallback}>
                  <ShopPanel />
                </Suspense>
              )}
              {activeTab === 'visitors' && (
                <Suspense fallback={panelFallback}>
                  <VisitorPanel />
                </Suspense>
              )}
              {activeTab === 'stats' && (
                <Suspense fallback={panelFallback}>
                  <StatsPanel />
                </Suspense>
              )}
            </>
          )}
        </div>
      </aside>
    </div>
  );
};
