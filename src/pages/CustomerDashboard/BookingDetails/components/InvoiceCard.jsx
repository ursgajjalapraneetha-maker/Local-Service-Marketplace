import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Hash, Calendar } from 'lucide-react'
import toast from 'react-hot-toast'

function InvoiceCard({ invoice }) {
  const handleDownload = useCallback(() => {
    toast.success('Invoice download started')
  }, [])

  if (!invoice || !invoice.invoiceNumber) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
          Invoice
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-1.5">
            <span className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
              <FileText className="w-3.5 h-3.5" />
              Invoice Number
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {invoice.invoiceNumber}
            </span>
          </div>
          {invoice.transactionId && (
            <div className="flex items-center justify-between py-1.5">
              <span className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                <Hash className="w-3.5 h-3.5" />
                Transaction ID
              </span>
              <span className="text-sm font-mono text-gray-900 dark:text-white">
                {invoice.transactionId}
              </span>
            </div>
          )}
          {invoice.paymentDate && (
            <div className="flex items-center justify-between py-1.5">
              <span className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-3.5 h-3.5" />
                Payment Date
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {invoice.paymentDate}
              </span>
            </div>
          )}
          {invoice.dueDate && (
            <div className="flex items-center justify-between py-1.5">
              <span className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-3.5 h-3.5" />
                Due Date
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {invoice.dueDate}
              </span>
            </div>
          )}
          <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary/5 text-primary text-sm font-medium rounded-xl hover:bg-primary/10 transition-colors"
              aria-label="Download invoice"
            >
              <Download className="w-4 h-4" />
              Download Invoice
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default memo(InvoiceCard)
