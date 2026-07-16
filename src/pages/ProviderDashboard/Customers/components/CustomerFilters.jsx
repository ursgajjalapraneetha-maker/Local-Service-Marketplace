import { memo, useCallback } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '../../../../utils'

const SORT_OPTIONS = [
  { value: 'name', label: 'Name' },
  { value: 'newest', label: 'Newest' },
  { value: 'bookings', label: 'Most Bookings' },
  { value: 'spent', label: 'Highest Spent' },
]

function CustomerFilters({ filters, onFilterChange }) {
  const handleSearch = useCallback((e) => {
    onFilterChange({ ...filters, search: e.target.value })
  }, [filters, onFilterChange])

  const handleSort = useCallback((e) => {
    onFilterChange({ ...filters, sort: e.target.value })
  }, [filters, onFilterChange])

  const handleStatusFilter = useCallback((value) => {
    onFilterChange({ ...filters, status: value })
  }, [filters, onFilterChange])

  const handleClear = useCallback(() => {
    onFilterChange({ search: '', sort: 'name', status: 'all' })
  }, [onFilterChange])

  const hasActive = filters.search || filters.status !== 'all'

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-wrap">
      <div className="relative flex-1 w-full sm:max-w-xs">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden="true" />
        <input
          type="text"
          placeholder="Search customers..."
          value={filters.search}
          onChange={handleSearch}
          className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg text-secondary placeholder-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus:border-primary transition-colors"
          aria-label="Search customers"
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="flex bg-white border border-gray-200 rounded-lg p-0.5" role="group" aria-label="Filter customers">
          {[
            { value: 'all', label: 'All' },
            { value: 'returning', label: 'Returning' },
            { value: 'new', label: 'New' },
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => handleStatusFilter(value)}
              className={cn(
                'px-2.5 py-1.5 text-xs font-semibold rounded-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
                filters.status === value
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-500 hover:text-secondary'
              )}
              aria-pressed={filters.status === value}
            >
              {label}
            </button>
          ))}
        </div>

        <select
          value={filters.sort}
          onChange={handleSort}
          className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus:border-primary transition-colors"
          aria-label="Sort customers"
        >
          {SORT_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
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

export default memo(CustomerFilters)
