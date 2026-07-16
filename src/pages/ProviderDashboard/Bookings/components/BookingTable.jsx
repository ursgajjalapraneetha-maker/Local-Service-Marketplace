import { memo, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, MoreHorizontal, ArrowUpDown } from 'lucide-react'
import BookingStatusBadge from './BookingStatusBadge'
import { cn } from '../../../../utils'

const SORT_OPTIONS = [
  { key: 'date', label: 'Date' },
  { key: 'amount', label: 'Amount' },
]

function BookingTable({ bookings }) {
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

  const sorted = [...bookings].sort((a, b) => {
    let valA = a[sortKey]
    let valB = b[sortKey]
    if (typeof valA === 'string') valA = valA.toLowerCase()
    if (typeof valB === 'string') valB = valB.toLowerCase()
    if (valA < valB) return sortDir === 'asc' ? -1 : 1
    if (valA > valB) return sortDir === 'asc' ? 1 : -1
    return 0
  })

  const getPaymentStyle = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-50 text-green-600'
      case 'pending': return 'bg-amber-50 text-amber-600'
      default: return 'bg-gray-50 text-gray-500'
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="table" aria-label="Bookings table">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Booking ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Customer</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Service</th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('date')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded"
                >
                  Date & Time
                  <ArrowUpDown size={12} className={cn(sortKey === 'date' ? 'text-primary' : 'text-gray-200')} />
                </button>
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Location</th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('amount')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded"
                >
                  Amount
                  <ArrowUpDown size={12} className={cn(sortKey === 'amount' ? 'text-primary' : 'text-gray-200')} />
                </button>
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Payment</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((booking, i) => (
              <motion.tr
                key={booking.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.02 * i }}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <span className="text-xs font-mono font-medium text-gray-500">{booking.id}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                      <span className="text-xs font-semibold text-primary">{booking.customer.name.charAt(0)}</span>
                    </div>
                    <span className="text-sm font-medium text-secondary">{booking.customer.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{booking.service.name}</td>
                <td className="px-4 py-3">
                  <div className="text-sm text-secondary">{booking.date}</div>
                  <div className="text-xs text-gray-400">{booking.time}</div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 max-w-[140px] truncate">{booking.location}</td>
                <td className="px-4 py-3 text-sm font-semibold text-secondary">₹{booking.amount.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className={cn('text-[10px] font-semibold px-1.5 py-0.5 rounded-full capitalize', getPaymentStyle(booking.paymentStatus))}>
                    {booking.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <BookingStatusBadge status={booking.bookingStatus} />
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="relative inline-block">
                    <button
                      onClick={() => setMenuId(menuId === booking.id ? null : booking.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-secondary hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                      aria-label={`Actions for ${booking.id}`}
                    >
                      <MoreHorizontal size={16} />
                    </button>
                    {menuId === booking.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setMenuId(null)} aria-hidden="true" />
                        <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl border border-gray-100 shadow-xl z-20 py-1">
                          <button
                            onClick={() => { setMenuId(null); navigate(`/provider-dashboard/bookings/${booking.id}`) }}
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

export default memo(BookingTable)
