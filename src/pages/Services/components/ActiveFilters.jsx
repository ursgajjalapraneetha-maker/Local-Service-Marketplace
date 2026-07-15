import { AnimatePresence, motion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import FilterChip from './FilterChip'

export default function ActiveFilters({ filters, onClearAll }) {
  if (!filters || filters.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center gap-2 py-3"
    >
      <span className="text-xs text-gray-400 font-medium mr-1">Filters:</span>
      <AnimatePresence>
        {filters.map((filter) => (
          <FilterChip key={filter.key} label={filter.label} onRemove={filter.onRemove} />
        ))}
      </AnimatePresence>
      <button
        onClick={onClearAll}
        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-400 hover:text-danger transition-colors"
        aria-label="Clear all filters"
      >
        <RotateCcw size={12} />
        Clear all
      </button>
    </motion.div>
  )
}
