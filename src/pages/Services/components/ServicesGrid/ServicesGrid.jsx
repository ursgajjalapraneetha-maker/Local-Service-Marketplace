import { memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GridToolbar from './GridToolbar'
import ServiceCard from './ServiceCard'
import ServiceListCard from './ServiceListCard'
import LoadingGrid from './LoadingGrid'
import NoResults from './NoResults'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

function ServicesGrid({
  services,
  loading,
  viewMode,
  onViewModeChange,
  wishlist,
  onToggleWishlist,
  compareList,
  onToggleCompare,
  onBookNow,
  onViewDetails,
  onShare,
  onQuickView,
  searchTerm,
  selectedCategory,
  sortOption,
  sortOptions,
  onSortChange,
  onClearAll,
}) {
  const currentSortLabel =
    sortOptions?.find((o) => o.value === sortOption)?.label || ''

  return (
    <div>
      <GridToolbar
        totalCount={services.length}
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        sortOptionLabel={currentSortLabel}
        sortOption={sortOption}
        sortOptions={sortOptions}
        onSortChange={onSortChange}
      />

      {loading ? (
        <LoadingGrid />
      ) : services.length === 0 ? (
        <AnimatePresence mode="wait">
          <motion.div
            key="no-results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <NoResults onReset={onClearAll} />
          </motion.div>
        </AnimatePresence>
      ) : (
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid-view"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              role="list"
              aria-label="Services grid view"
            >
              {services.map((service) => (
                <motion.div key={service.id} variants={itemVariants} role="listitem">
                  <ServiceCard
                    service={service}
                    isWishlisted={wishlist.includes(service.id)}
                    onToggleWishlist={onToggleWishlist}
                    isCompared={compareList?.includes(service.id)}
                    onToggleCompare={onToggleCompare}
                    onBookNow={onBookNow}
                    onViewDetails={onViewDetails}
                    onShare={onShare}
                    onQuickView={onQuickView}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list-view"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="flex flex-col gap-5"
              role="list"
              aria-label="Services list view"
            >
              {services.map((service) => (
                <motion.div key={service.id} variants={itemVariants} role="listitem">
                  <ServiceListCard
                    service={service}
                    isWishlisted={wishlist.includes(service.id)}
                    onToggleWishlist={onToggleWishlist}
                    onBookNow={onBookNow}
                    onViewDetails={onViewDetails}
                    onShare={onShare}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}

export default memo(ServicesGrid)
