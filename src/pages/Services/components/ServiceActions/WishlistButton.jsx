import { memo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'

function WishlistButton({ serviceId, isWishlisted, onToggle, serviceTitle }) {
  const handleClick = useCallback(
    (e) => {
      e.stopPropagation()
      e.preventDefault()
      onToggle(serviceId)
    },
    [serviceId, onToggle]
  )

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.8 }}
      aria-label={
        isWishlisted
          ? `Remove ${serviceTitle} from wishlist`
          : `Add ${serviceTitle} to wishlist`
      }
      className={`
        relative p-2.5 rounded-xl border transition-all duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30
        ${
          isWishlisted
            ? 'bg-danger/5 border-danger/20 text-danger'
            : 'border-gray-200 text-gray-400 hover:text-danger hover:border-danger/30 hover:bg-danger/5'
        }
      `}
    >
      <AnimatePresence mode="wait">
        {isWishlisted ? (
          <motion.span
            key="filled"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <Heart size={16} className="fill-current" />
          </motion.span>
        ) : (
          <motion.span
            key="outline"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <Heart size={16} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export default memo(WishlistButton)
