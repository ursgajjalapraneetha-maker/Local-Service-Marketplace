import { memo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bell, ArrowRight } from 'lucide-react'
import NotificationItem from './NotificationItem'

const NOTIFICATIONS = [
  { type: 'booking', title: 'Booking Confirmed', message: 'Home Deep Cleaning confirmed for 18 Jul at 10:00 AM', time: '2 hours ago', unread: true },
  { type: 'payment', title: 'Payment Successful', message: '₹2,499 paid via UPI', time: '2 hours ago', unread: true },
  { type: 'promo', title: 'Weekend Offer', message: '20% off on all painting services this weekend', time: '1 day ago', unread: false },
  { type: 'booking', title: 'Reminder', message: 'AC Repair scheduled tomorrow at 2:00 PM', time: '1 day ago', unread: false },
  { type: 'general', title: 'Review Request', message: 'How was your Bathroom Deep Clean?', time: '3 days ago', unread: false },
]

function NotificationsPreview() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell size={18} className="text-primary" aria-hidden="true" />
          <h2 className="text-base font-heading font-semibold text-secondary">Notifications</h2>
        </div>
        <Link
          to="/customer-dashboard/notifications"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded"
        >
          View All
          <ArrowRight size={12} />
        </Link>
      </div>

      {NOTIFICATIONS.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Bell size={22} className="text-gray-300" />
          </div>
          <p className="text-sm font-medium text-secondary">No notifications</p>
          <p className="text-xs text-gray-400 mt-1">You're all caught up!</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          {NOTIFICATIONS.map((n, i) => (
            <NotificationItem key={i} notification={n} index={i} />
          ))}
        </div>
      )}
    </motion.section>
  )
}

export default memo(NotificationsPreview)
