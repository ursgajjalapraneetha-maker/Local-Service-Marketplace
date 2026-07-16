import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Eye, Star, MapPin, Phone, IndianRupee, CalendarDays } from 'lucide-react'
import { cn, formatCurrency } from '../../../../utils'

function CustomerCard({ customer, index }) {
  const navigate = useNavigate()

  const handleView = useCallback(() => {
    navigate(`/provider-dashboard/customers/${customer.id}`)
  }, [navigate, customer.id])

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
          <div className="w-11 h-11 rounded-full bg-primary/5 flex items-center justify-center shrink-0 ring-2 ring-primary/10">
            <span className="text-sm font-bold text-primary">{customer.name.charAt(0)}</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-secondary truncate">{customer.name}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={11} className="text-gray-400 shrink-0" aria-hidden="true" />
              <span className="text-xs text-gray-500 truncate">{customer.location}</span>
            </div>
          </div>
        </div>
        {customer.rating > 0 && (
          <div className="flex items-center gap-0.5 shrink-0">
            <Star size={12} className="text-amber-400 fill-amber-400" aria-hidden="true" />
            <span className="text-xs font-semibold text-secondary">{customer.rating}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3 py-3 border-y border-gray-50">
        <div className="text-center">
          <p className="text-sm font-heading font-bold text-secondary">{customer.totalBookings}</p>
          <p className="text-[10px] text-gray-400">Bookings</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-heading font-bold text-secondary">{customer.completedBookings}</p>
          <p className="text-[10px] text-gray-400">Completed</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-heading font-bold text-secondary">{formatCurrency(customer.totalSpent)}</p>
          <p className="text-[10px] text-gray-400">Spent</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <CalendarDays size={12} aria-hidden="true" />
          {customer.lastService ? customer.lastService : 'No services yet'}
        </div>
        <div className="flex items-center gap-1">
          <span className={cn(
            'text-[10px] font-semibold px-1.5 py-0.5 rounded-full',
            customer.status === 'returning' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
          )}>
            {customer.status === 'returning' ? 'Returning' : 'New'}
          </span>
          <button
            onClick={handleView}
            className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            aria-label={`View ${customer.name}`}
          >
            <Eye size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default memo(CustomerCard)
