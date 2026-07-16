import { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, RotateCcw, XCircle, Calendar, Download, Star } from 'lucide-react'
import toast from 'react-hot-toast'

function BookingActions({ booking, onCancel, onReschedule }) {
  const navigate = useNavigate()

  const handleBookAgain = useCallback(() => {
    navigate(`/services?search=${encodeURIComponent(booking.serviceName)}`)
  }, [navigate, booking.serviceName])

  const handleViewDetails = useCallback(() => {
    navigate(`/customer-dashboard/bookings/${booking.id}`)
  }, [navigate, booking.id])

  const handleCancel = useCallback(() => {
    onCancel?.(booking.id)
  }, [onCancel, booking.id])

  const handleReschedule = useCallback(() => {
    onReschedule?.(booking.id)
  }, [onReschedule, booking.id])

  const handleDownloadInvoice = useCallback(() => {
    toast.success('Invoice download started')
  }, [])

  const handleLeaveReview = useCallback(() => {
    navigate(`/customer-dashboard/reviews?booking=${booking.id}`)
  }, [navigate, booking.id])

  const actions = []

  if (booking.status === 'pending' || booking.status === 'confirmed') {
    actions.push(
      { label: 'Reschedule', icon: Calendar, onClick: handleReschedule, variant: 'secondary' },
      { label: 'Cancel', icon: XCircle, onClick: handleCancel, variant: 'danger' },
    )
  }

  if (booking.status === 'in_progress') {
    actions.push({ label: 'View Details', icon: Eye, onClick: handleViewDetails, variant: 'primary' })
  }

  if (booking.status === 'completed') {
    actions.push(
      { label: 'Book Again', icon: RotateCcw, onClick: handleBookAgain, variant: 'primary' },
      { label: 'Download Invoice', icon: Download, onClick: handleDownloadInvoice, variant: 'secondary' },
      { label: 'Leave Review', icon: Star, onClick: handleLeaveReview, variant: 'secondary' },
    )
  }

  if (booking.status === 'cancelled' || booking.status === 'rejected') {
    actions.push({ label: 'Book Again', icon: RotateCcw, onClick: handleBookAgain, variant: 'primary' })
  }

  actions.push({ label: 'View Details', icon: Eye, onClick: handleViewDetails, variant: 'ghost' })

  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary-dark',
    secondary: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
    danger: 'bg-danger/10 text-danger hover:bg-danger/20',
    ghost: 'text-gray-400 hover:text-secondary hover:bg-gray-100',
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {actions.map(({ label, icon: Icon, onClick, variant }) => (
        <button
          key={`${label}-${variant}`}
          onClick={onClick}
          className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold rounded-lg transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${variantStyles[variant]}`}
          aria-label={label}
        >
          <Icon size={12} />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  )
}

export default memo(BookingActions)
