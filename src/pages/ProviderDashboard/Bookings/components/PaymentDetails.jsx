import { memo } from 'react'
import { IndianRupee, CreditCard, Hash, CheckCircle, Clock, XCircle } from 'lucide-react'
import { cn } from '../../../../utils'

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-2">
      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
        <Icon size={14} className="text-gray-500" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-medium text-secondary">{value || 'Not provided'}</p>
      </div>
    </div>
  )
}

function PaymentDetails({ payment }) {
  if (!payment) {
    return (
      <div className="py-8 text-center">
        <p className="text-sm text-gray-400">Payment information not available.</p>
      </div>
    )
  }

  const statusConfig = {
    paid: { icon: CheckCircle, label: 'Paid', className: 'text-green-600 bg-green-50' },
    pending: { icon: Clock, label: 'Pending', className: 'text-amber-600 bg-amber-50' },
    unpaid: { icon: XCircle, label: 'Unpaid', className: 'text-red-600 bg-red-50' },
  }

  const config = statusConfig[payment.status] || statusConfig.pending
  const StatusIcon = config.icon

  return (
    <div>
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-50">
        <p className="text-sm font-heading font-semibold text-secondary">Payment Summary</p>
        <span className={cn('inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full', config.className)}>
          <StatusIcon size={12} aria-hidden="true" />
          {config.label}
        </span>
      </div>

      <div className="divide-y divide-gray-50">
        <InfoRow icon={IndianRupee} label="Total Amount" value={`₹${payment.amount.toLocaleString()}`} />
        <InfoRow icon={CreditCard} label="Payment Method" value={payment.method} />
        {payment.transactionRef && (
          <InfoRow icon={Hash} label="Transaction Ref" value={payment.transactionRef} />
        )}
      </div>
    </div>
  )
}

export default memo(PaymentDetails)
