import { memo, useCallback } from 'react'
import { RotateCcw } from 'lucide-react'

const CATEGORY_OPTIONS = [
  { value: '', label: 'All Categories' },
  { value: 'Home Cleaning', label: 'Cleaning' },
  { value: 'Electrical', label: 'Electrical' },
  { value: 'Plumbing', label: 'Plumbing' },
  { value: 'Painting', label: 'Painting' },
  { value: 'Salon', label: 'Salon' },
  { value: 'AC Repair', label: 'AC Repair' },
  { value: 'Appliance Repair', label: 'Appliance Repair' },
  { value: 'Home Maintenance', label: 'Home Maintenance' },
]

const AVAILABILITY_OPTIONS = [
  { value: '', label: 'All Availability' },
  { value: 'Today', label: 'Today' },
  { value: 'Tomorrow', label: 'Tomorrow' },
  { value: 'This Week', label: 'This Week' },
]

const PRICE_OPTIONS = [
  { value: '', label: 'All Prices' },
  { value: 'under500', label: 'Under ₹500' },
  { value: '500to2000', label: '₹500 - ₹2,000' },
  { value: '2000to5000', label: '₹2,000 - ₹5,000' },
  { value: 'above5000', label: 'Above ₹5,000' },
]

function WishlistFilters({
  categoryFilter,
  availabilityFilter,
  priceFilter,
  onCategoryChange,
  onAvailabilityChange,
  onPriceChange,
  onReset,
}) {
  const hasFilters = categoryFilter || availabilityFilter || priceFilter

  const handleCategoryChange = useCallback((e) => onCategoryChange(e.target.value), [onCategoryChange])
  const handleAvailabilityChange = useCallback((e) => onAvailabilityChange(e.target.value), [onAvailabilityChange])
  const handlePriceChange = useCallback((e) => onPriceChange(e.target.value), [onPriceChange])

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={categoryFilter}
        onChange={handleCategoryChange}
        className="text-xs bg-gray-100 border-0 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
        aria-label="Filter by category"
      >
        {CATEGORY_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      <select
        value={availabilityFilter}
        onChange={handleAvailabilityChange}
        className="text-xs bg-gray-100 border-0 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
        aria-label="Filter by availability"
      >
        {AVAILABILITY_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      <select
        value={priceFilter}
        onChange={handlePriceChange}
        className="text-xs bg-gray-100 border-0 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
        aria-label="Filter by price range"
      >
        {PRICE_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      {hasFilters && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-danger px-2 py-2 rounded-lg hover:bg-danger/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-label="Reset filters"
        >
          <RotateCcw size={12} />
          Reset
        </button>
      )}
    </div>
  )
}

export default memo(WishlistFilters)
