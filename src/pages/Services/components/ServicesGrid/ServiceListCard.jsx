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

const ServiceListCard = memo(function ServiceListCard({
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
      whileHover={{ y: -3 }}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-primary/10 transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-72 md:w-80 shrink-0 aspect-[4/3] sm:aspect-auto sm:min-h-[220px] overflow-hidden">
          <ServiceImage
            src={service.image}
            alt={service.title}
            className="w-full h-full sm:absolute sm:inset-0"
          />
          <div className="absolute top-3 left-3 z-10 sm:hidden">
            <span className="px-2.5 py-1 text-[10px] font-semibold text-white bg-secondary/60 backdrop-blur-sm rounded-lg">
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
        </div>

        <div className="flex flex-col flex-1 p-5 gap-3 min-w-0">
          <div className="hidden sm:flex items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="text-[10px] font-semibold text-primary bg-primary/5 px-2 py-0.5 rounded-full uppercase tracking-wide">
                {service.category}
              </span>
              <h3 className="mt-1.5 font-heading font-semibold text-secondary group-hover:text-primary transition-colors line-clamp-1">
                {service.title}
              </h3>
            </div>
            <div className="shrink-0">
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

          <div className="sm:hidden">
            <h3 className="font-heading font-semibold text-secondary group-hover:text-primary transition-colors line-clamp-1">
              {service.title}
            </h3>
            <div className="mt-1.5">
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

          <p className="text-sm text-gray-500 leading-snug line-clamp-2">
            {service.description}
          </p>

          <div className="flex items-center gap-2">
            <img
              src={service.providerAvatar}
              alt={service.provider}
              className="w-5 h-5 rounded-full shrink-0 bg-primary/10"
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

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pt-2 mt-auto border-t border-gray-50">
            <div className="flex items-end gap-2">
              <div>
                <span className="text-xs text-gray-400">Starting from</span>
                <p className="text-xl font-heading font-bold text-primary">
                  ₹{service.price.toLocaleString()}
                </p>
              </div>
              {service.oldPrice && service.oldPrice !== service.price && (
                <p className="text-sm text-gray-300 line-through mb-1">
                  ₹{service.oldPrice.toLocaleString()}
                </p>
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
              variant="list"
            />
          </div>
        </div>
      </div>
    </motion.article>
  )
})

export default ServiceListCard
