import { memo } from 'react'

const STATUS_STYLES = {
  pending: 'bg-warning/10 text-warning border-warning/20',
  confirmed: 'bg-primary/5 text-primary border-primary/15',
  in_progress: 'bg-blue-100 text-blue-600 border-blue-200',
  completed: 'bg-success/10 text-success border-success/20',
  cancelled: 'bg-danger/10 text-danger border-danger/20',
  rejected: 'bg-red-100 text-red-600 border-red-200',
}

const STATUS_LABELS = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
  rejected: 'Rejected',
}

function BookingStatusBadge({ status, size = 'md' }) {
  const style = STATUS_STYLES[status] || 'bg-gray-100 text-gray-500 border-gray-200'
  const label = STATUS_LABELS[status] || status

  const sizeClasses = size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2.5 py-1'

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold rounded-full border ${style} ${sizeClasses}`}
      aria-label={`Status: ${label}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === 'pending' ? 'bg-warning' :
          status === 'confirmed' ? 'bg-primary' :
          status === 'in_progress' ? 'bg-blue-500' :
          status === 'completed' ? 'bg-success' :
          'bg-danger'
        }`}
        aria-hidden="true"
      />
      {label}
    </span>
  )
}

export default memo(BookingStatusBadge)
