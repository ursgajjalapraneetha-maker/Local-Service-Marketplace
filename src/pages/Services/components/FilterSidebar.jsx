import { motion } from 'framer-motion'
import { SlidersHorizontal, RotateCcw } from 'lucide-react'
import FilterSection from './FilterSection'
import CategoryFilter from './CategoryFilter'
import PriceRangeFilter from './PriceRangeFilter'
import RatingFilter from './RatingFilter'
import ExperienceFilter from './ExperienceFilter'
import AvailabilityFilter from './AvailabilityFilter'
import ProviderTypeFilter from './ProviderTypeFilter'

export default function FilterSidebar({
  filters,
  onMobileOpen,
}) {
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

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={onMobileOpen}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-secondary hover:bg-gray-50 transition-colors"
          aria-label="Open filters"
        >
          <SlidersHorizontal size={16} />
          Filters
          {hasActiveFilters && (
            <span className="w-2 h-2 bg-primary rounded-full" />
          )}
        </button>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="ml-2 inline-flex items-center gap-1.5 px-3 py-2.5 text-sm text-gray-400 hover:text-danger transition-colors"
            aria-label="Clear all filters"
          >
            <RotateCcw size={14} />
            Clear
          </button>
        )}
      </div>

      {/* Desktop sidebar */}
      <aside
        className="hidden lg:block w-[300px] xl:w-[320px] shrink-0"
        aria-label="Service filters"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto bg-white rounded-2xl border border-gray-100 shadow-sm px-1"
        >
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-primary" />
              <h3 className="font-heading font-semibold text-secondary text-sm">Filters</h3>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-gray-400 hover:text-danger transition-colors"
                aria-label="Clear all filters"
              >
                Reset all
              </button>
            )}
          </div>

          <div className="px-3">
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
        </motion.div>
      </aside>
    </>
  )
}
