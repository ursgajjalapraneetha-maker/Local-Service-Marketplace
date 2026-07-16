import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

function RatingOverview({ rating = 0, totalReviews = 0, reviews = [] }) {
  const distribution = useMemo(() => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    reviews.forEach((r) => {
      if (dist[r.rating] !== undefined) dist[r.rating]++
    })
    return dist
  }, [reviews])

  const maxCount = useMemo(
    () => Math.max(...Object.values(distribution), 1),
    [distribution]
  )

  return (
    <div>
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-50">
        <div className="text-center">
          <p className="text-2xl font-heading font-bold text-secondary">
            {rating > 0 ? rating : '—'}
          </p>
          <div className="flex items-center gap-0.5 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="text-[11px] text-gray-400 mt-1">{totalReviews} review{totalReviews !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((stars) => {
          const count = distribution[stars]
          const percentage = (count / maxCount) * 100
          return (
            <div key={stars} className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500 w-4 shrink-0">{stars}</span>
              <Star size={10} className="text-amber-400 fill-amber-400 shrink-0" aria-hidden="true" />
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.5, delay: 0.05 * (5 - stars) }}
                  className="h-full rounded-full bg-amber-400"
                  role="progressbar"
                  aria-valuenow={count}
                  aria-valuemin={0}
                  aria-valuemax={maxCount}
                  aria-label={`${stars} stars: ${count} reviews`}
                />
              </div>
              <span className="text-xs font-medium text-gray-400 w-5 text-right shrink-0">{count}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default memo(RatingOverview)
