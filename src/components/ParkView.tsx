import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { RideCard } from './RideCard';
import { ShopPanel } from './ShopPanel';
import { VisitorPanel } from './VisitorPanel';
import { StatsPanel } from './StatsPanel';
import { ShoppingBag, Users, BarChart2, Layers } from 'lucide-react';

type SideTab = 'rides' | 'shop' | 'visitors' | 'stats';

const TABS: { id: SideTab; label: string; icon: React.ReactNode }[] = [
  { id: 'rides', label: 'Rides', icon: <Layers size={14} /> },
  { id: 'shop', label: 'Shop', icon: <ShoppingBag size={14} /> },
  { id: 'visitors', label: 'Guests', icon: <Users size={14} /> },
  { id: 'stats', label: 'Stats', icon: <BarChart2 size={14} /> },
];

export const ParkView = () => {
  const { rides } = useGameStore();
  const [activeTab, setActiveTab] = useState<SideTab>('rides');

  const brokenCount = rides.filter((r) => r.status === 'broken').length;

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
            <p className="mt-0.5 text-xs text-slate-500">
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
              <div className="mb-3 text-4xl">🎪</div>
              <div className="text-sm font-medium">Your park is empty</div>
              <div className="mt-1 text-xs">Buy a ride from the Shop to get started!</div>
            </div>
          )}

          {Array.from({ length: Math.max(0, 3 - rides.length) }, (_, i) => (
            <div
              key={`empty-${i}`}
              className="flex h-28 items-center justify-center rounded-xl border-2 border-dashed border-[#2a2a50]/50"
            >
              <span className="text-xl text-[#2a2a50]">+</span>
            </div>
          ))}
        </div>
      </main>

      {/* Side panel */}
      <aside className="flex w-72 flex-col overflow-hidden border-l border-[#2a2a50] bg-[#0d0d24]">
        {/* Tabs */}
        <div className="flex shrink-0 border-b border-[#2a2a50]">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-1 cursor-pointer flex-col items-center gap-0.5 py-2.5 text-[9px] font-bold tracking-widest uppercase transition-colors duration-150 ${
                activeTab === tab.id ? 'bg-[#7c3aed]/10 text-[#a78bfa]' : 'text-slate-500 hover:text-slate-300'
              } `}
              aria-label={`Switch to ${tab.label} tab`}
              aria-selected={activeTab === tab.id}
            >
              {tab.icon}
              {tab.label}
              {tab.id === 'rides' && brokenCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] font-black text-white">
                  {brokenCount}
                </span>
              )}
              {activeTab === tab.id && (
                <div
                  className="absolute right-0 bottom-0 left-0 h-0.5 bg-[#7c3aed]"
                  style={{ boxShadow: '0 0 8px #7c3aed' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Panel content */}
        <div className="flex-1 overflow-y-auto p-3">
          {activeTab === 'rides' && (
            <div className="space-y-2">
              <div className="mb-2 text-[10px] tracking-widest text-slate-500 uppercase">
                {rides.length} ride{rides.length !== 1 ? 's' : ''} — click to select
              </div>
              {rides.map((ride) => (
                <RideCard key={ride.instanceId} ride={ride} />
              ))}
              {rides.length === 0 && (
                <div className="py-8 text-center text-xs text-slate-600">No rides yet. Visit the Shop tab!</div>
              )}
            </div>
          )}
          {activeTab === 'shop' && <ShopPanel />}
          {activeTab === 'visitors' && <VisitorPanel />}
          {activeTab === 'stats' && <StatsPanel />}
        </div>
      </aside>
    </div>
  );
};
