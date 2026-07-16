import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { IndianRupee, CalendarDays, FileText } from 'lucide-react'
import PaymentStatusBadge from './PaymentStatusBadge'

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function PaymentCard({ payment, index, onViewInvoice }) {
  const handleInvoice = useCallback(() => {
    onViewInvoice?.(payment)
  }, [onViewInvoice, payment])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.03 * index }}
      layout
      className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-sm transition-shadow"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[11px] font-mono text-gray-400">{payment.bookingId}</span>
          </div>
          <h3 className="text-sm font-semibold text-secondary">{payment.serviceName}</h3>
          <p className="text-xs text-gray-500">{payment.provider}</p>
        </div>
        <PaymentStatusBadge status={payment.status} />
      </div>

      <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
        <span className="flex items-center gap-1">
          <CalendarDays size={12} className="text-gray-400" aria-hidden="true" />
          {formatDate(payment.date)}
        </span>
        <span className="text-gray-300">·</span>
        <span>{payment.paymentMethod}</span>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
        <span className="text-base font-heading font-bold text-primary">
          <IndianRupee size={13} className="inline" />
          {payment.amount?.toLocaleString()}
        </span>
        {(payment.status === 'completed' || payment.status === 'refunded') && (
          <button
            onClick={handleInvoice}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            aria-label={`View invoice for ${payment.serviceName}`}
          >
            <FileText size={11} />
            Invoice
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default memo(PaymentCard)
