import { memo } from 'react'
import BookingSearch from './BookingSearch'
import BookingFilters from './BookingFilters'
import BookingSort from './BookingSort'

function BookingToolbar({
  searchQuery,
  onSearchChange,
  statusFilter,
  dateFilter,
  categoryFilter,
  onStatusChange,
  onDateChange,
  onCategoryChange,
  onResetFilters,
  sortValue,
  onSortChange,
  resultsCount,
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <BookingSearch value={searchQuery} onChange={onSearchChange} />
        <BookingSort value={sortValue} onChange={onSortChange} />
        <div className="text-xs text-gray-400 ml-auto whitespace-nowrap">
          <span className="font-semibold text-secondary">{resultsCount}</span> booking{resultsCount !== 1 ? 's' : ''} found
        </div>
      </div>
      <BookingFilters
        statusFilter={statusFilter}
        dateFilter={dateFilter}
        categoryFilter={categoryFilter}
        onStatusChange={onStatusChange}
        onDateChange={onDateChange}
        onCategoryChange={onCategoryChange}
        onReset={onResetFilters}
      />
    </div>
  )
}

export default memo(BookingToolbar)
