import { memo, useCallback } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '../../../../utils'

const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]

const DATE_OPTIONS = [
  { value: 'all', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
]

function BookingFilters({ filters, onFilterChange }) {
  const handleSearch = useCallback((e) => {
    onFilterChange({ ...filters, search: e.target.value })
  }, [filters, onFilterChange])

  const handleStatus = useCallback((e) => {
    onFilterChange({ ...filters, status: e.target.value })
  }, [filters, onFilterChange])

  const handleDate = useCallback((value) => {
    onFilterChange({ ...filters, dateRange: value })
  }, [filters, onFilterChange])

  const handleClear = useCallback(() => {
    onFilterChange({ search: '', status: 'all', dateRange: 'all' })
  }, [onFilterChange])

  const hasActive = filters.search || filters.status !== 'all' || filters.dateRange !== 'all'

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-wrap">
      <div className="relative flex-1 w-full sm:max-w-xs">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden="true" />
        <input
          type="text"
          placeholder="Search by customer, service, or ID..."
          value={filters.search}
          onChange={handleSearch}
          className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg text-secondary placeholder-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus:border-primary transition-colors"
          aria-label="Search bookings"
        />
      </div>

      <div className="flex items-center gap-2">
        <select
          value={filters.status}
          onChange={handleStatus}
          className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus:border-primary transition-colors"
          aria-label="Filter by status"
        >
          {STATUS_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        <div className="flex bg-white border border-gray-200 rounded-lg p-0.5" role="group" aria-label="Filter by date">
          {DATE_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => handleDate(value)}
              className={cn(
                'px-2.5 py-1.5 text-xs font-semibold rounded-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
                filters.dateRange === value
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-500 hover:text-secondary'
              )}
              aria-pressed={filters.dateRange === value}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {hasActive && (
        <button
          onClick={handleClear}
          className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-gray-500 hover:text-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded-lg"
          aria-label="Clear filters"
        >
          <X size={14} />
          Clear
        </button>
      )}
    </div>
  )
}

export default memo(BookingFilters)
