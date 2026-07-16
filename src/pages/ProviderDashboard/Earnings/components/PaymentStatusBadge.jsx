import { memo } from 'react'
import { cn } from '../../../../utils'
import { CheckCircle, Clock, XCircle, RotateCw } from 'lucide-react'

const CONFIG = {
  completed: { icon: CheckCircle, label: 'Completed', className: 'bg-green-50 text-green-700 border-green-200', dot: 'bg-green-500' },
  pending: { icon: Clock, label: 'Pending', className: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  failed: { icon: XCircle, label: 'Failed', className: 'bg-red-50 text-red-700 border-red-200', dot: 'bg-red-500' },
  refunded: { icon: RotateCw, label: 'Refunded', className: 'bg-purple-50 text-purple-700 border-purple-200', dot: 'bg-purple-500' },
  processing: { icon: RotateCw, label: 'Processing', className: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
  rejected: { icon: XCircle, label: 'Rejected', className: 'bg-red-50 text-red-700 border-red-200', dot: 'bg-red-500' },
}

function PaymentStatusBadge({ status, className, showIcon = true }) {
  const config = CONFIG[status] || CONFIG.pending
  const Icon = config.icon

  return (
    <span className={cn('inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border', config.className, className)}>
      <span className={cn('w-1.5 h-1.5 rounded-full', config.dot)} aria-hidden="true" />
      {showIcon && <Icon size={11} aria-hidden="true" />}
      {config.label}
    </span>
  )
}

export { CONFIG }
export default memo(PaymentStatusBadge)
