import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Wallet, ArrowUpRight, IndianRupee, Clock, ArrowDownLeft } from 'lucide-react'
import { formatCurrency } from '../../../../utils'

function WalletCard({ wallet, onWithdraw }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-gradient-to-br from-primary via-primary-dark to-blue-700 rounded-2xl p-5 sm:p-6 text-white overflow-hidden relative"
      role="region"
      aria-label="Wallet"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" aria-hidden="true" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Wallet size={18} className="text-blue-200" aria-hidden="true" />
            <span className="text-sm font-medium text-blue-100">Wallet Balance</span>
          </div>
          <IndianRupee size={20} className="text-blue-200" aria-hidden="true" />
        </div>

        <p className="text-3xl sm:text-4xl font-heading font-bold mb-5">
          {formatCurrency(wallet.availableBalance)}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 text-blue-200 text-xs mb-1">
              <Clock size={12} aria-hidden="true" />
              Pending
            </div>
            <p className="text-sm font-semibold">{formatCurrency(wallet.pendingBalance)}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 text-blue-200 text-xs mb-1">
              <ArrowDownLeft size={12} aria-hidden="true" />
              Withdrawn
            </div>
            <p className="text-sm font-semibold">{formatCurrency(wallet.totalWithdrawn)}</p>
          </div>
        </div>

        <button
          onClick={onWithdraw}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-primary text-sm font-semibold rounded-xl hover:bg-blue-50 transition-all active:scale-[0.97] shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          aria-label="Withdraw money"
        >
          <ArrowUpRight size={16} />
          Withdraw Money
        </button>
      </div>
    </motion.div>
  )
}

export default memo(WalletCard)
