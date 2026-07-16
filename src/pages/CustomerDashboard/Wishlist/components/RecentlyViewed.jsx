import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Clock, Trash2 } from 'lucide-react'
import RecentlyViewedCard from './RecentlyViewedCard'
import { RecentlyViewedEmptyState } from './WishlistEmptyState'

function RecentlyViewed({ items, onRemove, onAddWishlist, onClear, wishlistIds }) {
  const handleClear = useCallback(() => {
    onClear?.()
  }, [onClear])

  const isInWishlist = useCallback(
    (itemId) => wishlistIds?.includes(itemId),
    [wishlistIds]
  )

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-primary" aria-hidden="true" />
          <h2 className="text-base font-heading font-semibold text-secondary">Recently Viewed</h2>
          <span className="text-xs text-gray-400">({items.length})</span>
        </div>
        {items.length > 0 && (
          <button
            onClick={handleClear}
            className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-danger px-2 py-1.5 rounded-lg hover:bg-danger/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            aria-label="Clear recently viewed"
          >
            <Trash2 size={12} />
            Clear All
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <RecentlyViewedEmptyState />
      ) : (
        <div
          className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory scrollbar-none"
          role="list"
          aria-label="Recently viewed services"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.slice(0, 10).map((item, i) => (
            <div key={item.id} className="snap-start" role="listitem">
              <RecentlyViewedCard
                item={item}
                index={i}
                onRemove={onRemove}
                onAddWishlist={onAddWishlist}
                isInWishlist={isInWishlist(item.id)}
              />
            </div>
          ))}
        </div>
      )}
    </motion.section>
  )
}

export default memo(RecentlyViewed)
