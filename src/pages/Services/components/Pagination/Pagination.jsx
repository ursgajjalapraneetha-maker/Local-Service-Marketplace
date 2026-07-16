import { memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PaginationButton from './PaginationButton'
import PageNumbers from './PageNumbers'

const PAGE_SIZES = [12, 18, 24, 36]

/**
 * Full pagination component with Previous / Page numbers / Next and page size selector.
 *
 * @param {{
 *   currentPage: number,
 *   totalPages: number,
 *   onPageChange: (page: number) => void,
 *   onNext: () => void,
 *   onPrevious: () => void,
 *   hasNext: boolean,
 *   hasPrevious: boolean,
 *   pageSize: number,
 *   onPageSizeChange: (size: number) => void,
 * }}
 */
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
  pageSize,
  onPageSizeChange,
}) {
  if (totalPages <= 1) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="pagination"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-gray-100"
      >
        {/* Page size selector */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="hidden sm:inline">Show</span>
          <label htmlFor="page-size-select" className="sr-only">
            Results per page
          </label>
          <select
            id="page-size-select"
            value={pageSize}
            onChange={(e) => onPageSizeChange(parseInt(e.target.value, 10))}
            className="text-sm text-secondary bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 appearance-none"
            aria-label="Results per page"
          >
            {PAGE_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="hidden sm:inline">per page</span>
        </div>

        {/* Page navigation */}
        <div className="flex items-center gap-1">
          <PaginationButton
            direction="prev"
            disabled={!hasPrevious}
            onClick={onPrevious}
            label="Go to previous page"
          />

          <PageNumbers
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />

          <PaginationButton
            direction="next"
            disabled={!hasNext}
            onClick={onNext}
            label="Go to next page"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default memo(Pagination)
