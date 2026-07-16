import { useState, lazy, Suspense, useMemo, useCallback } from 'react'
import useServices from '../../hooks/useServices'
import useNetworkStatus from '../../hooks/useNetworkStatus'
import useServiceSearch from './hooks/useServiceSearch'
import useServiceFilters from './hooks/useServiceFilters'
import useServicesGrid from './hooks/useServicesGrid'
import usePagination from './hooks/usePagination'
import useInfiniteScroll from './hooks/useInfiniteScroll'
import useQueryParams from './hooks/useQueryParams'
import useCompare from './hooks/useCompare'
import useQuickView from './hooks/useQuickView'
import useRecentlyViewed from './hooks/useRecentlyViewed'
import SEO from '../../components/common/SEO'
import ErrorBoundary from '../../components/common/ErrorBoundary'
import PageLoader from '../../components/common/PageLoader'
import Breadcrumb from './components/Breadcrumb'
import ServicesHeader from './components/ServicesHeader'
import SearchSection from './components/SearchSection'
import ActiveFilters from './components/ActiveFilters'
import FilterSidebar from './components/FilterSidebar'
import FilterDrawer from './components/FilterDrawer'
import PageIntro from './components/PageIntro'
import Pagination from './components/Pagination/Pagination'
import InfiniteLoader from './components/Pagination/InfiniteLoader'
import ResultsCounter from './components/Pagination/ResultsCounter'
import QuickViewModal from './components/QuickView/QuickViewModal'
import CompareBar from './components/CompareBar'
import RecentlyViewedDrawer from './components/RecentlyViewedDrawer'

const ServicesGrid = lazy(() => import('./components/ServicesGrid/ServicesGrid'))

