import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import FilterSection from './FilterSection'
import CategoryFilter from './CategoryFilter'
import PriceRangeFilter from './PriceRangeFilter'
import RatingFilter from './RatingFilter'
import ExperienceFilter from './ExperienceFilter'
import AvailabilityFilter from './AvailabilityFilter'
import ProviderTypeFilter from './ProviderTypeFilter'

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const drawerVariants = {
  hidden: { x: '-100%' },
  visible: { x: 0, transition: { type: 'spring', damping: 28, stiffness: 300 } },
  exit: { x: '-100%', transition: { duration: 0.2, ease: 'easeInOut' } },
}

export default function FilterDrawer({ isOpen, onClose, filters }) {
  const {
    selectedCategories,
    priceRange,
    rating,
    experience,
    availability,
    providerType,
    hasActiveFilters,
    clearFilters,
    RATING_OPTIONS,
  } = filters

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.aside
            key="drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 left-0 bottom-0 w-[85vw] max-w-[360px] bg-white z-50 lg:hidden flex flex-col"
            aria-label="Filter drawer"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
              <h3 className="font-heading font-semibold text-secondary">Filters</h3>
              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-gray-400 hover:text-danger transition-colors px-2 py-1"
                    aria-label="Reset all filters"
                  >
                    Reset
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Close filters"
                >
                  <X size={18} className="text-gray-500" />
                </button>
              </div>
            </div>

            {/* Filter content */}
            <div className="flex-1 overflow-y-auto px-4 pb-6">
              <FilterSection title="Categories">
                <CategoryFilter selected={selectedCategories} onChange={filters.setCategory} />
              </FilterSection>

              <FilterSection title="Price Range">
                <PriceRangeFilter range={priceRange} onChange={filters.setPrice} />
              </FilterSection>

              <FilterSection title="Minimum Rating">
                <RatingFilter rating={rating} options={RATING_OPTIONS} onChange={filters.setRating} />
              </FilterSection>

              <FilterSection title="Experience">
                <ExperienceFilter selected={experience} onChange={filters.setExperience} />
              </FilterSection>

              <FilterSection title="Availability">
                <AvailabilityFilter selected={availability} onChange={filters.setAvailability} />
              </FilterSection>

              <FilterSection title="Provider Type">
                <ProviderTypeFilter selected={providerType} onChange={filters.setProviderType} />
              </FilterSection>
            </div>

            {/* Apply button */}
            <div className="px-5 py-4 border-t border-gray-100 shrink-0">
              <button
                onClick={onClose}
                className="w-full py-3 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all active:scale-[0.98]"
              >
                Show Results
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
