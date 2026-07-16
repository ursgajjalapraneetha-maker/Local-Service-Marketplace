import { memo, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'
import toast from 'react-hot-toast'

function DeleteAccountCard() {
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = useCallback(() => {
    toast.error('Account deletion is not available in demo mode')
    setShowConfirm(false)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-danger/20 p-6"
    >
      <h2 className="text-base font-heading font-semibold text-danger mb-2">Delete Account</h2>
      <p className="text-sm text-gray-500 mb-4">
        Permanently delete your account and all associated data. This action cannot be undone.
      </p>

      {!showConfirm ? (
        <button
          onClick={() => setShowConfirm(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-danger/10 text-danger text-sm font-semibold rounded-xl hover:bg-danger/20 transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-danger/30"
        >
          <AlertTriangle size={16} />
          <span>Delete My Account</span>
        </button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-danger/5 rounded-xl p-4 border border-danger/20 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-danger">Are you sure?</p>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-secondary hover:bg-gray-100 transition-all"
                  aria-label="Cancel deletion"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="text-xs text-gray-500">
                This will permanently delete your account, profile, bookings, and all associated data.
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-3 py-2 text-xs font-semibold text-secondary bg-white rounded-xl hover:bg-gray-100 transition-all border border-gray-200 flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-3 py-2 bg-danger text-white text-xs font-semibold rounded-xl hover:bg-red-700 transition-all flex-1"
                >
                  Yes, Delete My Account
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  )
}

export default memo(DeleteAccountCard)
