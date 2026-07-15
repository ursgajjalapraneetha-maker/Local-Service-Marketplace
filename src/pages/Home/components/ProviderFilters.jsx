import { motion } from 'framer-motion'
import { filterCategories } from '../data/providers'

export default function ProviderFilters({ activeFilter, onFilterChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="flex flex-wrap items-center justify-center gap-2 mb-10"
      role="tablist"
      aria-label="Filter professionals by category"
    >
      {filterCategories.map((cat) => {
        const isActive = activeFilter === cat
        return (
          <button
            key={cat}
            onClick={() => onFilterChange(cat)}
            role="tab"
            aria-selected={isActive}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
              isActive
                ? 'bg-primary text-white shadow-md shadow-primary/20'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-primary/30 hover:text-primary'
            }`}
          >
            {cat}
          </button>
        )
      })}
    </motion.div>
  )
}
