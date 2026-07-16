import { memo } from 'react'
import NotificationSearch from './NotificationSearch'
import NotificationFilters from './NotificationFilters'

function NotificationToolbar({
  searchQuery,
  onSearchChange,
  typeFilter,
  sortValue,
  onTypeChange,
  onSortChange,
  onResetFilters,
  resultsCount,
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <NotificationSearch value={searchQuery} onChange={onSearchChange} />
        <div className="text-xs text-gray-400 ml-auto whitespace-nowrap">
          <span className="font-semibold text-secondary">{resultsCount}</span> notification{resultsCount !== 1 ? 's' : ''} found
        </div>
      </div>
      <NotificationFilters
        typeFilter={typeFilter}
        sortValue={sortValue}
        onTypeChange={onTypeChange}
        onSortChange={onSortChange}
        onReset={onResetFilters}
      />
    </div>
  )
}

export default memo(NotificationToolbar)
