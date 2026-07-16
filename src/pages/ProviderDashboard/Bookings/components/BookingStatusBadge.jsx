import { memo } from 'react'
import { cn } from '../../../../utils'
import {
  Clock,
  CheckCircle,
  XCircle,
  CalendarCheck,
  PlayCircle,
  Ban,
  ArrowRight,
} from 'lucide-react'

const CONFIG = {
  pending: {
    icon: Clock,
    label: 'Pending',
    className: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
  },
  accepted: {
    icon: CheckCircle,
    label: 'Accepted',
    className: 'bg-blue-50 text-blue-700 border-blue-200',
    dot: 'bg-blue-500',
  },
  scheduled: {
    icon: CalendarCheck,
    label: 'Scheduled',
    className: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    dot: 'bg-indigo-500',
  },
  'in-progress': {
    icon: PlayCircle,
    label: 'In Progress',
    className: 'bg-purple-50 text-purple-700 border-purple-200',
    dot: 'bg-purple-500',
  },
  completed: {
    icon: CheckCircle,
    label: 'Completed',
    className: 'bg-green-50 text-green-700 border-green-200',
    dot: 'bg-green-500',
  },
  cancelled: {
    icon: Ban,
    label: 'Cancelled',
    className: 'bg-red-50 text-red-700 border-red-200',
    dot: 'bg-red-500',
  },
  rejected: {
    icon: XCircle,
    label: 'Rejected',
    className: 'bg-red-50 text-red-700 border-red-200',
    dot: 'bg-red-500',
  },
}

function BookingStatusBadge({ status, className, showIcon = true }) {
  const config = CONFIG[status] || CONFIG.pending
  const Icon = config.icon

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border',
        config.className,
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full', config.dot)} aria-hidden="true" />
      {showIcon && <Icon size={11} aria-hidden="true" />}
      {config.label}
    </span>
  )
}

export { CONFIG }
export default memo(BookingStatusBadge)
