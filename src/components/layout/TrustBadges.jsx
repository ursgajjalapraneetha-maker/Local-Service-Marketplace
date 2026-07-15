import { motion } from 'framer-motion'
import { ShieldCheck, Award, Users, Sparkles, Star, Clock } from 'lucide-react'

const badges = [
  { icon: ShieldCheck, label: 'SSL Secure', color: 'from-green-500 to-emerald-600' },
  { icon: Award, label: 'Trustpilot 4.9★', color: 'from-blue-500 to-cyan-600' },
  { icon: Users, label: '10M+ Users', color: 'from-purple-500 to-violet-600' },
  { icon: Sparkles, label: '100% Verified', color: 'from-orange-500 to-amber-600' },
  { icon: Star, label: '4.9 Rating', color: 'from-yellow-500 to-orange-600' },
  { icon: Clock, label: '24/7 Support', color: 'from-red-500 to-rose-600' },
]

/**
 * TrustBadges
 *
 * Displays trust and credibility badges with hover animations.
 */
export default function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
      {badges.map(({ icon: Icon, label, color }, index) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          whileHover={{ scale: 1.05, y: -2 }}
          className="flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
        >
          <Icon size={16} className="text-white" />
          <span className="text-xs font-medium text-white whitespace-nowrap">
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  )
}
