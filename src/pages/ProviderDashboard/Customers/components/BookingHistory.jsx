import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CalendarDays, IndianRupee, Eye } from 'lucide-react'
import { cn, formatCurrency } from '../../../../utils'
import { providerBookings } from '../../data/bookingsData'

const STATUS_STYLES = {
  pending: 'bg-amber-50 text-amber-600',
  accepted: 'bg-blue-50 text-blue-600',
  scheduled: 'bg-indigo-50 text-indigo-600',
  'in-progress': 'bg-purple-50 text-purple-600',
  completed: 'bg-green-50 text-green-600',
  cancelled: 'bg-red-50 text-red-600',
}

function BookingHistory({ customerName }) {
  const navigate = useNavigate()
  const bookings = providerBookings.filter((b) => b.customer.name === customerName)

  if (bookings.length === 0) {
    return (
      <div className="py-8 text-center">
        <CalendarDays size={24} className="text-gray-200 mx-auto mb-2" aria-hidden="true" />
        <p className="text-sm text-gray-400">No booking history yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {bookings.map((booking, i) => (
        <motion.div
          key={booking.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, delay: 0.03 * i }}
          className="flex items-center justify-between p-3 rounded-lg border border-gray-50 hover:bg-gray-50/50 transition-colors"
        >
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
              <span className="text-xs font-semibold text-gray-500">{booking.service.name.charAt(0)}</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-secondary truncate">{booking.service.name}</p>
              <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                <span className="flex items-center gap-1">
                  <CalendarDays size={11} aria-hidden="true" />
                  {booking.date}
                </span>
                <span className="flex items-center gap-1">
                  <IndianRupee size={11} aria-hidden="true" />
                  {formatCurrency(booking.amount)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-3">
            <span className={cn(
              'text-[10px] font-semibold px-1.5 py-0.5 rounded-full capitalize',
              STATUS_STYLES[booking.bookingStatus]
            )}>
              {booking.bookingStatus === 'in-progress' ? 'In Progress' : booking.bookingStatus}
            </span>
            <button
              onClick={() => navigate(`/provider-dashboard/bookings/${booking.id}`)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              aria-label={`View booking ${booking.id}`}
            >
              <Eye size={14} />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default memo(BookingHistory)
