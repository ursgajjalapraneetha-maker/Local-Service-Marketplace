import { memo } from 'react'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import QuickActionCard from './QuickActionCard'

const ACTIONS = [
  { icon: 'book', label: 'Book New Service', path: '/services', color: 'bg-primary' },
  { icon: 'browse', label: 'Browse Services', path: '/services', color: 'bg-success' },
  { icon: 'bookings', label: 'View Bookings', path: '/customer-dashboard/bookings', color: 'bg-warning' },
  { icon: 'wishlist', label: 'Wishlist', path: '/customer-dashboard/wishlist', color: 'bg-danger' },
  { icon: 'profile', label: 'Edit Profile', path: '/customer-dashboard/profile', color: 'bg-blue-500' },
  { icon: 'support', label: 'Support', path: '/customer-dashboard/help', color: 'bg-purple-500' },
]

function QuickActions() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Zap size={18} className="text-primary" aria-hidden="true" />
        <h2 className="text-base font-heading font-semibold text-secondary">Quick Actions</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {ACTIONS.map((action, i) => (
          <QuickActionCard key={action.label} {...action} index={i} />
        ))}
      </div>
    </motion.section>
  )
}

export default memo(QuickActions)
