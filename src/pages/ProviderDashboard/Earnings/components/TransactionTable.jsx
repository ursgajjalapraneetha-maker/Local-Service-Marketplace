import { memo, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, MoreHorizontal, ArrowUpDown } from 'lucide-react'
import PaymentStatusBadge from './PaymentStatusBadge'
import { cn } from '../../../../utils'

const SORT_OPTIONS = [
  { key: 'date', label: 'Date' },
  { key: 'amount', label: 'Amount' },
]

function TransactionTable({ transactions }) {
  const [sortKey, setSortKey] = useState('date')
  const [sortDir, setSortDir] = useState('desc')
  const [menuId, setMenuId] = useState(null)
  const navigate = useNavigate()

  const handleSort = useCallback((key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }, [sortKey])

  const sorted = [...transactions].sort((a, b) => {
    let valA = a[sortKey]
    let valB = b[sortKey]
    if (typeof valA === 'string') valA = valA.toLowerCase()
    if (typeof valB === 'string') valB = valB.toLowerCase()
    if (valA < valB) return sortDir === 'asc' ? -1 : 1
    if (valA > valB) return sortDir === 'asc' ? 1 : -1
    return 0
  })

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="table" aria-label="Transactions table">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">ID</th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('date')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded"
                >
                  Date
                  <ArrowUpDown size={12} className={cn(sortKey === 'date' ? 'text-primary' : 'text-gray-200')} />
                </button>
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Service</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Customer</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Method</th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('amount')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded"
                >
                  Amount
                  <ArrowUpDown size={12} className={cn(sortKey === 'amount' ? 'text-primary' : 'text-gray-200')} />
                </button>
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((txn, i) => (
              <motion.tr
                key={txn.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.02 * i }}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <span className="text-xs font-mono font-medium text-gray-500">{txn.id}</span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{txn.date}</td>
                <td className="px-4 py-3 text-sm text-secondary font-medium">{txn.service}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{txn.customer}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{txn.paymentMethod}</td>
                <td className="px-4 py-3 text-sm font-semibold text-secondary">₹{txn.amount.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <PaymentStatusBadge status={txn.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="relative inline-block">
                    <button
                      onClick={() => setMenuId(menuId === txn.id ? null : txn.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-secondary hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                      aria-label={`Actions for ${txn.id}`}
                    >
                      <MoreHorizontal size={16} />
                    </button>
                    {menuId === txn.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setMenuId(null)} aria-hidden="true" />
                        <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl border border-gray-100 shadow-xl z-20 py-1">
                          <button
                            onClick={() => { setMenuId(null); navigate(`/provider-dashboard/earnings/transactions/${txn.id}`) }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            <Eye size={14} /> View Details
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default memo(TransactionTable)
