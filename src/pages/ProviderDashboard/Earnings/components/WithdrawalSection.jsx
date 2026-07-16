import { memo, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { IndianRupee, Banknote, Wallet, ArrowUpRight } from 'lucide-react'
import toast from 'react-hot-toast'
import { formatCurrency } from '../../../../utils'

const PAYMENT_METHODS = [
  { value: 'bank', label: 'Bank Transfer', icon: Banknote },
  { value: 'upi', label: 'UPI', icon: Wallet },
]

function WithdrawalSection({ wallet, onSuccess }) {
  const [amount, setAmount] = useState('')
  const [method, setMethod] = useState('bank')
  const [loading, setLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleMaxAmount = useCallback(() => {
    setAmount(String(wallet.availableBalance))
  }, [wallet.availableBalance])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    const numAmount = Number(amount)
    if (!amount || numAmount <= 0) {
      toast.error('Please enter a valid amount')
      return
    }
    if (numAmount > wallet.availableBalance) {
      toast.error('Insufficient balance')
      return
    }
    if (numAmount < 100) {
      toast.error('Minimum withdrawal is ₹100')
      return
    }
    setShowConfirm(true)
  }, [amount, wallet.availableBalance])

  const handleConfirm = useCallback(() => {
    setLoading(true)
    setShowConfirm(false)
    setTimeout(() => {
      setLoading(false)
      setAmount('')
      toast.success(`Withdrawal of ${formatCurrency(Number(amount))} initiated successfully`)
      onSuccess?.()
    }, 1200)
  }, [amount, onSuccess])

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <ArrowUpRight size={16} className="text-primary" aria-hidden="true" />
        <h3 className="text-sm font-heading font-semibold text-secondary">Withdraw Funds</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-400 mb-1">Available Balance</p>
          <p className="text-2xl font-heading font-bold text-secondary">{formatCurrency(wallet.availableBalance)}</p>
        </div>

        <div>
          <label htmlFor="withdrawAmount" className="block text-sm font-medium text-secondary mb-1.5">
            Amount <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <IndianRupee size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <input
              id="withdrawAmount"
              type="number"
              min="100"
              step="100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full pl-8 pr-16 py-2.5 text-sm border border-gray-200 rounded-lg text-secondary placeholder-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus:border-primary transition-colors"
            />
            <button
              type="button"
              onClick={handleMaxAmount}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-primary hover:text-primary-dark transition-colors px-2 py-1 rounded"
            >
              MAX
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary mb-2">Payment Method</label>
          <div className="flex gap-2">
            {PAYMENT_METHODS.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setMethod(value)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
                  method === value
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:text-secondary'
                }`}
              >
                <Icon size={16} aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          {loading && (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          <ArrowUpRight size={16} />
          Withdraw
        </button>
      </form>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-black/40" onClick={() => setShowConfirm(false)} aria-hidden="true" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <ArrowUpRight size={24} className="text-primary" />
            </div>
            <h3 className="text-lg font-heading font-semibold text-secondary text-center mb-1">Confirm Withdrawal</h3>
            <p className="text-sm text-gray-500 text-center mb-2">
              You are about to withdraw
            </p>
            <p className="text-2xl font-heading font-bold text-primary text-center mb-4">
              {formatCurrency(Number(amount))}
            </p>
            <p className="text-xs text-gray-400 text-center mb-5">
              via {method === 'bank' ? 'Bank Transfer' : 'UPI'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-primary-dark transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default memo(WithdrawalSection)
