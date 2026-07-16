import { memo, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, X, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function RecentlyViewedDrawer({ items, isOpen, onClose, onClear, onRemove }) {
  const navigate = useNavigate()
  const drawerRef = useRef(null)

  const handleEsc = useCallback((e) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
      drawerRef.current?.focus()
    } else {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleEsc])

  const handleItemClick = useCallback((slug) => {
    onClose()
    navigate(`/service/${slug}`)
  }, [onClose, navigate])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col focus:outline-none"
            role="dialog"
            aria-modal="true"
            aria-label="Recently viewed services"
            tabIndex={-1}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-primary" />
                <h2 className="text-base font-heading font-semibold text-secondary">
                  Recently Viewed
                </h2>
              </div>
              <div className="flex items-center gap-1">
                {items.length > 0 && (
                  <button
                    onClick={onClear}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                    aria-label="Clear recently viewed"
                    title="Clear all"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                  aria-label="Close recently viewed"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Clock size={40} className="text-gray-200 mb-3" />
                  <p className="text-sm text-gray-400">No recently viewed services</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleItemClick(service.slug)}
                      className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 group"
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-16 h-16 rounded-lg object-cover shrink-0"
                        loading="lazy"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-secondary truncate">
                          {service.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {service.category}
                        </p>
                        <p className="text-sm font-semibold text-primary mt-1">
                          ₹{service.price?.toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onRemove(service.id)
                        }}
                        className="p-1 text-gray-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                        aria-label={`Remove ${service.title} from recently viewed`}
                      >
                        <X size={14} />
                      </button>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default memo(RecentlyViewedDrawer)
