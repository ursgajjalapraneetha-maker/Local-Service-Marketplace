import { memo, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  CheckCircle,
  XCircle,
  CalendarCheck,
  PlayCircle,
  Star,
  Wrench,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { cn } from '../../../../utils'

const ACTIONS_BY_STATUS = {
  pending: [
    {
      key: 'accept',
      label: 'Accept Booking',
      icon: CheckCircle,
      className: 'bg-green-50 text-green-700 hover:bg-green-100 border-green-200',
      nextStatus: 'accepted',
    },
    {
      key: 'reject',
      label: 'Reject Booking',
      icon: XCircle,
      className: 'bg-red-50 text-red-700 hover:bg-red-100 border-red-200',
      nextStatus: 'rejected',
      requiresConfirm: true,
    },
  ],
  accepted: [
    {
      key: 'schedule',
      label: 'Schedule Service',
      icon: CalendarCheck,
      className: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200',
      nextStatus: 'scheduled',
    },
    {
      key: 'cancel',
      label: 'Cancel Booking',
      icon: XCircle,
      className: 'bg-red-50 text-red-700 hover:bg-red-100 border-red-200',
      nextStatus: 'cancelled',
      requiresConfirm: true,
    },
  ],
  scheduled: [
    {
      key: 'start',
      label: 'Start Service',
      icon: PlayCircle,
      className: 'bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200',
      nextStatus: 'in-progress',
    },
    {
      key: 'cancel',
      label: 'Cancel Booking',
      icon: XCircle,
      className: 'bg-red-50 text-red-700 hover:bg-red-100 border-red-200',
      nextStatus: 'cancelled',
      requiresConfirm: true,
    },
  ],
  'in-progress': [
    {
      key: 'complete',
      label: 'Complete Service',
      icon: Star,
      className: 'bg-green-50 text-green-700 hover:bg-green-100 border-green-200',
      nextStatus: 'completed',
    },
  ],
}

function ConfirmModal({ action, onConfirm, onCancel, loading }) {
  if (!action) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Confirm action">
      <div className="fixed inset-0 bg-black/40" onClick={onCancel} aria-hidden="true" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm"
      >
        <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
          <Wrench size={24} className="text-danger" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-secondary text-center mb-1">
          Confirm {action.label}
        </h3>
        <p className="text-sm text-gray-500 text-center mb-6">
          Are you sure you want to {action.key} this booking? This action will update the booking status.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-danger rounded-xl hover:bg-red-600 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/30 disabled:opacity-50 inline-flex items-center justify-center gap-2"
          >
            {loading && (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  )
}

function BookingActions({ bookingStatus, onStatusChange }) {
  const [loading, setLoading] = useState(null)
  const [confirmAction, setConfirmAction] = useState(null)

  const actions = ACTIONS_BY_STATUS[bookingStatus] || []

  const handleAction = useCallback((action) => {
    if (action.requiresConfirm) {
      setConfirmAction(action)
    } else {
      executeAction(action)
    }
  }, [])

  const executeAction = useCallback((action) => {
    setLoading(action.key)
    setConfirmAction(null)
    setTimeout(() => {
      setLoading(null)
      onStatusChange?.(action.nextStatus)
      toast.success(`Booking ${action.label.toLowerCase()}d successfully`)
    }, 800)
  }, [onStatusChange])

  if (actions.length === 0) return null

  return (
    <div>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Actions</p>
      <div className="flex flex-col gap-2">
        {actions.map((action) => {
          const Icon = action.icon
          const isLoading = loading === action.key
          return (
            <button
              key={action.key}
              onClick={() => handleAction(action)}
              disabled={isLoading}
              className={cn(
                'w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl border transition-all disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
                action.className
              )}
            >
              {isLoading ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <Icon size={16} aria-hidden="true" />
              )}
              {action.label}
            </button>
          )
        })}
      </div>

      <ConfirmModal
        action={confirmAction}
        onConfirm={() => executeAction(confirmAction)}
        onCancel={() => setConfirmAction(null)}
        loading={loading !== null}
      />
    </div>
  )
}

export default memo(BookingActions)
