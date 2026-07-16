import { motion } from 'framer-motion'
import { Bell } from 'lucide-react'

export default function EmptyNotifications({ hasFilters }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
        <Bell size={28} className="text-gray-300" aria-hidden="true" />
      </div>
      {hasFilters ? (
        <>
          <h3 className="text-base font-heading font-semibold text-secondary mb-1">No Matching Notifications</h3>
          <p className="text-sm text-gray-500 text-center max-w-xs">
            Try adjusting your filters to see more results.
          </p>
        </>
      ) : (
        <>
          <h3 className="text-base font-heading font-semibold text-secondary mb-1">All Clear</h3>
          <p className="text-sm text-gray-500 text-center max-w-xs">
            You have no notifications at this time. We will notify you when something arrives.
          </p>
        </>
      )}
    </motion.div>
  )
}
