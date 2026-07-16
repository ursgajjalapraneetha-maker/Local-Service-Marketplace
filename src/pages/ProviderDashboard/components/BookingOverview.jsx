import { memo } from 'react'
import { motion } from 'framer-motion'
import { CalendarCheck, CalendarRange, CheckCircle, XCircle } from 'lucide-react'
import { bookingOverview } from '../data/dashboardData'

const OVERVIEW_ITEMS = [
  {
    key: 'today',
    label: "Today's Bookings",
    icon: CalendarCheck,
    value: bookingOverview.today,
    color: 'bg-primary/10 text-primary',
    barColor: 'bg-primary',
  },
  {
    key: 'upcoming',
    label: 'Upcoming',
    icon: CalendarRange,
    value: bookingOverview.upcoming,
    color: 'bg-blue-100 text-blue-600',
    barColor: 'bg-blue-500',
  },
  {
    key: 'completed',
    label: 'Completed',
    icon: CheckCircle,
    value: bookingOverview.completed,
    color: 'bg-green-50 text-green-600',
    barColor: 'bg-green-500',
  },
  {
    key: 'cancelled',
    label: 'Cancelled',
    icon: XCircle,
    value: bookingOverview.cancelled,
    color: 'bg-red-50 text-red-600',
    barColor: 'bg-red-500',
  },
]

const total = bookingOverview.today + bookingOverview.upcoming + bookingOverview.completed + bookingOverview.cancelled

function BookingOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-white rounded-xl border border-gray-100 p-5"
      role="region"
      aria-label="Booking overview"
    >
      <div className="flex items-center gap-2 mb-4">
        <CalendarCheck size={18} className="text-primary" aria-hidden="true" />
        <h2 className="text-base font-heading font-semibold text-secondary">Booking Overview</h2>
      </div>

      <div className="space-y-3">
        {OVERVIEW_ITEMS.map((item) => {
          const percentage = total > 0 ? (item.value / total) * 100 : 0
          return (
            <div key={item.key} className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${item.color}`}>
                <item.icon size={16} aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className="text-sm font-semibold text-secondary">{item.value}</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                    className={`h-full rounded-full ${item.barColor}`}
                    role="progressbar"
                    aria-valuenow={item.value}
                    aria-valuemin={0}
                    aria-valuemax={total}
                    aria-label={`${item.label}: ${item.value} of ${total}`}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default memo(BookingOverview)
