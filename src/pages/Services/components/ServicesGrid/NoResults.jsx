import { memo } from 'react'
import { SearchX, RotateCcw } from 'lucide-react'

function NoResults({ onReset }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 rounded-2xl bg-white border border-dashed border-gray-200">
      <div className="relative mb-6">
        <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center">
          <SearchX size={40} className="text-primary/30" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-warning/10 rounded-full flex items-center justify-center">
          <span className="text-warning text-xs font-bold">!</span>
        </div>
      </div>
      <h3 className="text-xl font-heading font-semibold text-secondary">
        No Services Found
      </h3>
      <p className="mt-1.5 text-sm text-gray-500 text-center max-w-md">
        We couldn&apos;t find any services matching your criteria. Try adjusting
        your search or filters to discover more options.
      </p>
      <button
        onClick={onReset}
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        aria-label="Reset all filters"
      >
        <RotateCcw size={15} />
        Reset Filters
      </button>
    </div>
  )
}

export default memo(NoResults)
