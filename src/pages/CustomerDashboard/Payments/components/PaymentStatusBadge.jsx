import { memo } from 'react'
import { CheckCircle, Clock, XCircle, RotateCcw } from 'lucide-react'

const STATUS_CONFIG = {
  completed: {
    label: 'Completed',
    icon: CheckCircle,
    color: 'bg-success/10 text-success',
  },
  pending: {
    label: 'Pending',
    icon: Clock,
    color: 'bg-warning/10 text-warning',
  },
  failed: {
    label: 'Failed',
    icon: XCircle,
    color: 'bg-danger/10 text-danger',
  },
  refunded: {
    label: 'Refunded',
    icon: RotateCcw,
    color: 'bg-blue-100 text-blue-600',
  },
}

function PaymentStatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending
  const Icon = config.icon

  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${config.color}`}>
      <Icon size={11} aria-hidden="true" />
      {config.label}
    </span>
  )
}

export default memo(PaymentStatusBadge)
