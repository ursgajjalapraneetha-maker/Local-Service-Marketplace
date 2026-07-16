import { memo } from 'react'
import { LayoutGrid, List } from 'lucide-react'

function GridViewToggle({ viewMode, onChange }) {
  return (
    <div
      className="flex items-center bg-gray-100 rounded-lg p-0.5 gap-0.5"
      role="radiogroup"
      aria-label="View mode"
    >
      <button
        onClick={() => onChange('grid')}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
          viewMode === 'grid'
            ? 'bg-white text-secondary shadow-sm'
            : 'text-gray-500 hover:text-secondary'
        }`}
        role="radio"
        aria-checked={viewMode === 'grid'}
        aria-label="Grid view"
      >
        <LayoutGrid size={14} />
        <span className="hidden sm:inline">Grid</span>
      </button>
      <button
        onClick={() => onChange('list')}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
          viewMode === 'list'
            ? 'bg-white text-secondary shadow-sm'
            : 'text-gray-500 hover:text-secondary'
        }`}
        role="radio"
        aria-checked={viewMode === 'list'}
        aria-label="List view"
      >
        <List size={14} />
        <span className="hidden sm:inline">List</span>
      </button>
    </div>
  )
}

export default memo(GridViewToggle)
