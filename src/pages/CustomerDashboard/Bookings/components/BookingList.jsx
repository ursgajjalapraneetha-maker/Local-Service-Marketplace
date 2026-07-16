import { memo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BookingCard from './BookingCard'
import BookingEmptyState from './BookingEmptyState'

function BookingList({ bookings, onCancel, onReschedule }) {
  if (bookings.length === 0) return <BookingEmptyState />

  return (
    <div className="space-y-3" role="list" aria-label="Bookings list">
      <AnimatePresence mode="popLayout">
        {bookings.map((booking, i) => (
          <motion.div
            key={booking.id}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            role="listitem"
          >
            <BookingCard
              booking={booking}
              index={i}
              onCancel={onCancel}
              onReschedule={onReschedule}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default memo(BookingList)
