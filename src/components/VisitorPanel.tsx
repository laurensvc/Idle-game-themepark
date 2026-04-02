import { Users, Heart } from 'lucide-react'
import { useGameStore } from '../store/gameStore'
import type { VisitorType } from '../types/game'

const VISITOR_CONFIG: Record<VisitorType, { label: string; icon: string; color: string }> = {
  family: { label: 'Family', icon: '👨‍👩‍👧‍👦', color: '#06b6d4' },
  thrill_seeker: { label: 'Thrill Seeker', icon: '🤘', color: '#f97316' },
  child: { label: 'Child', icon: '🧒', color: '#ec4899' },
  elderly: { label: 'Elderly', icon: '👴', color: '#a78bfa' },
  teen: { label: 'Teen', icon: '🧑', color: '#22c55e' },
}

export const VisitorPanel = () => {
  const { visitors, parkHappiness, parkDirt, cleanPark, isAutoCleanEnabled } = useGameStore()

  const totalVisitors = visitors.reduce((sum, v) => sum + v.size, 0)
  const typeCounts = visitors.reduce<Record<VisitorType, number>>(
    (acc, v) => ({ ...acc, [v.type]: (acc[v.type] ?? 0) + v.size }),
    {} as Record<VisitorType, number>,
  )

  const avgHappiness = visitors.length > 0
    ? Math.round(visitors.reduce((sum, v) => sum + v.happiness, 0) / visitors.length)
    : Math.round(parkHappiness)

  const happinessColor =
    avgHappiness >= 70 ? '#22c55e' : avgHappiness >= 40 ? '#eab308' : '#ef4444'

  return (
    <div className="flex flex-col gap-3">
      {/* Visitor count header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users size={14} className="text-[#06b6d4]" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Guests</span>
        </div>
        <span className="text-lg font-black font-display text-[#06b6d4]">{totalVisitors}</span>
      </div>

      {/* Visitor type breakdown */}
      <div className="space-y-1.5">
        {(Object.keys(VISITOR_CONFIG) as VisitorType[]).map(type => {
          const cfg = VISITOR_CONFIG[type]
          const count = typeCounts[type] ?? 0
          const pct = totalVisitors > 0 ? (count / totalVisitors) * 100 : 0
          return (
            <div key={type} className="flex items-center gap-2">
              <span className="text-sm w-5">{cfg.icon}</span>
              <div className="flex-1">
                <div className="flex justify-between text-[10px] mb-0.5">
                  <span className="text-slate-400">{cfg.label}</span>
                  <span className="font-bold" style={{ color: cfg.color }}>{count}</span>
                </div>
                <div className="h-1 bg-[#2a2a50] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      background: cfg.color,
                      boxShadow: `0 0 4px ${cfg.color}`,
                    }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Divider */}
      <div className="border-t border-[#2a2a50]" />

      {/* Happiness */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <Heart size={12} style={{ color: happinessColor }} />
            <span className="text-[10px] uppercase tracking-wider text-slate-400">Happiness</span>
          </div>
          <span className="text-sm font-bold" style={{ color: happinessColor }}>{avgHappiness}%</span>
        </div>
        <div className="h-2 bg-[#2a2a50] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${avgHappiness}%`,
              background: happinessColor,
              boxShadow: `0 0 8px ${happinessColor}`,
            }}
          />
        </div>
        <div className="text-[9px] text-slate-500 mt-1">
          {avgHappiness >= 80 ? 'Guests are ecstatic!' : avgHappiness >= 60 ? 'Guests are enjoying their visit' : avgHappiness >= 40 ? 'Some guests are unhappy' : 'Guests are leaving! Fix this!'}
        </div>
      </div>

      {/* Park cleanliness */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] uppercase tracking-wider text-slate-400">Park Cleanliness</span>
          <span className={`text-sm font-bold ${parkDirt <= 30 ? 'text-green-400' : parkDirt <= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
            {Math.round(100 - parkDirt)}%
          </span>
        </div>
        <div className="h-2 bg-[#2a2a50] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${100 - parkDirt}%`,
              background: parkDirt <= 30 ? '#22c55e' : parkDirt <= 60 ? '#eab308' : '#ef4444',
            }}
          />
        </div>
        {!isAutoCleanEnabled && (
          <button
            onClick={cleanPark}
            className="
              mt-2 w-full py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider
              bg-[#22c55e]/10 border border-[#22c55e]/30 text-green-400
              hover:bg-[#22c55e]/20 transition-colors duration-150 cursor-pointer
            "
            aria-label="Clean the park"
          >
            🧹 Clean Park
          </button>
        )}
        {isAutoCleanEnabled && (
          <div className="mt-1 text-[9px] text-green-400 flex items-center gap-1">
            <span>✓</span>
            <span>Janitor on duty — auto-cleaning</span>
          </div>
        )}
      </div>
    </div>
  )
}
