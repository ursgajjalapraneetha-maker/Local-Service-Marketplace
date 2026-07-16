import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Eye, CalendarDays } from 'lucide-react'
import toast from 'react-hot-toast'
import { formatCurrency } from '../../../../utils'
import PaymentStatusBadge from './PaymentStatusBadge'

function InvoiceCard({ invoice, index }) {
  const handleView = useCallback(() => {
    toast.success(`Opening invoice ${invoice.id}`)
  }, [invoice.id])

  const handleDownload = useCallback(() => {
    toast.success(`Downloading ${invoice.id}`)
  }, [invoice.id])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.04 * index }}
      className="flex items-center justify-between p-4 rounded-lg border border-gray-50 hover:bg-gray-50/50 transition-colors"
    >
      <div className="flex items-start gap-3 min-w-0">
        <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
          <FileText size={18} className="text-primary" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-secondary">{invoice.id}</p>
            <PaymentStatusBadge status={invoice.status === 'paid' ? 'completed' : 'pending'} />
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{invoice.service} — {invoice.customer}</p>
          <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
            <span className="flex items-center gap-1">
              <CalendarDays size={11} aria-hidden="true" />
              {invoice.date}
            </span>
            <span className="font-semibold text-secondary">{formatCurrency(invoice.amount)}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1 shrink-0 ml-3">
        <button
          onClick={handleView}
          className="p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-label={`View ${invoice.id}`}
        >
          <Eye size={15} />
        </button>
        <button
          onClick={handleDownload}
          className="p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-label={`Download ${invoice.id}`}
        >
          <Download size={15} />
        </button>
      </div>
    </motion.div>
  )
}

export default memo(InvoiceCard)
