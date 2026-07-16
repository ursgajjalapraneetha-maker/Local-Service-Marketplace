import { memo } from 'react'
import { motion } from 'framer-motion'
import { User, Tag } from 'lucide-react'
import ServiceImage from './ServiceImage'
import ServiceBadges from './ServiceBadges'
import ServiceMeta from './ServiceMeta'
import ServiceActions from './ServiceActions'
import QuickViewButton from '../ServiceActions/QuickViewButton'

const tagIcons = {
  'Instant Booking': Tag,
  'Fast Response': User,
  Expert: User,
  'Doorstep Service': Tag,
}

const ServiceCard = memo(function ServiceCard({
  service,
  isWishlisted,
  onToggleWishlist,
  isCompared,
  onToggleCompare,
  onBookNow,
  onViewDetails,
  onShare,
  onQuickView,
}) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="group h-full flex flex-col bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-primary/10 transition-all duration-300"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <ServiceImage
          src={service.image}
          alt={service.title}
          className="w-full h-full"
        />
        <div className="absolute top-3 left-3 z-10">
          <span className="px-3 py-1 text-[10px] font-semibold text-white bg-secondary/60 backdrop-blur-sm rounded-lg">
            {service.category}
          </span>
        </div>
        <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <QuickViewButton
            service={service}
            onQuickView={onQuickView}
            serviceTitle={service.title}
          />
        </div>
        <div className="absolute bottom-3 left-3 right-3 z-10">
          <ServiceBadges
            providerType={service.providerType}
            discount={service.discount}
            availability={service.availability}
            rating={service.rating}
            reviews={service.reviews}
            experience={service.experience}
          />
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <h3 className="font-heading font-semibold text-secondary group-hover:text-primary transition-colors line-clamp-1">
            {service.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500 leading-snug line-clamp-2">
            {service.description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <img
            src={service.providerAvatar}
            alt={service.provider}
            className="w-6 h-6 rounded-full shrink-0 bg-primary/10"
          />
          <span className="text-xs text-gray-500 truncate">
            {service.provider}
          </span>
        </div>

        <ServiceMeta
          rating={service.rating}
          reviews={service.reviews}
          experience={service.experience}
          distance={service.distance}
          availability={service.availability}
          duration={service.duration}
        />

        <div className="flex flex-wrap gap-1.5">
          {service.tags?.map((tag) => {
            const Icon = tagIcons[tag] || Tag
            return (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium text-primary bg-primary/5 rounded-full"
              >
                <Icon size={10} />
                {tag}
              </span>
            )
          })}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-50">
          <div className="flex items-end gap-2 mb-4">
            <div>
              <span className="text-xs text-gray-400">Starting from</span>
              <p className="text-xl font-heading font-bold text-primary">
                ₹{service.price.toLocaleString()}
              </p>
            </div>
            {service.oldPrice && service.oldPrice !== service.price && (
              <>
                <p className="text-sm text-gray-300 line-through mb-1">
                  ₹{service.oldPrice.toLocaleString()}
                </p>
              </>
            )}
          </div>

          <ServiceActions
            serviceId={service.id}
            slug={service.slug}
            isWishlisted={isWishlisted}
            onToggleWishlist={onToggleWishlist}
            isCompared={isCompared}
            onToggleCompare={onToggleCompare}
            onBookNow={onBookNow}
            onViewDetails={onViewDetails}
            onShare={onShare}
            service={service}
            variant="grid"
          />
        </div>
      </div>
    </motion.article>
  )
})

export default ServiceCard
