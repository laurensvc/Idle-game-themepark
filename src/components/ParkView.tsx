import { useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { RideCard } from './RideCard'
import { ShopPanel } from './ShopPanel'
import { VisitorPanel } from './VisitorPanel'
import { StatsPanel } from './StatsPanel'
import { ShoppingBag, Users, BarChart2, Layers } from 'lucide-react'

type SideTab = 'rides' | 'shop' | 'visitors' | 'stats'

const TABS: { id: SideTab; label: string; icon: React.ReactNode }[] = [
  { id: 'rides', label: 'Rides', icon: <Layers size={14} /> },
  { id: 'shop', label: 'Shop', icon: <ShoppingBag size={14} /> },
  { id: 'visitors', label: 'Guests', icon: <Users size={14} /> },
  { id: 'stats', label: 'Stats', icon: <BarChart2 size={14} /> },
]

export const ParkView = () => {
  const { rides } = useGameStore()
  const [activeTab, setActiveTab] = useState<SideTab>('rides')

  const brokenCount = rides.filter(r => r.status === 'broken').length

  return (
    <div className="flex flex-1 overflow-hidden gap-0">
      {/* Main park area */}
      <main className="flex-1 overflow-hidden relative p-4">
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
            <h1 className="text-xl font-black font-display text-white leading-none">
              Your <span className="text-[#a78bfa] neon-text-purple">Theme Park</span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {rides.length} ride{rides.length !== 1 ? 's' : ''} installed
              {brokenCount > 0 && (
                <span className="text-red-400 ml-2 font-semibold animate-pulse-neon">
                  ⚠ {brokenCount} broken
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Ride grid */}
        <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 overflow-y-auto max-h-[calc(100vh-160px)] pb-4">
          {rides.map(ride => (
            <RideCard key={ride.instanceId} ride={ride} />
          ))}

          {/* Empty park slots */}
          {rides.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-slate-600">
              <div className="text-4xl mb-3">🎪</div>
              <div className="text-sm font-medium">Your park is empty</div>
              <div className="text-xs mt-1">Buy a ride from the Shop to get started!</div>
            </div>
          )}

          {Array.from({ length: Math.max(0, 3 - rides.length) }, (_, i) => (
            <div
              key={`empty-${i}`}
              className="rounded-xl border-2 border-dashed border-[#2a2a50]/50 h-28 flex items-center justify-center"
            >
              <span className="text-[#2a2a50] text-xl">+</span>
            </div>
          ))}
        </div>
      </main>

      {/* Side panel */}
      <aside className="w-72 border-l border-[#2a2a50] bg-[#0d0d24] flex flex-col overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-[#2a2a50] shrink-0">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 flex flex-col items-center gap-0.5 py-2.5 text-[9px] uppercase tracking-widest font-bold
                transition-colors duration-150 cursor-pointer relative
                ${activeTab === tab.id
                  ? 'text-[#a78bfa] bg-[#7c3aed]/10'
                  : 'text-slate-500 hover:text-slate-300'
                }
              `}
              aria-label={`Switch to ${tab.label} tab`}
              aria-selected={activeTab === tab.id}
            >
              {tab.icon}
              {tab.label}
              {tab.id === 'rides' && brokenCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-[8px] font-black text-white flex items-center justify-center">
                  {brokenCount}
                </span>
              )}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7c3aed]" style={{ boxShadow: '0 0 8px #7c3aed' }} />
              )}
            </button>
          ))}
        </div>

        {/* Panel content */}
        <div className="flex-1 overflow-y-auto p-3">
          {activeTab === 'rides' && (
            <div className="space-y-2">
              <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">
                {rides.length} ride{rides.length !== 1 ? 's' : ''} — click to select
              </div>
              {rides.map(ride => (
                <RideCard key={ride.instanceId} ride={ride} />
              ))}
              {rides.length === 0 && (
                <div className="text-xs text-slate-600 text-center py-8">
                  No rides yet. Visit the Shop tab!
                </div>
              )}
            </div>
          )}
          {activeTab === 'shop' && <ShopPanel />}
          {activeTab === 'visitors' && <VisitorPanel />}
          {activeTab === 'stats' && <StatsPanel />}
        </div>
      </aside>
    </div>
  )
}
