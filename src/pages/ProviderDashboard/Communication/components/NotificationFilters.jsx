import { memo } from 'react'
import { motion } from 'framer-motion'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'booking', label: 'Bookings' },
  { key: 'payment', label: 'Payments' },
  { key: 'message', label: 'Messages' },
  { key: 'review', label: 'Reviews' },
  { key: 'system', label: 'System' },
]

function NotificationFilters({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Notification filters">
      {FILTERS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          role="tab"
          aria-selected={active === key}
          className={`relative px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
            active === key
              ? 'text-primary bg-primary/5'
              : 'text-gray-500 hover:text-secondary hover:bg-gray-50'
          }`}
        >
          {active === key && (
            <motion.span
              layoutId="notif-filter-active"
              className="absolute inset-0 bg-primary/5 rounded-lg"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{label}</span>
        </button>
      ))}
    </div>
  )
}

export default memo(NotificationFilters)
