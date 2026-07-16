import { memo, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, Pencil, Trash2, Star, MoreHorizontal, ArrowUpDown } from 'lucide-react'
import { cn, formatCurrency, formatDate } from '../../../../utils'
import ServiceStatusBadge from './ServiceStatusBadge'

const SORT_OPTIONS = [
  { key: 'name', label: 'Name' },
  { key: 'price', label: 'Price' },
  { key: 'totalBookings', label: 'Bookings' },
  { key: 'rating', label: 'Rating' },
  { key: 'createdAt', label: 'Created' },
]

function ServiceTable({ services, onDelete, onToggleStatus }) {
  const [sortKey, setSortKey] = useState('createdAt')
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

  const sorted = [...services].sort((a, b) => {
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
        <table className="w-full text-sm" role="table" aria-label="Services table">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Service</th>
              {SORT_OPTIONS.map(({ key, label }) => (
                <th key={key} className="text-left px-4 py-3">
                  <button
                    onClick={() => handleSort(key)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded"
                  >
                    {label}
                    <ArrowUpDown
                      size={12}
                      className={cn(
                        'transition-colors',
                        sortKey === key ? 'text-primary' : 'text-gray-200'
                      )}
                    />
                  </button>
                </th>
              ))}
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((service, i) => (
              <motion.tr
                key={service.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: 0.03 * i }}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-gray-50 overflow-hidden shrink-0">
                      {service.images?.[0] ? (
                        <img src={service.images[0]} alt="" className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-300">{service.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-secondary truncate">{service.name}</p>
                      <p className="text-xs text-gray-400">{service.category}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {service.pricingType === 'custom' ? (
                    <span className="text-sm font-medium text-primary">Custom</span>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-semibold text-secondary">
                        {formatCurrency(service.discountPrice || service.price)}
                      </span>
                      {service.pricingType === 'hourly' && <span className="text-[10px] text-gray-400">/hr</span>}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-secondary">{service.totalBookings}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-amber-400 fill-amber-400" aria-hidden="true" />
                    <span className="text-sm font-medium text-secondary">{service.rating}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{formatDate(service.createdAt)}</td>
                <td className="px-4 py-3">
                  <ServiceStatusBadge status={service.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="relative inline-block">
                    <button
                      onClick={() => setMenuId(menuId === service.id ? null : service.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-secondary hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                      aria-label={`Actions for ${service.name}`}
                    >
                      <MoreHorizontal size={16} />
                    </button>
                    {menuId === service.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setMenuId(null)} aria-hidden="true" />
                        <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl border border-gray-100 shadow-xl z-20 py-1">
                          <button
                            onClick={() => { setMenuId(null); navigate(`/provider-dashboard/services/${service.id}`) }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            <Eye size={14} /> View
                          </button>
                          <button
                            onClick={() => { setMenuId(null); navigate(`/provider-dashboard/services/${service.id}/edit`) }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            <Pencil size={14} /> Edit
                          </button>
                          <button
                            onClick={() => { setMenuId(null); onToggleStatus?.(service.id) }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            {service.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                          <hr className="my-1 border-gray-50" />
                          <button
                            onClick={() => { setMenuId(null); onDelete?.(service) }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-danger hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={14} /> Delete
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

export default memo(ServiceTable)
