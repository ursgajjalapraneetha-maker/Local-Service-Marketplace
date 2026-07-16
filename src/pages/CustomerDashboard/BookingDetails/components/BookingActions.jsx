import { memo, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Eye,
  Download,
  XCircle,
  Calendar,
  RotateCcw,
  Star,
  Share2,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function ActionButton({ icon: Icon, label, onClick, variant = 'ghost', disabled }) {
  const baseStyles = 'flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50'
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow-md',
    ghost: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600',
    danger: 'bg-danger/10 text-danger hover:bg-danger/20',
    success: 'bg-success/10 text-success hover:bg-success/20',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      aria-label={label}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  )
}

function BookingActions({ booking, onCancel, onReschedule, bookingId }) {
  const navigate = useNavigate()

  const handleViewInvoice = useCallback(() => {
    navigate(`/customer-dashboard/invoices?booking=${bookingId}`)
  }, [navigate, bookingId])

  const handleDownloadInvoice = useCallback(() => {
    toast.success('Invoice download started')
  }, [])

  const handleCancel = useCallback(() => {
    onCancel?.(bookingId)
  }, [onCancel, bookingId])

  const handleReschedule = useCallback(() => {
    onReschedule?.(bookingId)
  }, [onReschedule, bookingId])

  const handleBookAgain = useCallback(() => {
    navigate(`/services?search=${encodeURIComponent(booking?.serviceName || '')}`)
  }, [navigate, booking])

  const handleLeaveReview = useCallback(() => {
    navigate(`/customer-dashboard/reviews?booking=${bookingId}`)
  }, [navigate, bookingId])

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: 'Booking Details',
        text: `Check out my booking ${bookingId}`,
        url: window.location.href,
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Booking link copied to clipboard')
    }
  }, [bookingId])

  const actions = useMemo(() => {
    const list = []

    switch (booking?.status) {
      case 'pending':
        list.push(
          { icon: XCircle, label: 'Cancel Booking', onClick: handleCancel, variant: 'danger' },
          { icon: Calendar, label: 'Reschedule', onClick: handleReschedule, variant: 'ghost' },
        )
        break

      case 'confirmed':
        list.push(
          { icon: XCircle, label: 'Cancel Booking', onClick: handleCancel, variant: 'danger' },
          { icon: Calendar, label: 'Reschedule', onClick: handleReschedule, variant: 'ghost' },
          { icon: Eye, label: 'View Invoice', onClick: handleViewInvoice, variant: 'ghost' },
        )
        break

      case 'in_progress':
        list.push(
          { icon: Calendar, label: 'Reschedule', onClick: handleReschedule, variant: 'ghost' },
          { icon: Eye, label: 'View Invoice', onClick: handleViewInvoice, variant: 'ghost' },
        )
        break

      case 'completed':
        list.push(
          { icon: RotateCcw, label: 'Book Again', onClick: handleBookAgain, variant: 'primary' },
          { icon: Star, label: 'Leave Review', onClick: handleLeaveReview, variant: 'ghost' },
          { icon: Download, label: 'Download Invoice', onClick: handleDownloadInvoice, variant: 'ghost' },
          { icon: Eye, label: 'View Invoice', onClick: handleViewInvoice, variant: 'ghost' },
        )
        break

      case 'cancelled':
      case 'rejected':
        list.push(
          { icon: RotateCcw, label: 'Book Again', onClick: handleBookAgain, variant: 'primary' },
          { icon: Eye, label: 'View Invoice', onClick: handleViewInvoice, variant: 'ghost' },
        )
        break
    }

    list.push({ icon: Share2, label: 'Share', onClick: handleShare, variant: 'ghost' })

    return list
  }, [
    booking?.status,
    handleCancel,
    handleReschedule,
    handleViewInvoice,
    handleBookAgain,
    handleLeaveReview,
    handleDownloadInvoice,
    handleShare,
  ])

  if (!actions.length) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55 }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
          Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {actions.map((action) => (
            <ActionButton
              key={action.label}
              icon={action.icon}
              label={action.label}
              onClick={action.onClick}
              variant={action.variant}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default memo(BookingActions)
