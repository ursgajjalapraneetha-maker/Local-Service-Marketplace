import { motion } from 'framer-motion'
import {
  Award, ShieldCheck, Lock, Zap, Star,
} from 'lucide-react'
import { achievements } from '../data/stats'

const iconMap = {
  Award, ShieldCheck, Lock, Zap, Star,
}

/**
 * Achievements
 *
 * Horizontal row of achievement badges with icons and labels.
 */
export default function Achievements() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      className="flex flex-wrap items-center justify-center gap-3"
    >
      {achievements.map((a) => {
        const Icon = iconMap[a.icon] || Award
        return (
          <span
            key={a.id}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-gray-100 text-sm font-medium text-gray-600 shadow-sm hover:border-primary/20 hover:shadow hover:text-primary transition-all"
          >
            <Icon size={15} className="text-primary" />
            {a.label}
          </span>
        )
      })}
    </motion.div>
  )
}
