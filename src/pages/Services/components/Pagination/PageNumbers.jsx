import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import { getVisiblePages } from '../../utils/pagination'

/**
 * Renders numbered page buttons with ellipsis for large page counts.
 *
 * @param {{
 *   currentPage: number,
 *   totalPages: number,
 *   onPageChange: (page: number) => void,
 * }}
 */
function PageNumbers({ currentPage, totalPages, onPageChange }) {
  const visiblePages = useMemo(
    () => getVisiblePages(currentPage, totalPages),
    [currentPage, totalPages]
  )

  if (totalPages <= 1) return null

  return (
    <nav aria-label="Pagination" className="flex items-center gap-1">
      {visiblePages.map((page, idx) => {
        if (page === '...') {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="flex items-center justify-center w-9 h-9 text-xs text-gray-400 select-none"
              aria-hidden="true"
            >
              &hellip;
            </span>
          )
        }

        const isActive = page === currentPage

        return (
          <motion.button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={isActive}
            aria-label={`Page ${page}`}
            aria-current={isActive ? 'page' : undefined}
            whileTap={{ scale: 0.95 }}
            className={`
              relative flex items-center justify-center w-9 h-9 text-sm font-medium rounded-xl
              transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30
              ${
                isActive
                  ? 'text-white'
                  : 'text-gray-600 hover:bg-gray-100 active:scale-[0.97]'
              }
            `}
          >
            {isActive && (
              <motion.span
                layoutId="activePage"
                className="absolute inset-0 bg-primary rounded-xl"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{page}</span>
          </motion.button>
        )
      })}
    </nav>
  )
}

export default memo(PageNumbers)
