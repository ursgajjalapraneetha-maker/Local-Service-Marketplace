import { memo, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, CalendarDays, Clock } from 'lucide-react'
import BookingStatusBadge from './BookingStatusBadge'
import BookingActions from './BookingActions'
import BookingTimeline from './BookingTimeline'

function BookingCard({ booking, index, onCancel, onReschedule }) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.04 * index }}
      layout
      className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col sm:flex-row">
        <Link
          to={`/customer-dashboard/bookings/${booking.id}`}
          className="sm:w-44 lg:w-52 shrink-0 block"
          aria-label={`View details for ${booking.serviceName}`}
        >
          {imgError ? (
            <div className="w-full h-32 sm:h-full bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
              <CalendarDays size={32} className="text-primary/30" />
            </div>
          ) : (
            <img
              src={booking.serviceImage}
              alt={booking.serviceName}
              className="w-full h-32 sm:h-full object-cover"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          )}
        </Link>

        <div className="flex-1 p-4 min-w-0">
          <Link
            to={`/customer-dashboard/bookings/${booking.id}`}
            className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded"
            aria-label={`View details for ${booking.serviceName}`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[11px] font-mono text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                    {booking.id}
                  </span>
                  <BookingStatusBadge status={booking.status} />
                </div>
                <h3 className="text-base font-heading font-semibold text-secondary truncate">
                  {booking.serviceName}
                </h3>
                <p className="text-sm text-gray-500">{booking.providerName}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-lg font-heading font-bold text-primary">
                  ₹{booking.price?.toLocaleString()}
                </p>
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                  booking.paymentStatus === 'paid' ? 'bg-success/10 text-success' :
                  booking.paymentStatus === 'refunded' ? 'bg-warning/10 text-warning' :
                  'bg-gray-100 text-gray-500'
                }`}>
                  {booking.paymentStatus === 'paid' ? 'Paid' :
                   booking.paymentStatus === 'refunded' ? 'Refunded' : 'Unpaid'}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-500 mt-2">
              <span className="flex items-center gap-1">
                <CalendarDays size={13} className="text-gray-400" aria-hidden="true" />
                {booking.bookingDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={13} className="text-gray-400" aria-hidden="true" />
                {booking.timeSlot}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={13} className="text-gray-400" aria-hidden="true" />
                {booking.location}
              </span>
            </div>
          </Link>

          <div className="mt-3 pt-3 border-t border-gray-50">
            <BookingActions
              booking={booking}
              onCancel={onCancel}
              onReschedule={onReschedule}
            />
          </div>

          <BookingTimeline timeline={booking.timeline} status={booking.status} />
        </div>
      </div>
    </motion.div>
  )
}

export default memo(BookingCard)
