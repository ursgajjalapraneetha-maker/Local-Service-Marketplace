import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Power, PowerOff, AlertTriangle, X } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AvailabilityToggle({ isAvailable, onToggle }) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [animating, setAnimating] = useState(false)

  const handleToggle = useCallback(() => {
    if (isAvailable) {
      setShowConfirm(true)
    } else {
      setAnimating(true)
      setTimeout(() => {
        onToggle?.(true)
        setAnimating(false)
        toast.success('You are now available for bookings', { icon: '🟢' })
      }, 400)
    }
  }, [isAvailable, onToggle])

  const confirmDisable = useCallback(() => {
    setShowConfirm(false)
    setAnimating(true)
    setTimeout(() => {
      onToggle?.(false)
      setAnimating(false)
      toast('Availability disabled — new bookings will pause', { icon: '🔴' })
    }, 400)
  }, [onToggle])

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isAvailable ? (
            <Power size={16} className="text-green-500" aria-hidden="true" />
          ) : (
            <PowerOff size={16} className="text-gray-400" aria-hidden="true" />
          )}
          <span className="text-sm font-heading font-semibold text-secondary">Availability</span>
        </div>
        <div className="flex items-center gap-2">
          <AnimatePresence mode="wait">
            <motion.span
              key={isAvailable ? 'available' : 'unavailable'}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                isAvailable ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {isAvailable ? 'Available' : 'Unavailable'}
            </motion.span>
          </AnimatePresence>
          <button
            onClick={handleToggle}
            disabled={animating}
            className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
              isAvailable ? 'bg-green-500' : 'bg-gray-300'
            }`}
            aria-label={isAvailable ? 'Disable availability' : 'Enable availability'}
            role="switch"
            aria-checked={isAvailable}
          >
            <motion.span
              animate={{ x: isAvailable ? 22 : 2 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 p-3 rounded-lg bg-amber-50 border border-amber-100"
          >
            <div className="flex items-start gap-2">
              <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" aria-hidden="true" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-amber-800">Disable availability?</p>
                <p className="text-[11px] text-amber-600 mt-0.5">
                  Customers won't be able to book new appointments while you're unavailable.
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={confirmDisable}
                    className="px-3 py-1 text-xs font-semibold text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                  >
                    Disable
                  </button>
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="px-3 py-1 text-xs font-medium text-gray-600 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowConfirm(false)}
                className="text-amber-400 hover:text-amber-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 rounded"
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