function ServicesContent() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isRecentOpen, setIsRecentOpen] = useState(false)

  const { services, loading: servicesLoading } = useServices()
  const isOnline = useNetworkStatus()
  const compareState = useCompare()
  const quickViewState = useQuickView()
  const recentlyViewedState = useRecentlyViewed()

  const searchState = useServiceSearch(services)
  const filterState = useServiceFilters(searchState.filteredServices)

  const finalServices = filterState.filteredServices
  const gridState = useServicesGrid(finalServices)
  const paginationState = usePagination(finalServices)

  const infiniteScrollState = useInfiniteScroll({
    hasMore: paginationState.hasNextPage,
    onLoadMore: paginationState.nextPage,
    enabled: true,
  })

  useQueryParams({ searchState, filterState, gridState, paginationState })

  const handleClearAll = useCallback(() => {
    searchState.handleClear()
    filterState.clearFilters()
  }, [searchState, filterState])

  const handleQuickView = useCallback((service) => {
    quickViewState.open(service)
    if (service) {
      recentlyViewedState.add({
        id: service.id,
        title: service.title,
        category: service.category,
        price: service.price,
        image: service.image,
        rating: service.rating,
        slug: service.slug,
      })
    }
  }, [quickViewState, recentlyViewedState])

  const displayServices = useMemo(() => {
    if (!gridState.enrichedServices) return []
    return gridState.enrichedServices.slice(
      (paginationState.currentPage - 1) * paginationState.pageSize,
      paginationState.currentPage * paginationState.pageSize
    )
  }, [
    gridState.enrichedServices,
    paginationState.currentPage,
    paginationState.pageSize,
  ])

  const selectedService = quickViewState.selectedService

  return (
    <>
      <SEO
        title="Services"
        description="Browse trusted local service providers for home cleaning, plumbing, electrical, painting, and more. Compare and book online."
        keywords="local services, home services, cleaning, plumbing, electrical, painting, moving, beauty"
      />

      {!isOnline && (
        <div
          className="sticky top-16 lg:top-20 z-30 bg-amber-50 border-b border-amber-200 px-4 py-2.5 text-center"
          role="alert"
          aria-live="assertive"
        >
          <p className="text-sm font-medium text-amber-700">
            No Internet Connection — some features may be unavailable
          </p>
        </div>
      )}

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

      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ActiveFilters
            filters={filterState.activeFilters}
            onClearAll={filterState.clearFilters}
          />
        </div>
      </section>

      <section className="py-10 lg:py-14 bg-[#F8FAFC] min-h-[400px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 lg:gap-10">
            <FilterSidebar
              filters={filterState}
              onMobileOpen={() => setIsFilterOpen(true)}
            />

            <main className="flex-1 min-w-0">
              <ResultsCounter
                start={paginationState.startIndex}
                end={paginationState.endIndex}
                total={paginationState.totalServices}
              />

              <Suspense
                fallback={
                  <PageLoader fullScreen={false} text="Loading services..." />
                }
              >
                <ServicesGrid
                  services={displayServices}
                  loading={servicesLoading}
                  viewMode={gridState.viewMode}
                  onViewModeChange={gridState.setViewMode}
                  wishlist={gridState.wishlist}
                  onToggleWishlist={gridState.toggleWishlist}
                  compareList={compareState.items}
                  onToggleCompare={compareState.toggle}
                  onBookNow={gridState.handleBookNow}
                  onViewDetails={gridState.handleViewDetails}
                  onShare={gridState.handleShare}
                  onQuickView={handleQuickView}
                  searchTerm={searchState.searchTerm}
                  selectedCategory={searchState.selectedCategory}
                  sortOption={filterState.sortOption}
                  sortOptions={filterState.SORT_OPTIONS}
                  onSortChange={filterState.setSort}
                  onClearAll={handleClearAll}
                />
              </Suspense>

              {paginationState.totalPages > 1 && (
                <div className="mt-6">
                  <Pagination
                    currentPage={paginationState.currentPage}
                    totalPages={paginationState.totalPages}
                    onPageChange={paginationState.goToPage}
                    onNext={paginationState.nextPage}
                    onPrevious={paginationState.previousPage}
                    hasNext={paginationState.hasNextPage}
                    hasPrevious={paginationState.hasPreviousPage}
                    pageSize={paginationState.pageSize}
                    onPageSizeChange={paginationState.changePageSize}
                  />
                </div>
              )}

              <InfiniteLoader
                sentinelRef={infiniteScrollState.sentinelRef}
                loading={infiniteScrollState.isFetching}
                hasMore={paginationState.hasNextPage}
              />
            </main>
          </div>
        </div>
      </section>

      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filterState}
      />

      <QuickViewModal
        isOpen={quickViewState.isOpen}
        service={selectedService}
        onClose={quickViewState.close}
        isWishlisted={selectedService ? gridState.wishlist.includes(selectedService.id) : false}
        onToggleWishlist={gridState.toggleWishlist}
        isCompared={selectedService ? compareState.exists(selectedService.id) : false}
        onToggleCompare={compareState.toggle}
        onShare={gridState.handleShare}
        onBookNow={gridState.handleBookNow}
        onViewDetails={gridState.handleViewDetails}
      />

      <CompareBar
        items={compareState.items}
        onRemove={compareState.remove}
        onClear={compareState.clear}
        onCompare={() => {}}
        maxItems={compareState.MAX_COMPARE}
      />

      <button
        onClick={() => setIsRecentOpen(true)}
        className="fixed bottom-6 right-6 z-30 p-3 bg-white text-secondary rounded-full shadow-lg border border-gray-200 hover:border-primary/30 hover:text-primary transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        aria-label="Open recently viewed"
        title="Recently viewed"
      >
        <span className="relative">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {recentlyViewedState.items.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {recentlyViewedState.items.length > 9 ? '9+' : recentlyViewedState.items.length}
            </span>
          )}
        </span>
      </button>

      <RecentlyViewedDrawer
        items={recentlyViewedState.items}
        isOpen={isRecentOpen}
        onClose={() => setIsRecentOpen(false)}
        onClear={recentlyViewedState.clear}
        onRemove={recentlyViewedState.remove}
      />

      <PageIntro />
    </>
  )
}

export default function Services() {
  return (
    <ErrorBoundary>
      <ServicesContent />
    </ErrorBoundary>
  )
}
