import { motion } from 'framer-motion'
import {
  MessageCircle, Mail, Phone,
  ArrowRight,
} from 'lucide-react'

const iconMap = {
  MessageCircle, Mail, Phone,
}

/**
 * SupportCard
 *
 * Displays a support contact option with icon, description, and action button.
 *
 * @param {{ support: Object }} props
 */
export default function SupportCard({ support }) {
  const Icon = iconMap[support.icon] || MessageCircle

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: 0.1 }}
      whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300 } }}
      className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:border-primary/10 transition-all"
    >
      {/* Gradient header */}
      <div
        className={`h-1.5 w-full rounded-t-xl bg-gradient-to-r ${support.color} mb-5`}
      />

      {/* Icon */}
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-4 group-hover:from-primary/10 group-hover:to-primary/5 transition-colors">
        <Icon size={22} className="text-primary" />
      </div>

      {/* Title */}
      <h3 className="font-heading font-semibold text-secondary mb-2">
        {support.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed mb-5">
        {support.description}
      </p>

      {/* Action */}
      <div className="pt-4 border-t border-gray-50">
        {support.action.includes('@') ? (
          <a
            href={`mailto:${support.action}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-primary-dark transition-colors"
          >
            {support.action}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </a>
        ) : (
          <a
            href={`tel:${support.action.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-primary-dark transition-colors"
          >
            {support.action}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </a>
        )}
      </div>
    </motion.div>
  )
}
