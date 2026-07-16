import { memo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CalendarCheck, ArrowRight } from 'lucide-react'
import BookingCard from './BookingCard'

const BOOKINGS = [
  { id: 1, service: 'Full Home Deep Cleaning', provider: 'Sparkle Clean Pro', date: '18 Jul 2026', time: '10:00 AM', status: 'confirmed', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=150&h=150&fit=crop' },
  { id: 2, service: 'AC Repair & Service', provider: 'CoolAir Experts', date: '20 Jul 2026', time: '2:00 PM', status: 'pending', image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=150&h=150&fit=crop' },
  { id: 3, service: 'Bathroom Deep Clean', provider: 'CleanHome Services', date: '22 Jul 2026', time: '9:00 AM', status: 'confirmed', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=150&h=150&fit=crop' },
]

function UpcomingBookings() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarCheck size={18} className="text-primary" aria-hidden="true" />
          <h2 className="text-base font-heading font-semibold text-secondary">Upcoming Bookings</h2>
        </div>
        <Link
          to="/customer-dashboard/bookings"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded"
        >
          View All
          <ArrowRight size={12} />
        </Link>
      </div>

      {BOOKINGS.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
          <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-3">
            <CalendarCheck size={22} className="text-primary/40" />
          </div>
          <p className="text-sm font-medium text-secondary">No upcoming bookings</p>
          <p className="text-xs text-gray-400 mt-1">Book a service to see it here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {BOOKINGS.map((booking, i) => (
            <BookingCard key={booking.id} booking={booking} index={i} />
          ))}
        </div>
      )}
    </motion.section>
  )
}

export default memo(UpcomingBookings)
