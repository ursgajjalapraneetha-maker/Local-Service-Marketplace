import { motion } from 'framer-motion'
import { Shield, Users, CheckCircle } from 'lucide-react'
import { heroStats } from '../data/heroData'

const iconMap = {
  Shield, Users, CheckCircle,
}

export default function HeroStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className="flex flex-wrap gap-x-6 gap-y-2"
    >
      {heroStats.map(({ count, label, icon }) => {
        const Icon = iconMap[icon] || CheckCircle
        return (
          <div key={label} className="flex items-center gap-2">
            <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon size={13} className="text-success" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-semibold text-secondary">{count}</span>
              <span className="text-xs text-gray-500 hidden sm:inline">{label}</span>
            </div>
          </div>
        )
      })}
    </motion.div>
  )
}
