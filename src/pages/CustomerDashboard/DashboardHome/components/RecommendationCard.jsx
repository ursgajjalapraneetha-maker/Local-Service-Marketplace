import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Heart, Star } from 'lucide-react'

function RecommendationCard({ service, index }) {
  const navigate = useNavigate()

  const handleBook = useCallback(() => {
    navigate(`/services/${service.slug}`)
  }, [navigate, service.slug])

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: 0.06 * index }}
      className="min-w-[240px] w-[240px] bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow shrink-0"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        <button
          className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-label={`Add ${service.name} to wishlist`}
        >
          <Heart size={14} className="text-gray-500 hover:text-danger transition-colors" />
        </button>
      </div>
      <div className="p-3.5">
        <h4 className="text-sm font-semibold text-secondary truncate">{service.name}</h4>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-0.5">
            <Star size={12} className="text-warning fill-warning" />
            <span className="text-xs font-medium text-gray-600">{service.rating}</span>
          </div>
          <span className="text-[11px] text-gray-400">({service.reviews})</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-sm font-heading font-bold text-primary">₹{service.price?.toLocaleString()}</span>
          <button
            onClick={handleBook}
            className="px-3 py-1.5 bg-primary text-white text-[11px] font-semibold rounded-lg hover:bg-primary-dark transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            aria-label={`Book ${service.name}`}
          >
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default memo(RecommendationCard)
