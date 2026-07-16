import { memo, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, MoreHorizontal, Star, MapPin, Phone, ArrowUpDown } from 'lucide-react'
import { cn, formatCurrency } from '../../../../utils'

const SORT_OPTIONS = [
  { key: 'name', label: 'Name' },
  { key: 'totalBookings', label: 'Bookings' },
  { key: 'totalSpent', label: 'Spent' },
  { key: 'rating', label: 'Rating' },
]

function CustomerTable({ customers }) {
  const [sortKey, setSortKey] = useState('name')
  const [sortDir, setSortDir] = useState('asc')
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

  const sorted = [...customers].sort((a, b) => {
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
        <table className="w-full text-sm" role="table" aria-label="Customers table">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('name')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded"
                >
                  Customer
                  <ArrowUpDown size={12} className={cn(sortKey === 'name' ? 'text-primary' : 'text-gray-200')} />
                </button>
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Contact</th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('totalBookings')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded"
                >
                  Bookings
                  <ArrowUpDown size={12} className={cn(sortKey === 'totalBookings' ? 'text-primary' : 'text-gray-200')} />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('totalSpent')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded"
                >
                  Total Spent
                  <ArrowUpDown size={12} className={cn(sortKey === 'totalSpent' ? 'text-primary' : 'text-gray-200')} />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('rating')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded"
                >
                  Rating
                  <ArrowUpDown size={12} className={cn(sortKey === 'rating' ? 'text-primary' : 'text-gray-200')} />
                </button>
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((customer, i) => (
              <motion.tr
                key={customer.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.02 * i }}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                      <span className="text-xs font-semibold text-primary">{customer.name.charAt(0)}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-secondary truncate">{customer.name}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <MapPin size={11} aria-hidden="true" />
                        <span className="truncate">{customer.location}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <Phone size={13} aria-hidden="true" />
                    <span>{customer.phone}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-secondary">{customer.totalBookings}</div>
                  <div className="text-xs text-gray-400">{customer.completedBookings} completed</div>
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-secondary">{formatCurrency(customer.totalSpent)}</td>
                <td className="px-4 py-3">
                  {customer.rating > 0 ? (
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-amber-400 fill-amber-400" aria-hidden="true" />
                      <span className="text-sm font-medium text-secondary">{customer.rating}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-300">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={cn(
                    'text-[10px] font-semibold px-1.5 py-0.5 rounded-full',
                    customer.status === 'returning' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                  )}>
                    {customer.status === 'returning' ? 'Returning' : 'New'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="relative inline-block">
                    <button
                      onClick={() => setMenuId(menuId === customer.id ? null : customer.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-secondary hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                      aria-label={`Actions for ${customer.name}`}
                    >
                      <MoreHorizontal size={16} />
                    </button>
                    {menuId === customer.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setMenuId(null)} aria-hidden="true" />
                        <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl border border-gray-100 shadow-xl z-20 py-1">
                          <button
                            onClick={() => { setMenuId(null); navigate(`/provider-dashboard/customers/${customer.id}`) }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            <Eye size={14} /> View Profile
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

export default memo(CustomerTable)
