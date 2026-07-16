import { memo, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import ServiceGallery from './ServiceGallery'
import ProviderMiniCard from './ProviderMiniCard'
import BookingSummary from './BookingSummary'
import ServiceBadges from '../ServicesGrid/ServiceBadges'
import WishlistButton from '../ServiceActions/WishlistButton'
import CompareButton from '../ServiceActions/CompareButton'
import ShareButton from '../ServiceActions/ShareButton'

const OVERLAY_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const MODAL_VARIANTS = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
}

function QuickViewModal({
  isOpen,
  service,
  onClose,
  isWishlisted,
  onToggleWishlist,
  isCompared,
  onToggleCompare,
  onShare,
  onBookNow,
  onViewDetails,
}) {
  const modalRef = useRef(null)
  const previousActiveElement = useRef(null)

  const handleEsc = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  const handleOverlayClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
      setTimeout(() => modalRef.current?.focus(), 50)
    } else {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
      previousActiveElement.current?.focus()
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleEsc])

  if (!service) return null

  const gallery = service.gallery || [service.image]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          variants={OVERLAY_VARIANTS}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleOverlayClick}
            aria-hidden="true"
          />

          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Quick view: ${service.title}`}
            tabIndex={-1}
            variants={MODAL_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl focus:outline-none"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm text-gray-600 hover:bg-white hover:text-gray-900 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              aria-label="Close quick view"
            >
              <X size={18} />
            </button>

            <ServiceGallery images={gallery} title={service.title} />

            <div className="p-6 space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <span className="text-[11px] font-semibold text-primary bg-primary/5 px-2 py-0.5 rounded-full uppercase tracking-wide">
                    {service.category}
                  </span>
                  <h2 className="mt-2 text-xl font-heading font-bold text-secondary">
                    {service.title}
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <WishlistButton
                    serviceId={service.id}
                    isWishlisted={isWishlisted}
                    onToggle={onToggleWishlist}
                    serviceTitle={service.title}
                  />
                  <CompareButton
                    serviceId={service.id}
                    isCompared={isCompared}
                    onToggle={onToggleCompare}
                    serviceTitle={service.title}
                  />
                  <ShareButton
                    service={service}
                    onShare={onShare}
                    serviceTitle={service.title}
                  />
                </div>
              </div>

              <ServiceBadges
                providerType={service.providerType}
                discount={service.discount}
                availability={service.availability}
                rating={service.rating}
                reviews={service.reviews}
                experience={service.experience}
              />

              <p className="text-sm text-gray-500 leading-relaxed">
                {service.description}
              </p>

              <ProviderMiniCard
                provider={service.provider}
                avatar={service.providerAvatar}
                rating={service.rating}
                reviews={service.reviews}
                experience={service.experience}
                city={service.city}
                verified={service.providerType?.includes('Verified')}
              />

              <BookingSummary
                price={service.price}
                oldPrice={service.oldPrice}
                discount={service.discount}
                duration={service.duration}
                availability={service.availability}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default memo(QuickViewModal)
