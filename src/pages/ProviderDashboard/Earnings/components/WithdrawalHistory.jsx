import { memo } from 'react'
import { motion } from 'framer-motion'
import { ArrowDownLeft, CalendarDays, IndianRupee } from 'lucide-react'
import PaymentStatusBadge from './PaymentStatusBadge'
import { formatCurrency } from '../../../../utils'

function WithdrawalHistory({ withdrawals = [] }) {
  if (withdrawals.length === 0) {
    return (
      <div className="py-8 text-center">
        <ArrowDownLeft size={24} className="text-gray-200 mx-auto mb-2" aria-hidden="true" />
        <p className="text-sm text-gray-400">No withdrawal history yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {withdrawals.map((wd, i) => (
        <motion.div
          key={wd.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, delay: 0.03 * i }}
          className="flex items-center justify-between p-3 rounded-lg border border-gray-50 hover:bg-gray-50/50 transition-colors"
        >
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
              <ArrowDownLeft size={15} className="text-gray-500" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-secondary">{wd.method}</p>
              <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                <span className="flex items-center gap-1">
                  <CalendarDays size={11} aria-hidden="true" />
                  {wd.date}
                </span>
                <span>{wd.account}</span>
              </div>
            </div>
          </div>
          <div className="text-right shrink-0 ml-3">
            <p className="text-sm font-semibold text-secondary">{formatCurrency(wd.amount)}</p>
            <PaymentStatusBadge status={wd.status} />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default memo(WithdrawalHistory)
