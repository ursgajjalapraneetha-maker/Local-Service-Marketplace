import { memo } from 'react'
import { Clock, CalendarCheck, ShieldCheck } from 'lucide-react'

function BookingSummary({ price, oldPrice, discount, duration, availability }) {
  return (
    <div className="space-y-4">
      <div>
        <span className="text-xs text-gray-400">Starting from</span>
        <div className="flex items-end gap-2">
          <p className="text-2xl font-heading font-bold text-primary">
            ₹{price.toLocaleString()}
          </p>
          {oldPrice && oldPrice !== price && (
            <>
              <p className="text-sm text-gray-300 line-through mb-1">
                ₹{oldPrice.toLocaleString()}
              </p>
              {discount && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold text-success bg-success/10 rounded ml-auto">
                  Save {discount}%
                </span>
              )}
            </>
          )}
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-gray-400" />
          <span>Duration: {duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarCheck size={14} className="text-gray-400" />
          <span>Available: {availability}</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-success" />
          <span className="text-success font-medium">Service guaranteed</span>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-primary-dark transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30">
          Book Now
        </button>
        <button className="flex-1 px-4 py-2.5 text-sm font-medium text-secondary border border-gray-200 rounded-xl hover:bg-gray-50 transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300">
          View Details
        </button>
      </div>
    </div>
  )
}

export default memo(BookingSummary)
