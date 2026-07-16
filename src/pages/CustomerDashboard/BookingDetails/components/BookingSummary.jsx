import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BookingStatusBadge from '../../Bookings/components/BookingStatusBadge'

const STATUS_STYLES = {
  pending: 'bg-warning/10 text-warning border-warning/20',
  confirmed: 'bg-primary/5 text-primary border-primary/15',
  in_progress: 'bg-blue-100 text-blue-600 border-blue-200',
  completed: 'bg-success/10 text-success border-success/20',
  cancelled: 'bg-danger/10 text-danger border-danger/20',
  rejected: 'bg-red-100 text-red-600 border-red-200',
}

function BookingSummary({ booking, service }) {
  const navigate = useNavigate()

  const statusStyle = useMemo(() => STATUS_STYLES[booking?.status] || 'bg-gray-100 text-gray-500 border-gray-200', [booking?.status])

  if (!booking || !service) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start gap-3">
          <button
            onClick={() => navigate('/customer-dashboard/bookings')}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Back to bookings"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {service.name || 'Booking Details'}
              </h1>
              <BookingStatusBadge status={booking.status} />
            </div>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
              <span className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                {booking.id}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {booking.bookingDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {booking.scheduledTime}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${statusStyle}`}>
            <span className={`w-2 h-2 rounded-full ${
              booking.status === 'pending' ? 'bg-warning' :
              booking.status === 'confirmed' ? 'bg-primary' :
              booking.status === 'in_progress' ? 'bg-blue-500' :
              booking.status === 'completed' ? 'bg-success' :
              'bg-danger'
            }`} />
            <span className="capitalize font-medium">{booking.status?.replace('_', ' ')}</span>
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default memo(BookingSummary)
