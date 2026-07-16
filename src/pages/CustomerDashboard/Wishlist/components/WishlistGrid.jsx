import { memo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import WishlistCard from './WishlistCard'
import WishlistEmptyState from './WishlistEmptyState'

function WishlistGrid({ wishlist, onRemove, onBook }) {
  if (wishlist.length === 0) return <WishlistEmptyState />

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" role="list" aria-label="Wishlist items">
      <AnimatePresence mode="popLayout">
        {wishlist.map((item, i) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            role="listitem"
          >
            <WishlistCard
              item={item}
              index={i}
              onRemove={onRemove}
              onBook={onBook}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default memo(WishlistGrid)
