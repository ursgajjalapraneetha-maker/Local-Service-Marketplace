import { memo } from 'react'
import WishlistSearch from './WishlistSearch'
import WishlistFilters from './WishlistFilters'
import WishlistSort from './WishlistSort'

function WishlistToolbar({
  searchQuery,
  onSearchChange,
  categoryFilter,
  availabilityFilter,
  priceFilter,
  onCategoryChange,
  onAvailabilityChange,
  onPriceChange,
  onResetFilters,
  sortValue,
  onSortChange,
  resultsCount,
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <WishlistSearch value={searchQuery} onChange={onSearchChange} />
        <WishlistSort value={sortValue} onChange={onSortChange} />
        <div className="text-xs text-gray-400 ml-auto whitespace-nowrap">
          <span className="font-semibold text-secondary">{resultsCount}</span> service{resultsCount !== 1 ? 's' : ''} saved
        </div>
      </div>
      <WishlistFilters
        categoryFilter={categoryFilter}
        availabilityFilter={availabilityFilter}
        priceFilter={priceFilter}
        onCategoryChange={onCategoryChange}
        onAvailabilityChange={onAvailabilityChange}
        onPriceChange={onPriceChange}
        onReset={onResetFilters}
      />
    </div>
  )
}

export default memo(WishlistToolbar)
