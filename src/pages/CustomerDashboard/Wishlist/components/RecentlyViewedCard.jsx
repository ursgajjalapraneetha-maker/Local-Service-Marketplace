import { memo, useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Star, IndianRupee, X, Heart, ShoppingCart, Clock } from 'lucide-react'
import toast from 'react-hot-toast'
import { formatDate } from '../../../../utils'

function RecentlyViewedCard({ item, index, onRemove, onAddWishlist, isInWishlist }) {
  const navigate = useNavigate()
  const [imgError, setImgError] = useState(false)

  const handleView = useCallback(() => {
    navigate(`/services/${item.id}`)
  }, [navigate, item.id])

  const handleBook = useCallback(() => {
    toast.success(`Booking ${item.serviceName}`)
  }, [item.serviceName])

  const handleRemove = useCallback(() => {
    onRemove?.(item.id)
  }, [onRemove, item.id])

  const handleWishlistToggle = useCallback(() => {
    onAddWishlist?.(item)
  }, [onAddWishlist, item])

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.05 * index }}
      className="min-w-[220px] w-[220px] bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow shrink-0 snap-start"
    >
      <div className="relative aspect-[16/10] overflow-hidden cursor-pointer" onClick={handleView} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleView()} aria-label={`View ${item.serviceName}`}>
        {imgError ? (
          <div className="w-full h-full bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
            <Clock size={24} className="text-primary/30" />
          </div>
        ) : (
          <img
            src={item.image}
            alt={item.serviceName}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}
        <button
          onClick={(e) => { e.stopPropagation(); handleRemove() }}
          className="absolute top-2 right-2 p-1 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-label={`Remove ${item.serviceName} from recently viewed`}
        >
          <X size={12} className="text-gray-500" />
        </button>
      </div>

      <div className="p-3 cursor-pointer" onClick={handleView} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleView()} aria-label={`View ${item.serviceName}`}>
        <h4 className="text-sm font-semibold text-secondary truncate">{item.serviceName}</h4>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-0.5">
            <Star size={11} className="text-warning fill-warning" />
            <span className="text-[11px] font-medium text-gray-600">{item.rating}</span>
          </div>
          <span className="text-[11px] font-heading font-bold text-primary">
            <IndianRupee size={10} className="inline" />
            {item.price?.toLocaleString()}
          </span>
        </div>
        {item.viewedAt && (
          <p className="text-[10px] text-gray-400 mt-1">Viewed {formatDate(item.viewedAt)}</p>
        )}
      </div>

      <div className="px-3 pb-3 flex items-center gap-1.5">
        <button
          onClick={(e) => { e.stopPropagation(); handleBook() }}
          className="flex-1 px-2.5 py-1.5 bg-primary text-white text-[11px] font-semibold rounded-lg hover:bg-primary-dark transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-label={`Book ${item.serviceName}`}
        >
          <div className="flex items-center justify-center gap-1">
            <ShoppingCart size={11} />
            Book
          </div>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleWishlistToggle() }}
          className={`px-2.5 py-1.5 text-[11px] font-semibold rounded-lg transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
            isInWishlist
              ? 'bg-danger/10 text-danger hover:bg-danger/20'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          aria-label={isInWishlist ? `Remove ${item.serviceName} from wishlist` : `Add ${item.serviceName} to wishlist`}
        >
          <Heart size={11} fill={isInWishlist ? 'currentColor' : 'none'} />
        </button>
      </div>
    </motion.div>
  )
}

export default memo(RecentlyViewedCard)
