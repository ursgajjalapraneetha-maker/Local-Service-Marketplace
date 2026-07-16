import { memo } from 'react'
import { motion } from 'framer-motion'

/**
 * Sentinel element for IntersectionObserver-based infinite scroll.
 * Renders a loading spinner when fetching, or a hidden sentinel when idle but hasMore.
 *
 * @param {{
 *   sentinelRef: React.RefObject,
 *   loading: boolean,
 *   hasMore: boolean,
 * }}
 */
const InfiniteLoader = memo(function InfiniteLoader({
  sentinelRef,
  loading,
  hasMore,
}) {
  if (!hasMore && !loading) {
    return (
      <div className="flex justify-center py-8">
        <p className="text-sm text-gray-400">All services loaded</p>
      </div>
    )
  }

  return (
    <div
      ref={sentinelRef}
      className="flex justify-center py-8"
      aria-label={loading ? 'Loading more services' : 'Scroll for more services'}
    >
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="flex gap-1.5">
            <motion.span
              className="w-2.5 h-2.5 bg-primary/40 rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
            />
            <motion.span
              className="w-2.5 h-2.5 bg-primary/40 rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.15 }}
            />
            <motion.span
              className="w-2.5 h-2.5 bg-primary/40 rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.3 }}
            />
          </div>
          <span className="text-xs text-gray-400">Loading more...</span>
        </motion.div>
      )}
      {!loading && hasMore && (
        <div className="h-px w-full max-w-xs bg-gray-100" aria-hidden="true" />
      )}
    </div>
  )
})

export default InfiniteLoader
