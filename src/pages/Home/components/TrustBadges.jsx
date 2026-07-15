import { motion } from 'framer-motion'
import {
  ShieldCheck, CreditCard, Users, Star,
} from 'lucide-react'
import { trustBadges } from '../data/features'

const iconMap = {
  ShieldCheck, CreditCard, Users, Star,
}

export default function TrustBadges() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-12 pt-8 border-t border-gray-100"
    >
      {trustBadges.map(({ label, icon }) => {
        const Icon = iconMap[icon] || ShieldCheck
        return (
          <div key={label} className="flex items-center gap-2">
            <div className="w-5 h-5 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon size={11} className="text-success" />
            </div>
            <span className="text-xs sm:text-sm text-gray-600 font-medium">{label}</span>
          </div>
        )
      })}
    </motion.div>
  )
}
