import { memo } from 'react'
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react'
import ResultsInfo from './ResultsInfo'
import GridViewToggle from './GridViewToggle'

function GridToolbar({
  totalCount,
  viewMode,
  onViewModeChange,
  searchTerm,
  selectedCategory,
  sortOptionLabel,
  sortOption,
  sortOptions,
  onSortChange,
}) {
  return (
    <div className="flex flex-col gap-3 mb-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <ResultsInfo count={totalCount} />
        <div className="flex items-center gap-3">
          <GridViewToggle viewMode={viewMode} onChange={onViewModeChange} />
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap text-xs text-gray-500">
        {searchTerm && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/5 text-primary rounded-full font-medium">
            <Search size={11} />
            {searchTerm}
          </span>
        )}
        {selectedCategory && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/5 text-primary rounded-full font-medium">
            <SlidersHorizontal size={11} />
            {selectedCategory}
          </span>
        )}
        {sortOptionLabel && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full">
            <ArrowUpDown size={11} />
            {sortOptionLabel}
          </span>
        )}
        {!searchTerm && !selectedCategory && !sortOptionLabel && (
          <span className="text-gray-400">All services</span>
        )}

        <div className="ml-auto hidden sm:block">
          <label htmlFor="grid-sort-select" className="sr-only">
            Sort by
          </label>
          <div className="flex items-center gap-1.5">
            <ArrowUpDown size={13} className="text-gray-400 shrink-0" />
            <select
              id="grid-sort-select"
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value)}
              className="text-xs text-secondary bg-transparent border-0 cursor-pointer focus:outline-none focus:ring-0 pr-5 appearance-none"
              aria-label="Sort services"
            >
              <option value="">Default</option>
              {sortOptions?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(GridToolbar)
