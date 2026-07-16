import { memo } from 'react'
import { motion } from 'framer-motion'
import { Heart, CheckCircle, Percent, Star } from 'lucide-react'

const SUMMARY_CARDS = [
  { key: 'total', label: 'Total Wishlist', icon: Heart, color: 'bg-danger/10 text-danger' },
  { key: 'available', label: 'Available Services', icon: CheckCircle, color: 'bg-success/10 text-success' },
  { key: 'discounted', label: 'Discounted Services', icon: Percent, color: 'bg-warning/10 text-warning' },
  { key: 'avgRating', label: 'Average Rating', icon: Star, color: 'bg-primary/10 text-primary' },
]

function WishlistSummary({ summary }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {SUMMARY_CARDS.map(({ key, label, icon: Icon, color }, i) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.06 * i }}
          whileHover={{ y: -2 }}
          className="bg-white rounded-xl border border-gray-100 p-4"
        >
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
            <Icon size={18} aria-hidden="true" />
          </div>
          <p className="mt-2 text-xl font-heading font-bold text-secondary">
            {summary?.[key] ?? 0}
          </p>
          <p className="text-xs text-gray-500">{label}</p>
        </motion.div>
      ))}
    </div>
  )
}

export default memo(WishlistSummary)
