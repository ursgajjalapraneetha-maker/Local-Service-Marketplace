import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { CalendarCheck, MapPin, Clock, Check, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { upcomingBookings } from '../data/dashboardData'
import { cn } from '../../../utils'

const STATUS_STYLES = {
  confirmed: 'bg-blue-50 text-blue-700',
  pending: 'bg-amber-50 text-amber-700',
  completed: 'bg-green-50 text-green-700',
  cancelled: 'bg-red-50 text-red-700',
}

function UpcomingBookings() {
  const handleAccept = useCallback((id) => {
    toast.success(`Booking ${id} accepted`)
  }, [])

  const handleReject = useCallback((id) => {
    toast.error(`Booking ${id} rejected`)
  }, [])

  const handleViewDetails = useCallback((id) => {
    toast(`Viewing details for ${id}`, { icon: '📋' })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="bg-white rounded-xl border border-gray-100 p-5"
      role="region"
      aria-label="Upcoming bookings"
    >
      <div className="flex items-center gap-2 mb-4">
        <CalendarCheck size={18} className="text-primary" aria-hidden="true" />
        <h2 className="text-base font-heading font-semibold text-secondary">Upcoming Bookings</h2>
      </div>

      {upcomingBookings.length === 0 ? (
        <div className="py-8 text-center">
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <CalendarCheck size={22} className="text-gray-300" />
          </div>
          <p className="text-sm font-medium text-secondary">No upcoming bookings</p>
          <p className="text-xs text-gray-400 mt-1">New bookings will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {upcomingBookings.map((booking) => (
            <div
              key={booking.id}
              className="group p-3 rounded-lg border border-gray-50 hover:border-primary/20 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                    <span className="text-xs font-semibold text-gray-500">
                      {booking.customer.charAt(0)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-secondary truncate">
                      {booking.customer}
                    </p>
                    <p className="text-xs text-gray-500">{booking.service}</p>
                  </div>
                </div>
                <span
                  className={cn(
                    'text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 capitalize',
                    STATUS_STYLES[booking.status]
                  )}
                >
                  {booking.status}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-gray-400 ml-12">
                <span className="flex items-center gap-1">
                  <Clock size={11} aria-hidden="true" />
                  {booking.date} at {booking.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={11} aria-hidden="true" />
                  {booking.location}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-2 ml-12">
                <button
                  onClick={() => handleViewDetails(booking.id)}
                  className="text-[11px] font-semibold text-primary hover:text-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded px-2 py-1"
                  aria-label={`View details for ${booking.customer}`}
                >
                  View Details
                </button>
                {booking.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleAccept(booking.id)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-600 bg-green-50 hover:bg-green-100 px-2 py-1 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/30"
                      aria-label={`Accept booking from ${booking.customer}`}
                    >
                      <Check size={11} />
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(booking.id)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-2 py-1 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/30"
                      aria-label={`Reject booking from ${booking.customer}`}
                    >
                      <X size={11} />
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default memo(UpcomingBookings)
