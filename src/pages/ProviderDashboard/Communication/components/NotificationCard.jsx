import { memo } from 'react'
import { motion } from 'framer-motion'
import { CalendarCheck, IndianRupee, MessageSquare, Star, Bell } from 'lucide-react'

const TYPE_CONFIG = {
  booking: { icon: CalendarCheck, bg: 'bg-blue-50', text: 'text-blue-600' },
  payment: { icon: IndianRupee, bg: 'bg-green-50', text: 'text-green-600' },
  message: { icon: MessageSquare, bg: 'bg-purple-50', text: 'text-purple-600' },
  review: { icon: Star, bg: 'bg-amber-50', text: 'text-amber-600' },
  system: { icon: Bell, bg: 'bg-gray-100', text: 'text-gray-600' },
}

function NotificationCard({ notification, index, onMarkRead }) {
  const config = TYPE_CONFIG[notification.type] || TYPE_CONFIG.system
  const Icon = config.icon
  const time = new Date(notification.timestamp)
  const now = new Date()
  const diffMs = now - time
  const diffMin = Math.floor(diffMs / 60000)
  const diffHr = Math.floor(diffMs / 3600000)
  const diffDay = Math.floor(diffMs / 86400000)

  let timeAgo
  if (diffMin < 1) timeAgo = 'Just now'
  else if (diffMin < 60) timeAgo = `${diffMin}m ago`
  else if (diffHr < 24) timeAgo = `${diffHr}h ago`
  else if (diffDay < 7) timeAgo = `${diffDay}d ago`
  else timeAgo = time.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      onClick={() => !notification.read && onMarkRead?.(notification.id)}
      className={`flex items-start gap-3 px-4 py-3.5 transition-colors cursor-pointer ${
        notification.read ? 'bg-white' : 'bg-primary/[0.02]'
      } hover:bg-gray-50`}
      role="button"
      tabIndex={0}
      aria-label={`${notification.title}. ${notification.read ? 'Read' : 'Unread'}`}
      onKeyDown={(e) => { if (e.key === 'Enter') onMarkRead?.(notification.id) }}
    >
      <div className={`w-9 h-9 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
        <Icon size={16} className={config.text} aria-hidden="true" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className={`text-sm ${notification.read ? 'font-medium text-secondary' : 'font-semibold text-secondary'}`}>
            {notification.title}
          </h4>
          <span className="text-[10px] text-gray-400 shrink-0">{timeAgo}</span>
        </div>
        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{notification.description}</p>
      </div>

      {!notification.read && (
        <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" aria-hidden="true" />
      )}
    </motion.div>
  )
}

export default memo(NotificationCard)
