import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Eye, IndianRupee, CalendarDays, User, Wrench } from 'lucide-react'
import PaymentStatusBadge from './PaymentStatusBadge'

function TransactionCard({ transaction, index }) {
  const navigate = useNavigate()

  const handleView = useCallback(() => {
    navigate(`/provider-dashboard/earnings/transactions/${transaction.id}`)
  }, [navigate, transaction.id])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.03 * index }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl border border-gray-100 p-4 transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
            <IndianRupee size={18} className="text-primary" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-secondary truncate">{transaction.service}</p>
            <p className="text-xs text-gray-500">{transaction.customer}</p>
          </div>
        </div>
        <PaymentStatusBadge status={transaction.status} />
      </div>

      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
        <span className="flex items-center gap-1">
          <CalendarDays size={12} aria-hidden="true" />
          {transaction.date}
        </span>
        <span className="flex items-center gap-1">
          <Wrench size={12} aria-hidden="true" />
          {transaction.paymentMethod}
        </span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <div>
          <span className="text-sm font-heading font-bold text-secondary">
            ₹{transaction.amount.toLocaleString()}
          </span>
          <span className="text-xs text-gray-400 ml-2">ID: {transaction.id}</span>
        </div>
        <button
          onClick={handleView}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-label={`View transaction ${transaction.id}`}
        >
          <Eye size={13} />
          Details
        </button>
      </div>
    </motion.div>
  )
}

export default memo(TransactionCard)
