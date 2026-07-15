import { motion, AnimatePresence } from 'framer-motion'
import { SearchX, RotateCcw } from 'lucide-react'
import useServiceSearch from '../hooks/useServiceSearch'
import { popularServices } from '../data/services'
import SearchInput from './SearchInput'
import LocationInput from './LocationInput'
import CategorySelect from './CategorySelect'
import SearchActions from './SearchActions'

export default function SearchSection({ externalState, totalCount, suppressEmptyState, onClearAll }) {
  const internal = useServiceSearch(popularServices)

  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedLocation,
    setSelectedLocation,
    hasActiveFilters,
    handleSearch,
    handleClear,
  } = externalState || internal

  const clearAll = onClearAll || handleClear
  const resultsCount = totalCount ?? (externalState?.filteredServices || internal.filteredServices).length

  return (
    <section className="py-10 lg:py-14 bg-white border-b border-gray-100" aria-label="Search services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-3 lg:items-center">
            <SearchInput value={searchTerm} onChange={setSearchTerm} />
            <div className="flex flex-col sm:flex-row gap-3">
              <LocationInput value={selectedLocation} onChange={setSelectedLocation} />
              <CategorySelect value={selectedCategory} onChange={setSelectedCategory} />
            </div>
            <SearchActions
              onSearch={handleSearch}
              onClear={handleClear}
              hasActiveFilters={hasActiveFilters}
            />
          </form>

          {/* Results summary */}
          <div className="mt-4 flex items-center justify-between text-sm">
            <p className="text-gray-500">
              <span className="font-medium text-secondary">{resultsCount}</span>{' '}
              {resultsCount === 1 ? 'service' : 'services'} found
              {hasActiveFilters && (
                <button
                  onClick={clearAll}
                  className="ml-2 text-primary hover:text-primary-dark underline underline-offset-2 transition-colors"
                  aria-label="Clear all filters"
                >
                  Clear all
                </button>
              )}
            </p>
          </div>
        </motion.div>

        {/* Empty state */}
        <AnimatePresence mode="wait">
          {!suppressEmptyState && resultsCount === 0 && hasActiveFilters && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-8 flex flex-col items-center justify-center py-16 px-4 rounded-2xl bg-gray-50 border border-dashed border-gray-200"
            >
              <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center mb-4">
                <SearchX size={28} className="text-primary/40" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-secondary">
                No matching services found
              </h3>
              <p className="mt-1 text-sm text-gray-500 text-center max-w-sm">
                Try adjusting your search terms or clearing the filters to see all available services.
              </p>
              <button
                onClick={clearAll}
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-all active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-primary/30"
                aria-label="Reset filters"
              >
                <RotateCcw size={15} />
                Reset Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
