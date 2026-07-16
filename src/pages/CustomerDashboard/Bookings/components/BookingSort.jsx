import { memo } from 'react'
import { ArrowUpDown } from 'lucide-react'

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'name', label: 'Service Name' },
  { value: 'date', label: 'Booking Date' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'price_low', label: 'Price: Low to High' },
]

function BookingSort({ value, onChange }) {
  return (
    <div className="relative">
      <ArrowUpDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden="true" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-xs bg-gray-100 border-0 rounded-lg pl-8 pr-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer appearance-none"
        aria-label="Sort bookings"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}

export default memo(BookingSort)
