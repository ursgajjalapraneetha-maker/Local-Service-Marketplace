import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { providerStats, ratingDistribution } from '../data/dashboardData'

function RatingOverview() {
  const maxCount = useMemo(
    () => Math.max(...ratingDistribution.map((r) => r.count)),
    []
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
      className="bg-white rounded-xl border border-gray-100 p-5"
      role="region"
      aria-label="Rating overview"
    >
      <div className="flex items-center gap-2 mb-4">
        <Star size={18} className="text-primary" aria-hidden="true" />
        <h2 className="text-base font-heading font-semibold text-secondary">Rating Overview</h2>
      </div>

      <div className="flex items-center gap-4 mb-5 pb-4 border-b border-gray-50">
        <div className="text-center">
          <p className="text-3xl font-heading font-bold text-secondary">
            {providerStats.averageRating}
          </p>
          <div className="flex items-center gap-0.5 mt-1" aria-label={`${providerStats.averageRating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.round(providerStats.averageRating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-1">{providerStats.totalReviews} reviews</p>
        </div>
      </div>

      <div className="space-y-2">
        {ratingDistribution.map(({ stars, count }) => {
          const percentage = (count / maxCount) * 100
          return (
            <div key={stars} className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500 w-6 shrink-0">{stars}</span>
              <Star size={11} className="text-amber-400 fill-amber-400 shrink-0" aria-hidden="true" />
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.6, delay: 0.1 * (5 - stars), ease: 'easeOut' }}
                  className="h-full rounded-full bg-amber-400"
                  role="progressbar"
                  aria-valuenow={count}
                  aria-valuemin={0}
                  aria-valuemax={maxCount}
                  aria-label={`${stars} stars: ${count} reviews`}
                />
              </div>
              <span className="text-xs font-medium text-gray-400 w-6 text-right shrink-0">
                {count}
              </span>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default memo(RatingOverview)
