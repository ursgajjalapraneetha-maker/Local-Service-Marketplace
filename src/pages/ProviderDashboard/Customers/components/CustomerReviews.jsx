import { memo } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

function CustomerReviews({ reviews = [] }) {
  if (reviews.length === 0) {
    return (
      <div className="py-8 text-center">
        <Star size={24} className="text-gray-200 mx-auto mb-2" aria-hidden="true" />
        <p className="text-sm text-gray-400">No reviews yet from this customer.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {reviews.map((review, i) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.04 * i }}
          className="p-4 rounded-lg border border-gray-50 bg-gray-50/30"
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <p className="text-sm font-semibold text-secondary">{review.service}</p>
            <div className="flex items-center gap-0.5 shrink-0">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star
                  key={s}
                  size={12}
                  className={s < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">{review.text}</p>
          <p className="text-[11px] text-gray-400 mt-1.5">{review.date}</p>
        </motion.div>
      ))}
    </div>
  )
}

export default memo(CustomerReviews)
