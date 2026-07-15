import { motion } from 'framer-motion'
import { Star, Quote, BadgeCheck, ThumbsUp } from 'lucide-react'

/**
 * TestimonialCard
 *
 * Displays a single customer testimonial with photo, star rating,
 * review text, service info, and verification badges.
 *
 * @param {{ testimonial: object }} props
 */
export default function TestimonialCard({ testimonial: t }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -6 }}
      className="group relative bg-white rounded-2xl border border-gray-100 p-6 sm:p-7 hover:shadow-xl hover:border-primary/10 transition-all"
    >
      {/* Glassmorphism accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/[0.03] to-transparent rounded-tr-2xl pointer-events-none" />

      {/* Large quotation mark */}
      <Quote
        size={36}
        className="text-primary/[0.06] absolute top-5 right-5"
        aria-hidden="true"
      />

      {/* Header: photo + name + city */}
      <div className="flex items-center gap-3.5 mb-4">
        <img
          src={t.photo}
          alt={t.name}
          loading="lazy"
          className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-50"
        />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="font-heading font-semibold text-sm text-secondary truncate">
              {t.name}
            </h4>
            {t.verified && (
              <BadgeCheck size={14} className="text-primary flex-shrink-0" aria-label="Verified customer" />
            )}
            {t.recommended && (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-semibold text-success bg-success/10 rounded-full flex-shrink-0">
                <ThumbsUp size={9} />
                Recommended
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 truncate">{t.city}</p>
        </div>
      </div>

      {/* 5-star rating */}
      <div className="flex items-center gap-0.5 mb-3" aria-label={`${t.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < t.rating ? 'text-warning fill-current' : 'text-gray-200'}
          />
        ))}
      </div>

      {/* Service + Provider + Date */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-3 text-xs text-gray-400">
        <span className="text-primary font-medium">{t.service}</span>
        <span aria-hidden="true">·</span>
        <span>by {t.provider}</span>
        <span aria-hidden="true">·</span>
        <span>{t.date}</span>
      </div>

      {/* Review text */}
      <p className="text-sm text-gray-600 leading-relaxed">
        &ldquo;{t.review}&rdquo;
      </p>
    </motion.div>
  )
}
