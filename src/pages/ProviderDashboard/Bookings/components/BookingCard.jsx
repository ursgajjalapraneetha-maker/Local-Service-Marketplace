import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Eye, MapPin, CalendarDays, Clock, IndianRupee } from 'lucide-react'
import BookingStatusBadge from './BookingStatusBadge'
import { cn } from '../../../../utils'

function BookingCard({ booking, index }) {
  const navigate = useNavigate()

  const handleView = useCallback(() => {
    navigate(`/provider-dashboard/bookings/${booking.id}`)
  }, [navigate, booking.id])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.03 * index }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl border border-gray-100 p-4 transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-primary">{booking.customer.name.charAt(0)}</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-secondary truncate">{booking.customer.name}</p>
            <p className="text-xs text-gray-500">{booking.service.name}</p>
          </div>
        </div>
        <BookingStatusBadge status={booking.bookingStatus} />
      </div>

      <div className="space-y-1.5 mb-3">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <CalendarDays size={13} aria-hidden="true" />
          {booking.date}
          <Clock size={13} className="ml-1" aria-hidden="true" />
          {booking.time}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <MapPin size={13} aria-hidden="true" />
          <span className="truncate">{booking.location}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <div>
          <span className="text-sm font-heading font-bold text-secondary">
            ₹{booking.amount.toLocaleString()}
          </span>
          <span className={cn(
            'ml-2 text-[10px] font-semibold px-1.5 py-0.5 rounded-full',
            booking.paymentStatus === 'paid' ? 'bg-green-50 text-green-600' :
            booking.paymentStatus === 'pending' ? 'bg-amber-50 text-amber-600' :
            'bg-gray-50 text-gray-500'
          )}>
            {booking.paymentStatus}
          </span>
        </div>
        <button
          onClick={handleView}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-label={`View booking ${booking.id}`}
        >
          <Eye size={13} />
          Details
        </button>
      </div>
    </motion.div>
  )
}

export default memo(BookingCard)
