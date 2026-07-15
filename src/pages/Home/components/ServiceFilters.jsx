/**
 * ServiceFilters Component
 *
 * Horizontal row of category filter chips for services.
 *
 * Props:
 * @param {string} activeFilter - Currently active filter
 * @param {function} onFilterChange - Filter change handler
 */
import { motion } from 'framer-motion'
import { serviceFilters } from '../data/services'

export default function ServiceFilters({ activeFilter, onFilterChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="flex flex-wrap items-center gap-2"
      role="tablist"
      aria-label="Filter services by category"
    >
      {serviceFilters.map((cat) => {
        const isActive = activeFilter === cat
        return (
          <button
            key={cat}
            onClick={() => onFilterChange(cat)}
            role="tab"
            aria-selected={isActive}
            className={`px-3.5 py-2 text-sm font-medium rounded-xl whitespace-nowrap transition-all ${
              isActive
                ? 'bg-primary text-white shadow-sm shadow-primary/20'
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
