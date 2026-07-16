import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Tag,
} from 'lucide-react'
import NotificationActions from './NotificationActions'

const CATEGORY_ICONS = {
  bookings: Bell,
  payments: CheckCircle,
  offers: Tag,
  system: AlertTriangle,
  messages: Bell,
}

const CATEGORY_COLORS = {
  bookings: 'bg-primary/10 text-primary',
  payments: 'bg-success/10 text-success',
  offers: 'bg-warning/10 text-warning',
  system: 'bg-blue-100 text-blue-600',
  messages: 'bg-purple-100 text-purple-600',
}

const CATEGORY_LABELS = {
  bookings: 'Booking',
  payments: 'Payment',
  offers: 'Offer',
  system: 'System',
  messages: 'Message',
}

const TYPE_ICONS = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
  promo: Tag,
  info: Bell,
}

const TYPE_COLORS = {
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  error: 'bg-danger/10 text-danger',
  promo: 'bg-warning/10 text-warning',
  info: 'bg-primary/10 text-primary',
}

function formatRelativeTime(dateString) {
  const now = new Date()
  const date = new Date(dateString)
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} min ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function NotificationCard({ notification, index, onMarkRead, onDelete }) {
  const TypeIcon = TYPE_ICONS[notification.type] || Bell
  const typeColor = TYPE_COLORS[notification.type] || 'bg-gray-100 text-gray-500'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, scale: 0.98 }}
      transition={{ duration: 0.3, delay: 0.03 * index }}
      layout
      className={`bg-white rounded-xl border overflow-hidden transition-shadow hover:shadow-sm ${
        notification.read ? 'border-gray-100' : 'border-primary/10 bg-primary/[0.02]'
      }`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${typeColor}`}>
            <TypeIcon size={16} aria-hidden="true" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className={`text-sm truncate ${notification.read ? 'font-medium text-gray-700' : 'font-semibold text-secondary'}`}>
                    {notification.title}
                  </h3>
                  {!notification.read && (
                    <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" aria-label="Unread" />
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{notification.message}</p>
              </div>
              <span className="text-[11px] text-gray-400 whitespace-nowrap shrink-0">
                {formatRelativeTime(notification.createdAt)}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${CATEGORY_COLORS[notification.category] || 'bg-gray-100 text-gray-500'}`}>
                  {CATEGORY_LABELS[notification.category] || notification.category}
                </span>
                {notification.read ? (
                  <span className="text-[10px] text-gray-400">Read</span>
                ) : (
                  <span className="text-[10px] font-medium text-primary">New</span>
                )}
              </div>

              <NotificationActions
                notification={notification}
                onMarkRead={onMarkRead}
                onDelete={onDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default memo(NotificationCard)
