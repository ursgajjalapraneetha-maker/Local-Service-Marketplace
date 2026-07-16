import { memo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import NotificationCard from './NotificationCard'
import NotificationEmptyState from './NotificationEmptyState'

function NotificationList({ notifications, onMarkRead, onDelete }) {
  if (notifications.length === 0) return <NotificationEmptyState />

  return (
    <div className="space-y-2" role="list" aria-label="Notifications list">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification, i) => (
          <motion.div
            key={notification.id}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            role="listitem"
          >
            <NotificationCard
              notification={notification}
              index={i}
              onMarkRead={onMarkRead}
              onDelete={onDelete}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default memo(NotificationList)
