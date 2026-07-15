import { motion } from 'framer-motion'
import {
  Zap, Droplets, Hammer, PaintBucket, SprayCan, Sparkles, Wrench, Snowflake,
  Monitor, Smartphone, BookOpen, Camera, Ruler, Shirt, Truck, Flower2,
  Star, ArrowRight, Users,
} from 'lucide-react'

const iconMap = {
  Zap, Droplets, Hammer, PaintBucket, SprayCan, Sparkles, Wrench, Snowflake,
  Monitor, Smartphone, BookOpen, Camera, Ruler, Shirt, Truck, Flower2,
}

export default function CategoryCard({ category, index }) {
  const Icon = iconMap[category.icon] || Zap

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -6 }}
      className="group relative bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 cursor-pointer hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all"
      role="button"
      tabIndex={0}
      aria-label={`${category.name} - ${category.description}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') window.location.href = `/services?category=${category.slug}` }}
    >
      {/* Icon */}
      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mb-4 group-hover:from-primary group-hover:to-primary-dark transition-all duration-300">
        <Icon
          size={24}
          className="text-primary group-hover:text-white transition-colors duration-300 group-hover:scale-110"
          style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        />
      </div>

      {/* Name */}
      <h3 className="text-base sm:text-lg font-heading font-semibold text-secondary group-hover:text-primary transition-colors">
        {category.name}
      </h3>

      {/* Description */}
      <p className="mt-1 text-sm text-gray-500 leading-snug line-clamp-2">
        {category.description}
      </p>

      {/* Stats */}
      <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <Users size={13} />
          <span>{category.professionals.toLocaleString()} pros</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-medium">
          <Star size={12} className="text-warning fill-current" />
          <span className="text-gray-600">{category.rating}</span>
        </div>
      </div>

      {/* Explore arrow */}
      <div className="absolute top-5 right-5 sm:top-6 sm:right-6 w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
        <ArrowRight size={13} className="text-gray-400 group-hover:text-white transition-colors" />
      </div>
    </motion.div>
  )
}
