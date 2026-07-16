import { memo } from 'react'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import ActivityItem from './ActivityItem'

const ACTIVITIES = [
  { type: 'booking', icon: 'check', title: 'Booking Confirmed', description: 'Home Deep Cleaning with Sparkle Clean Pro confirmed for 18 Jul 2026', time: '2 hours ago' },
  { type: 'payment', icon: 'credit', title: 'Payment Completed', description: '₹2,499 paid for Home Deep Cleaning via UPI', time: '2 hours ago' },
  { type: 'review', icon: 'star', title: 'Review Submitted', description: 'You rated AC Repair service 5 stars', time: '3 days ago' },
  { type: 'wishlist', icon: 'heart', title: 'Added to Wishlist', description: 'Interior Wall Painting added to your wishlist', time: '5 days ago' },
  { type: 'booking', icon: 'check', title: 'Service Completed', description: 'Bathroom Deep Clean was completed successfully', time: '1 week ago' },
]

function RecentActivity() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Clock size={18} className="text-primary" aria-hidden="true" />
        <h2 className="text-base font-heading font-semibold text-secondary">Recent Activity</h2>
      </div>

      {ACTIVITIES.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock size={22} className="text-gray-300" />
          </div>
          <p className="text-sm font-medium text-secondary">No recent activity</p>
          <p className="text-xs text-gray-400 mt-1">Your activity will appear here.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          {ACTIVITIES.map((activity, i) => (
            <ActivityItem key={i} activity={activity} index={i} />
          ))}
        </div>
      )}
    </motion.section>
  )
}

export default memo(RecentActivity)
