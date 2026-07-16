import { memo, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Printer } from 'lucide-react'
import toast from 'react-hot-toast'
import InvoicePreview from './InvoicePreview'

function InvoiceModal({ invoice, isOpen, onClose }) {
  const handleDownload = useCallback(() => {
    toast.success('Invoice download started')
  }, [])

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Invoice details">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 rounded-t-2xl">
              <h2 className="text-base font-heading font-semibold text-secondary">Invoice Details</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="p-2 rounded-lg text-gray-400 hover:text-secondary hover:bg-gray-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                  aria-label="Print invoice"
                >
                  <Printer size={16} />
                </button>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-primary-dark transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                  aria-label="Download invoice"
                >
                  <Download size={14} />
                  <span className="hidden sm:inline">Download</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-gray-400 hover:text-secondary hover:bg-gray-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                  aria-label="Close invoice modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <InvoicePreview invoice={invoice} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default memo(InvoiceModal)
