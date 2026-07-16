import { memo, useCallback } from 'react'
import WishlistButton from '../ServiceActions/WishlistButton'
import CompareButton from '../ServiceActions/CompareButton'
import ShareButton from '../ServiceActions/ShareButton'

function ServiceActions({
  serviceId,
  slug,
  isWishlisted,
  onToggleWishlist,
  isCompared,
  onToggleCompare,
  onBookNow,
  onViewDetails,
  onShare,
  service,
  variant = 'grid',
}) {
  const handleBook = useCallback(
    (e) => {
      e.stopPropagation()
      e.preventDefault()
      onBookNow(slug)
    },
    [slug, onBookNow]
  )

  const handleDetails = useCallback(
    (e) => {
      e.stopPropagation()
      e.preventDefault()
      onViewDetails(slug)
    },
    [slug, onViewDetails]
  )

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="flex gap-2 flex-1">
        <button
          onClick={handleBook}
          className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-primary-dark transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-label={`Book ${service.title}`}
        >
          Book Now
        </button>
        <button
          onClick={handleDetails}
          className="flex-1 px-4 py-2.5 text-sm font-medium text-secondary border border-gray-200 rounded-xl hover:bg-gray-50 transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
          aria-label={`View details for ${service.title}`}
        >
          View Details
        </button>
      </div>

      <div className="flex items-center gap-1.5">
        <WishlistButton
          serviceId={serviceId}
          isWishlisted={isWishlisted}
          onToggle={onToggleWishlist}
          serviceTitle={service.title}
        />
        <CompareButton
          serviceId={serviceId}
          isCompared={isCompared}
          onToggle={onToggleCompare}
          serviceTitle={service.title}
          compareCount={0}
        />
        <ShareButton
          service={service}
          onShare={onShare}
          serviceTitle={service.title}
        />
      </div>
    </div>
  )
}

export default memo(ServiceActions)
