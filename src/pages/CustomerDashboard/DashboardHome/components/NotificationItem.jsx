import { memo } from 'react'
import { motion } from 'framer-motion'

function NotificationItem({ notification, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: 0.04 * index }}
      className="flex items-start gap-3 py-3 first:pt-0 last:pb-0 border-b border-gray-50 last:border-0"
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
        notification.type === 'booking' ? 'bg-primary/5 text-primary' :
        notification.type === 'payment' ? 'bg-success/10 text-success' :
        notification.type === 'promo' ? 'bg-warning/10 text-warning' : 'bg-gray-100 text-gray-500'
      }`}>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          {notification.type === 'booking' && <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />}
          {notification.type === 'payment' && <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />}
          {notification.type === 'promo' && <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38a.485.485 0 01-.484-.03 11.508 11.508 0 01-2.357-1.924.75.75 0 01-.197-.563m2.173-.157a7.5 7.5 0 011.73-3.196m0 0a7.5 7.5 0 013.196-1.73m0 0a7.5 7.5 0 013.196 1.73m0 0a7.5 7.5 0 011.73 3.196" />}
          {notification.type !== 'booking' && notification.type !== 'payment' && notification.type !== 'promo' && <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-secondary">{notification.title}</p>
          {notification.unread && <span className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1.5" aria-label="Unread" />}
        </div>
        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{notification.message}</p>
        <p className="text-[11px] text-gray-400 mt-0.5">{notification.time}</p>
      </div>
    </motion.div>
  )
}

export default memo(NotificationItem)
