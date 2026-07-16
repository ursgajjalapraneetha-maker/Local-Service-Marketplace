import { memo, useCallback } from 'react'
import { RotateCcw } from 'lucide-react'

const STATUS_OPTIONS = [
  { value: '', label: 'All Status' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'pending', label: 'Pending' },
]

const DATE_OPTIONS = [
  { value: '', label: 'All Dates' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
]

const CATEGORY_OPTIONS = [
  { value: '', label: 'All Categories' },
  { value: 'Home Cleaning', label: 'Cleaning' },
  { value: 'Electrical', label: 'Electrical' },
  { value: 'Plumbing', label: 'Plumbing' },
  { value: 'Painting', label: 'Painting' },
  { value: 'AC Repair', label: 'AC Repair' },
]

function BookingFilters({ statusFilter, dateFilter, categoryFilter, onStatusChange, onDateChange, onCategoryChange, onReset }) {
  const hasFilters = statusFilter || dateFilter || categoryFilter

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="text-xs bg-gray-100 border-0 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
        aria-label="Filter by status"
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      <select
        value={dateFilter}
        onChange={(e) => onDateChange(e.target.value)}
        className="text-xs bg-gray-100 border-0 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
        aria-label="Filter by date"
      >
        {DATE_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      <select
        value={categoryFilter}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="text-xs bg-gray-100 border-0 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
        aria-label="Filter by category"
      >
        {CATEGORY_OPTIONS.map((opt) => (
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

export default memo(BookingFilters)
