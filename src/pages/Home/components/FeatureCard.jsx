import { motion } from 'framer-motion'
import {
  ShieldCheck, CreditCard, Clock, Headphones,
  CircleDollarSign, Star, Award, MapPin,
} from 'lucide-react'

const iconMap = {
  ShieldCheck, CreditCard, Clock, Headphones,
  CircleDollarSign, Star, Award, MapPin,
}

export default function FeatureCard({ feature, index }) {
  const Icon = iconMap[feature.icon] || ShieldCheck

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -6 }}
      className="group relative bg-white rounded-2xl border border-gray-100 p-6 sm:p-7 hover:border-primary/15 hover:shadow-xl hover:shadow-primary/5 transition-all"
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-5 group-hover:from-primary group-hover:to-primary-dark transition-all duration-300">
        <Icon
          size={26}
          className="text-primary group-hover:text-white group-hover:scale-110 transition-all duration-300"
          style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        />
      </div>

      {/* Title */}
      <h3 className="text-lg font-heading font-semibold text-secondary group-hover:text-primary transition-colors">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm text-gray-500 leading-relaxed">
        {feature.description}
      </p>

      {/* Subtle corner gradient accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/[0.03] to-transparent rounded-tr-2xl pointer-events-none" />
    </motion.div>
  )
}
