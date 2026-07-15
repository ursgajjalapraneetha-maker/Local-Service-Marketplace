import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Users, CheckCircle, Heart } from 'lucide-react'
import { ratingStats } from '../data/testimonials'

const iconMap = { Star, Users, CheckCircle, Heart }

/**
 * Counts from 0 to target when element enters viewport.
 */
function useCountUp(target, enabled) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!enabled) return
    let start = null
    const duration = 1500
    const step = (timestamp) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, enabled])

  return count
}

/**
 * RatingSummary
 *
 * Displays platform statistics with animated count-up numbers.
 */
export default function RatingSummary() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16"
    >
      {ratingStats.map((stat) => {
        const Icon = iconMap[stat.icon] || Star
        const count = useCountUp(stat.value, inView)
        const display = stat.value >= 1000
          ? `${(count / 1000).toFixed(count >= 1000 ? 1 : 0)}K`
          : stat.value % 1 === 0
            ? count
            : (count / 10).toFixed(1)

        return (
          <div
            key={stat.label}
            className="relative bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 text-center hover:shadow-md transition-shadow"
          >
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Icon size={20} className="text-primary" />
            </div>
            <p className="text-2xl sm:text-3xl font-heading font-bold text-secondary">
              {display}{stat.suffix}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        )
      })}
    </motion.div>
  )
}
