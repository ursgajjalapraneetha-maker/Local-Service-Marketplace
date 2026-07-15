import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Users, BadgeCheck, Briefcase, Layers, Star, Heart,
} from 'lucide-react'

const iconMap = {
  Users, BadgeCheck, Briefcase, Layers, Star, Heart,
}

const iconBgGradients = [
  'from-blue-500/20 to-blue-600/10',
  'from-emerald-500/20 to-emerald-600/10',
  'from-violet-500/20 to-violet-600/10',
  'from-orange-500/20 to-orange-600/10',
  'from-amber-500/20 to-amber-600/10',
  'from-rose-500/20 to-rose-600/10',
]

const iconColors = [
  'text-blue-500',
  'text-emerald-500',
  'text-violet-500',
  'text-orange-500',
  'text-amber-500',
  'text-rose-500',
]

/**
 * Animates a number from 0 to target when element enters viewport.
 */
function useCountUp(target, enabled, isDecimal) {
  const [count, setCount] = useState(isDecimal ? 0 : 0)

  useEffect(() => {
    if (!enabled) return
    let start = null
    const duration = 1800
    const step = (timestamp) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const progress = Math.min(elapsed / duration, 1)
      if (isDecimal) {
        setCount((progress * target * 10) / 10)
      } else {
        setCount(Math.floor(progress * target))
      }
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, enabled, isDecimal])

  return isDecimal ? count.toFixed(1) : count.toLocaleString()
}

/**
 * StatCard
 *
 * Displays a single platform statistic with animated counter,
 * premium icon, description, and hover effects.
 *
 * @param {{ stat: object, index: number }} props
 */
export default function StatCard({ stat, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const Icon = iconMap[stat.icon] || Users
  const count = useCountUp(stat.value, inView, stat.isDecimal)
  const gradient = iconBgGradients[index % iconBgGradients.length]
  const iconColor = iconColors[index % iconColors.length]

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -6 }}
      className="group relative bg-white rounded-2xl border border-gray-100 p-6 sm:p-7 hover:shadow-xl hover:border-primary/10 transition-all"
    >
      {/* Glassmorphism accent */}
      <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-primary/[0.03] to-transparent rounded-tr-2xl pointer-events-none" />

      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon size={22} className={iconColor} />
      </div>

      {/* Animated number */}
      <p className="text-3xl sm:text-4xl font-heading font-bold text-secondary">
        {count}{stat.suffix}
      </p>

      {/* Title */}
      <h3 className="mt-1.5 font-heading font-semibold text-secondary group-hover:text-primary transition-colors">
        {stat.title}
      </h3>

      {/* Description */}
      <p className="mt-1 text-sm text-gray-500 leading-relaxed">
        {stat.description}
      </p>
    </motion.div>
  )
}
