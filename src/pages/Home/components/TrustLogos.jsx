import { motion } from 'framer-motion'
import {
  MessageSquare, Cloud, CreditCard, MapPin, Shield,
} from 'lucide-react'
import { trustLogos } from '../data/stats'

const iconMap = {
  MessageSquare, Cloud, CreditCard, MapPin, Shield,
}

/**
 * TrustLogos
 *
 * Displays a row of trusted brand logos in grayscale
 * that transition to color on hover.
 */
export default function TrustLogos() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <p className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider mb-5">
        Trusted &amp; Integrated With
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        {trustLogos.map((logo) => {
          const Icon = iconMap[logo.icon] || Shield
          return (
            <div
              key={logo.id}
              className="flex items-center gap-2 text-gray-300 hover:text-gray-600 transition-colors duration-300 cursor-default"
              aria-label={logo.name}
            >
              <Icon size={18} />
              <span className="text-sm font-semibold">{logo.name}</span>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
