import { memo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Eye, RotateCcw } from 'lucide-react'

const STATUS_STYLES = {
  confirmed: 'bg-success/10 text-success',
  pending: 'bg-warning/10 text-warning',
  completed: 'bg-primary/5 text-primary',
  cancelled: 'bg-danger/10 text-danger',
}

const STATUS_LABELS = {
  confirmed: 'Confirmed',
  pending: 'Pending',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

function BookingCard({ booking, index }) {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.08 * index }}
      className="flex items-start gap-4 bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow"
    >
      <img
        src={booking.image}
        alt={booking.service}
        className="w-16 h-16 rounded-lg object-cover shrink-0"
        loading="lazy"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="text-sm font-semibold text-secondary truncate">{booking.service}</h4>
            <p className="text-xs text-gray-500 mt-0.5">{booking.provider}</p>
          </div>
          <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLES[booking.status]}`}>
            {STATUS_LABELS[booking.status]}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-2 text-[11px] text-gray-400">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {booking.date}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {booking.time}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={() => navigate(`/customer-dashboard/bookings/${booking.id}`)}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary text-white text-[11px] font-semibold rounded-lg hover:bg-primary-dark transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            aria-label={`View details for ${booking.service}`}
          >
            <Eye size={12} />
            View Details
          </button>
          <button
            className="inline-flex items-center gap-1 px-3 py-1.5 text-[11px] font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            aria-label={`Book ${booking.service} again`}
          >
            <RotateCcw size={12} />
            Book Again
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default memo(BookingCard)
