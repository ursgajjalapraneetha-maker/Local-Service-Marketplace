import { memo, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, AlertTriangle, Trash2, X } from 'lucide-react'
import toast from 'react-hot-toast'

function ConfirmModal({ open, title, message, confirmLabel, confirmVariant, onConfirm, onCancel, loading }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-5"
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                confirmVariant === 'danger' ? 'bg-red-50' : 'bg-amber-50'
              }`}>
                <AlertTriangle size={20} className={confirmVariant === 'danger' ? 'text-red-500' : 'text-amber-500'} aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-heading font-semibold text-secondary">{title}</h3>
                <p className="text-xs text-gray-500 mt-1">{message}</p>
                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={onConfirm}
                    disabled={loading}
                    className={`flex-1 py-2 text-xs font-semibold text-white rounded-lg transition-all disabled:opacity-50 focus:outline-none focus-visible:ring-2 ${
                      confirmVariant === 'danger' ? 'bg-red-500 hover:bg-red-600 focus-visible:ring-red-300' : 'bg-amber-500 hover:bg-amber-600 focus-visible:ring-amber-300'
                    }`}
                  >
                    {loading ? 'Processing...' : confirmLabel}
                  </button>
                  <button
                    onClick={onCancel}
                    className="flex-1 py-2 text-xs font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function AccountActions({ onLogout }) {
  const [showDeactivate, setShowDeactivate] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDeactivate = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setShowDeactivate(false)
      toast.success('Account deactivated')
    }, 1000)
  }, [])

  const handleDelete = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setShowDelete(false)
      toast.error('Account deletion requested. Check your email to confirm.')
    }, 1000)
  }, [])

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle size={16} className="text-danger" aria-hidden="true" />
        <h2 className="text-base font-heading font-semibold text-secondary">Account Actions</h2>
      </div>

      <div className="space-y-2">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-gray-100 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-secondary transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          <LogOut size={16} className="text-gray-400" aria-hidden="true" />
          Logout
        </button>

        <button
          onClick={() => setShowDeactivate(true)}
          className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-amber-100 text-sm font-medium text-amber-600 hover:bg-amber-50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
        >
          <AlertTriangle size={16} aria-hidden="true" />
          Deactivate Account
        </button>

        <button
          onClick={() => setShowDelete(true)}
          className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-red-100 text-sm font-medium text-red-600 hover:bg-red-50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
        >
          <Trash2 size={16} aria-hidden="true" />
          Delete Account
        </button>
      </div>

      <ConfirmModal
        open={showDeactivate}
        title="Deactivate Account"
        message="Your profile will be hidden and customers won't be able to book your services. You can reactivate anytime."
        confirmLabel="Deactivate"
        confirmVariant="warning"
        onConfirm={handleDeactivate}
        onCancel={() => setShowDeactivate(false)}
        loading={loading}
      />

      <ConfirmModal
        open={showDelete}
        title="Delete Account"
        message="This action is irreversible. All your data, including earnings history and reviews, will be permanently deleted."
        confirmLabel="Delete Forever"
        confirmVariant="danger"
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
        loading={loading}
      />
    </div>
  )
}

export default memo(AccountActions)
