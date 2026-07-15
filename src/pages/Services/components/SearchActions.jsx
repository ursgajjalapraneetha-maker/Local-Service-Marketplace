import { Search, RotateCcw } from 'lucide-react'

export default function SearchActions({ onSearch, onClear, hasActiveFilters }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="submit"
        onClick={onSearch}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-all active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-primary/30"
        aria-label="Search services"
      >
        <Search size={16} />
        <span className="hidden sm:inline">Search</span>
      </button>
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-secondary transition-all active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-label="Clear all filters"
        >
          <RotateCcw size={15} />
          <span className="hidden sm:inline">Clear</span>
        </button>
      )}
    </div>
  )
}
