/**
 * ServiceCard Component
 *
 * Displays a popular service with image, pricing, rating, provider info,
 * availability, and booking actions.
 *
 * Props:
 * @param {Object} service
 */
import { motion } from 'framer-motion'
import { Star, Clock, User, Tag } from 'lucide-react'
import PriceTag from './PriceTag'

const tagIcons = {
  'Instant Booking': Tag,
  'Verified Provider': User,
  'Free Cancellation': Clock,
  'Doorstep Service': Tag,
  'Fast Response': Clock,
}

export default function ServiceCard({ service }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -6 }}
      className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-primary/10 transition-all"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Category badge */}
        <span className="absolute top-3 left-3 px-3 py-1 text-[10px] font-semibold text-white bg-secondary/60 backdrop-blur-sm rounded-lg">
          {service.category}
        </span>
        {/* Discount badge */}
        {service.discount && (
          <span className="absolute top-3 right-3 px-2 py-1 text-[10px] font-bold text-white bg-danger rounded-lg">
            {service.discount}% OFF
          </span>
        )}
        {/* Availability */}
        <div
          className={`absolute bottom-3 left-3 px-2.5 py-1 text-[10px] font-medium rounded-lg backdrop-blur-sm ${
            service.availability === 'Available Today'
              ? 'text-success bg-success/15'
              : 'text-gray-300 bg-gray-900/40'
          }`}
        >
          {service.availability}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Name */}
        <h3 className="font-heading font-semibold text-secondary group-hover:text-primary transition-colors">
          {service.name}
        </h3>

        {/* Description */}
        <p className="mt-1 text-sm text-gray-500 leading-snug line-clamp-2">
          {service.description}
        </p>

        {/* Provider + Rating */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <User size={12} />
            <span>{service.provider.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={12} className="text-warning fill-current" />
            <span className="text-xs font-semibold">{service.rating}</span>
            <span className="text-xs text-gray-400">({service.reviews.toLocaleString()})</span>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
          <Clock size={12} />
          <span>{service.duration}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {service.tags.map((tag) => {
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

        {/* Price */}
        <div className="mt-4 pt-4 border-t border-gray-50">
          <PriceTag
            price={service.price}
            originalPrice={service.originalPrice}
            discount={service.discount}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button className="flex-1 px-3 py-2.5 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-primary-dark transition-all active:scale-[0.97]">
            Book Now
          </button>
          <button className="flex-1 px-3 py-2.5 text-sm font-medium text-secondary border border-gray-200 rounded-xl hover:bg-gray-50 transition-all active:scale-[0.97]">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  )
}
