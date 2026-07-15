import { useState } from 'react'
import { motion } from 'framer-motion'
import { SearchX, RotateCcw } from 'lucide-react'
import useServiceSearch from './hooks/useServiceSearch'
import useServiceFilters from './hooks/useServiceFilters'
import { popularServices } from './data/services'
import Breadcrumb from './components/Breadcrumb'
import ServicesHeader from './components/ServicesHeader'
import SearchSection from './components/SearchSection'
import ActiveFilters from './components/ActiveFilters'
import FilterSidebar from './components/FilterSidebar'
import FilterDrawer from './components/FilterDrawer'
import SortDropdown from './components/SortDropdown'
import PageIntro from './components/PageIntro'

export default function Services() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const searchState = useServiceSearch(popularServices)
  const filterState = useServiceFilters(searchState.filteredServices)

  const finalServices = filterState.filteredServices
  const noResults = finalServices.length === 0 && (searchState.hasActiveFilters || filterState.hasActiveFilters)

  const handleClearAll = () => {
    searchState.handleClear()
    filterState.clearFilters()
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumb items={[{ label: 'Services' }]} />
      </div>

      <ServicesHeader />

      <SearchSection
        externalState={searchState}
        totalCount={finalServices.length}
        suppressEmptyState
        onClearAll={handleClearAll}
      />

      {/* Active Filters */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ActiveFilters
            filters={filterState.activeFilters}
            onClearAll={filterState.clearFilters}
          />
        </div>
      </section>

      {/* Main content area */}
      <section className="py-10 lg:py-14 bg-[#F8FAFC] min-h-[400px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 lg:gap-10">
            {/* Sidebar filters */}
            <FilterSidebar
              filters={filterState}
              onMobileOpen={() => setIsFilterOpen(true)}
            />

            {/* Results area */}
            <main className="flex-1 min-w-0">
              {noResults ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-20 px-4 rounded-2xl bg-white border border-dashed border-gray-200"
                >
                  <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-4">
                    <SearchX size={32} className="text-primary/40" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-secondary">No Services Found</h3>
                  <p className="mt-1.5 text-sm text-gray-500 text-center max-w-md">
                    Try adjusting your filters to discover more services.
                  </p>
                  <button
                    onClick={handleClearAll}
                    className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-all active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-primary/30"
                    aria-label="Reset all filters"
                  >
                    <RotateCcw size={15} />
                    Reset Filters
                  </button>
                </motion.div>
              ) : (
                <div>
                  {/* Sort bar */}
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-sm text-gray-500">
                      Showing{' '}
                      <span className="font-medium text-secondary">{finalServices.length}</span>{' '}
                      {finalServices.length === 1 ? 'result' : 'results'}
                    </p>
                    <div className="hidden sm:block">
                      <SortDropdown
                        sortOption={filterState.sortOption}
                        options={filterState.SORT_OPTIONS}
                        onChange={filterState.setSort}
                      />
                    </div>
                  </div>

                  {/* Cards grid placeholder */}
                  <div className="min-h-[300px] rounded-2xl border-2 border-dashed border-gray-200 bg-white flex items-center justify-center">
                    <p className="text-sm text-gray-400">Service cards will appear here</p>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* Mobile filter drawer */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filterState}
      />

      <PageIntro />
    </>
  )
}
