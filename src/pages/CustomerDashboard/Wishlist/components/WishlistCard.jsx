import { memo, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Star, MapPin, Clock, IndianRupee } from 'lucide-react'
import WishlistActions from './WishlistActions'

const AVAILABILITY_COLORS = {
  'Today': 'bg-success/10 text-success',
  'Tomorrow': 'bg-warning/10 text-warning',
  'This Week': 'bg-blue-100 text-blue-600',
}

function WishlistCard({ item, index, onRemove, onBook }) {
  const navigate = useNavigate()
  const [imgError, setImgError] = useState(false)

  const handleViewDetails = useCallback(() => {
    navigate(`/services/${item.id}`)
  }, [navigate, item.id])

  const handleBook = useCallback(() => {
    onBook?.(item)
  }, [onBook, item])

  const handleRemove = useCallback(() => {
    onRemove?.(item.id)
  }, [onRemove, item.id])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16, scale: 0.95 }}
      transition={{ duration: 0.3, delay: 0.04 * index }}
      layout
      className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative aspect-[16/10] overflow-hidden cursor-pointer" onClick={handleViewDetails} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleViewDetails()} aria-label={`View ${item.serviceName}`}>
        {imgError ? (
          <div className="w-full h-full bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
            <MapPin size={32} className="text-primary/30" />
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
        {item.discount > 0 && (
          <span className="absolute top-2 left-2 bg-danger text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
            {item.discount}% OFF
          </span>
        )}
        {item.featured && (
          <span className="absolute top-2 right-2 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
            Featured
          </span>
        )}
        <div className={`absolute bottom-2 left-2 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${AVAILABILITY_COLORS[item.availability] || 'bg-gray-100 text-gray-500'}`}>
          <div className="flex items-center gap-1">
            <Clock size={10} />
            {item.availability}
          </div>
        </div>
      </div>

      <div className="p-3.5" onClick={handleViewDetails} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleViewDetails()} aria-label={`View ${item.serviceName}`}>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-heading font-semibold text-secondary truncate">
              {item.serviceName}
            </h3>
            <p className="text-xs text-gray-500 truncate">{item.provider}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-1.5">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="text-[11px] font-medium text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
              {item.category}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 mt-1.5">
          <Star size={12} className="text-warning fill-warning" aria-hidden="true" />
          <span className="text-xs font-semibold text-gray-700">{item.rating}</span>
          <span className="text-[11px] text-gray-400">({item.reviews.toLocaleString()})</span>
        </div>

        <p className="text-xs text-gray-400 mt-1.5 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-sm font-heading font-bold text-primary">
            <IndianRupee size={12} className="inline" />
            {item.price?.toLocaleString()}
          </span>
          {item.originalPrice > item.price && (
            <span className="text-[11px] text-gray-400 line-through">
              <IndianRupee size={10} className="inline" />
              {item.originalPrice?.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      <div className="px-3.5 pb-3.5">
        <WishlistActions
          wishlistItem={item}
          onRemove={onRemove}
          onBook={onBook}
        />
      </div>
    </motion.div>
  )
}

export default memo(WishlistCard)
