import { memo } from 'react'
import { motion } from 'framer-motion'
import { CalendarRange, Clock } from 'lucide-react'
import { availabilityData } from '../data/dashboardData'

const STATUS_CONFIG = {
  available: {
    label: 'Available',
    dot: 'bg-green-500',
    bg: 'bg-green-50',
    text: 'text-green-700',
  },
  busy: {
    label: 'Busy',
    dot: 'bg-red-500',
    bg: 'bg-red-50',
    text: 'text-red-700',
  },
  offline: {
    label: 'Offline',
    dot: 'bg-gray-500',
    bg: 'bg-gray-50',
    text: 'text-gray-600',
  },
}

function AvailabilityCard() {
  const status = STATUS_CONFIG[availabilityData.status] || STATUS_CONFIG.available

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="bg-white rounded-xl border border-gray-100 p-5"
      role="region"
      aria-label="Availability status"
    >
      <div className="flex items-center gap-2 mb-4">
        <CalendarRange size={18} className="text-primary" aria-hidden="true" />
        <h2 className="text-base font-heading font-semibold text-secondary">Availability</h2>
      </div>

      <div className="space-y-3">
        <div className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg ${status.bg}`}>
          <span className={`w-2.5 h-2.5 rounded-full ${status.dot} animate-pulse`} aria-hidden="true" />
          <span className={`text-sm font-semibold ${status.text}`}>{status.label}</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-2.5">
            <Clock size={15} className="text-gray-400 mt-0.5 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-xs text-gray-400">Working Hours</p>
              <p className="text-sm font-medium text-secondary mt-0.5">
                Mon-Fri: {availabilityData.workingHours.weekday}
              </p>
              <p className="text-sm font-medium text-secondary">
                Sat-Sun: {availabilityData.workingHours.weekend}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-50">
          <p className="text-xs text-gray-400">Next Available Slot</p>
          <p className="text-sm font-semibold text-secondary mt-0.5">
            {availabilityData.nextAvailable}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default memo(AvailabilityCard)
