import { X, AlertTriangle, Wrench, TrendingUp, Users } from 'lucide-react'
import { useGameStore } from '../store/gameStore'
import type { NotificationType } from '../types/game'

const NOTIFICATION_CONFIG: Record<NotificationType, {
  icon: React.ReactNode
  color: string
  borderColor: string
  bgColor: string
}> = {
  breakdown: {
    icon: <AlertTriangle size={14} />,
    color: 'text-red-400',
    borderColor: 'border-red-500/50',
    bgColor: 'bg-red-500/10',
  },
  repair: {
    icon: <Wrench size={14} />,
    color: 'text-yellow-400',
    borderColor: 'border-yellow-500/50',
    bgColor: 'bg-yellow-500/10',
  },
  visitor: {
    icon: <Users size={14} />,
    color: 'text-[#06b6d4]',
    borderColor: 'border-cyan-500/50',
    bgColor: 'bg-cyan-500/10',
  },
  income: {
    icon: <span className="text-xs font-bold">$</span>,
    color: 'text-[#f97316]',
    borderColor: 'border-orange-500/50',
    bgColor: 'bg-orange-500/10',
  },
  upgrade: {
    icon: <TrendingUp size={14} />,
    color: 'text-[#a78bfa]',
    borderColor: 'border-purple-500/50',
    bgColor: 'bg-purple-500/10',
  },
  warning: {
    icon: <AlertTriangle size={14} />,
    color: 'text-yellow-400',
    borderColor: 'border-yellow-500/50',
    bgColor: 'bg-yellow-500/10',
  },
}

export const Notifications = () => {
  const { notifications, dismissNotification } = useGameStore()

  if (notifications.length === 0) return null

  return (
    <div
      className="fixed top-16 right-3 z-50 flex flex-col gap-1.5 w-72 pointer-events-none"
      role="region"
      aria-label="Game notifications"
      aria-live="polite"
    >
      {notifications.map((notification, index) => {
        const cfg = NOTIFICATION_CONFIG[notification.type]
        return (
          <div
            key={notification.id}
            className={`
              flex items-start gap-2 px-3 py-2 rounded-lg border
              ${cfg.borderColor} ${cfg.bgColor}
              backdrop-blur-sm pointer-events-auto
              animate-slide-in
            `}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span className={`${cfg.color} mt-0.5 shrink-0`}>{cfg.icon}</span>
            <span className="text-xs text-slate-300 flex-1 leading-snug">{notification.message}</span>
            <button
              onClick={() => dismissNotification(notification.id)}
              className="text-slate-600 hover:text-slate-300 transition-colors cursor-pointer shrink-0 mt-0.5"
              aria-label="Dismiss notification"
            >
              <X size={12} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
