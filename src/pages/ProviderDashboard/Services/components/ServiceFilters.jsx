import { memo, useCallback } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { serviceCategories } from '../../data/servicesData'
import { cn } from '../../../../utils'

const STATUS_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]

function ServiceFilters({ filters, onFilterChange }) {
  const handleSearch = useCallback((e) => {
    onFilterChange({ ...filters, search: e.target.value })
  }, [filters, onFilterChange])

  const handleCategory = useCallback((e) => {
    onFilterChange({ ...filters, category: e.target.value })
  }, [filters, onFilterChange])

  const handleStatus = useCallback((value) => {
    onFilterChange({ ...filters, status: value })
  }, [filters, onFilterChange])

  const handleClear = useCallback(() => {
    onFilterChange({ search: '', category: 'all', status: 'all' })
  }, [onFilterChange])

  const hasActiveFilters = filters.search || filters.category !== 'all' || filters.status !== 'all'

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <div className="relative flex-1 w-full sm:max-w-xs">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden="true" />
        <input
          type="text"
          placeholder="Search services..."
          value={filters.search}
          onChange={handleSearch}
          className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg text-secondary placeholder-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus:border-primary transition-colors"
          aria-label="Search services"
        />
      </div>

      <select
        value={filters.category}
        onChange={handleCategory}
        className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus:border-primary transition-colors"
        aria-label="Filter by category"
      >
        <option value="all">All Categories</option>
        {serviceCategories.map((cat) => (
          <option key={cat.id} value={cat.name}>{cat.name}</option>
        ))}
      </select>

      <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-0.5" role="group" aria-label="Filter by status">
        {STATUS_FILTERS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => handleStatus(value)}
            className={cn(
              'px-3 py-1.5 text-xs font-semibold rounded-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
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

      {hasActiveFilters && (
        <button
          onClick={handleClear}
          className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-gray-500 hover:text-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded-lg"
          aria-label="Clear all filters"
        >
          <X size={14} />
          Clear
        </button>
      )}
    </div>
  )
}

export default memo(ServiceFilters)
