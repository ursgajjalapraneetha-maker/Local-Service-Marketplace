import { memo } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, CheckCircle, Clock, RotateCcw } from 'lucide-react'

const SUMMARY_CARDS = [
  { key: 'total', label: 'Total Payments', icon: CreditCard, color: 'bg-primary/10 text-primary' },
  { key: 'completed', label: 'Completed', icon: CheckCircle, color: 'bg-success/10 text-success' },
  { key: 'pending', label: 'Pending', icon: Clock, color: 'bg-warning/10 text-warning' },
  { key: 'refunded', label: 'Refund Amount', icon: RotateCcw, color: 'bg-blue-100 text-blue-600', prefix: '₹' },
]

function PaymentSummary({ summary }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {SUMMARY_CARDS.map(({ key, label, icon: Icon, color, prefix }, i) => (
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
            {prefix || ''}{summary?.[key] ?? 0}
          </p>
          <p className="text-xs text-gray-500">{label}</p>
        </motion.div>
      ))}
    </div>
  )
}

export default memo(PaymentSummary)
