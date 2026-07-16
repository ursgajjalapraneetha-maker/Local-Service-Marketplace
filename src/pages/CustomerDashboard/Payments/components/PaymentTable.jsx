import { memo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IndianRupee, FileText } from 'lucide-react'
import PaymentStatusBadge from './PaymentStatusBadge'
import PaymentCard from './PaymentCard'
import PaymentEmptyState from './PaymentEmptyState'

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function PaymentTable({ payments, onViewInvoice }) {
  if (payments.length === 0) return <PaymentEmptyState />

  const handleInvoice = useCallback((payment) => {
    onViewInvoice?.(payment)
  }, [onViewInvoice])

  return (
    <>
      <div className="hidden sm:block bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" role="table" aria-label="Payment history">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-3 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Booking ID</th>
                <th className="text-left px-3 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Service</th>
                <th className="text-left px-3 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Provider</th>
                <th className="text-right px-3 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="text-left px-3 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Method</th>
                <th className="text-left px-3 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th className="text-left px-3 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="text-left px-3 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-right px-3 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Invoice</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {payments.map((payment, i) => (
                  <motion.tr
                    key={payment.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.3, delay: 0.02 * i }}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                    role="row"
                  >
                    <td className="px-3 py-3">
                      <span className="text-[11px] font-mono text-gray-400">{payment.bookingId}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-sm font-medium text-secondary">{payment.serviceName}</span>
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-500">{payment.provider}</td>
                    <td className="px-3 py-3 text-right">
                      <span className="text-sm font-heading font-semibold text-secondary">
                        <IndianRupee size={11} className="inline" />
                        {payment.amount?.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-500">{payment.paymentMethod}</td>
                    <td className="px-3 py-3">
                      <span className="text-[11px] font-mono text-gray-400">{payment.transactionId}</span>
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-500 whitespace-nowrap">{formatDate(payment.date)}</td>
                    <td className="px-3 py-3"><PaymentStatusBadge status={payment.status} /></td>
                    <td className="px-3 py-3 text-right">
                      {(payment.status === 'completed' || payment.status === 'refunded') && (
                        <button
                          onClick={() => handleInvoice(payment)}
                          className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                          aria-label={`View invoice for ${payment.serviceName}`}
                        >
                          <FileText size={11} />
                          Invoice
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      <div className="sm:hidden space-y-3">
        <AnimatePresence mode="popLayout">
          {payments.map((payment, i) => (
            <motion.div
              key={payment.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <PaymentCard payment={payment} index={i} onViewInvoice={onViewInvoice} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  )
}

export default memo(PaymentTable)
