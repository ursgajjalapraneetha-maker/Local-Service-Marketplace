import { memo, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Eye, Pencil, Trash2, MoreHorizontal, Star, Clock, MapPin, Users } from 'lucide-react'
import { cn, formatCurrency } from '../../../../utils'
import ServiceStatusBadge from './ServiceStatusBadge'

function ServiceCard({ service, onDelete, onToggleStatus, index }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleView = useCallback(() => {
    navigate(`/provider-dashboard/services/${service.id}`)
  }, [navigate, service.id])

  const handleEdit = useCallback(() => {
    navigate(`/provider-dashboard/services/${service.id}/edit`)
  }, [navigate, service.id])

  const handleToggle = useCallback(() => {
    setMenuOpen(false)
    onToggleStatus?.(service.id)
  }, [service.id, onToggleStatus])

  const handleDelete = useCallback(() => {
    setMenuOpen(false)
    onDelete?.(service)
  }, [service, onDelete])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.04 * index }}
      whileHover={{ y: -3 }}
      className="bg-white rounded-xl border border-gray-100 overflow-hidden group transition-shadow hover:shadow-lg"
    >
      <div className="relative h-40 bg-gray-50 overflow-hidden">
        {service.images?.[0] ? (
          <img
            src={service.images[0]}
            alt={service.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
              <span className="text-lg font-bold text-gray-300">{service.name.charAt(0)}</span>
            </div>
          </div>
        )}
        <div className="absolute top-2 right-2 flex items-center gap-1.5">
          <ServiceStatusBadge status={service.status} />
        </div>

        <div className="absolute top-2 left-2">
          <div className="relative">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="w-7 h-7 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-500 hover:text-secondary shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              aria-label="Service actions"
            >
              <MoreHorizontal size={14} />
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} aria-hidden="true" />
                <div className="absolute left-0 top-full mt-1 w-40 bg-white rounded-xl border border-gray-100 shadow-xl z-20 py-1">
                  <button
                    onClick={handleView}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <Eye size={14} /> View Details
                  </button>
                  <button
                    onClick={handleEdit}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    onClick={handleToggle}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    {service.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <hr className="my-1 border-gray-50" />
                  <button
                    onClick={handleDelete}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-danger hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="min-w-0">
            <h3 className="text-sm font-heading font-semibold text-secondary truncate">{service.name}</h3>
            <p className="text-xs text-gray-400">{service.category}</p>
          </div>
          <div className="flex items-center gap-0.5 shrink-0">
            <Star size={12} className="text-amber-400 fill-amber-400" aria-hidden="true" />
            <span className="text-xs font-semibold text-secondary">{service.rating}</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 line-clamp-2 mb-3 min-h-[32px]">
          {service.shortDescription}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div>
            {service.pricingType === 'custom' ? (
              <span className="text-sm font-heading font-bold text-primary">Custom Quote</span>
            ) : (
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-heading font-bold text-secondary">
                  {formatCurrency(service.discountPrice || service.price)}
                </span>
                {service.discountPrice && (
                  <span className="text-[11px] text-gray-400 line-through">
                    {formatCurrency(service.price)}
                  </span>
                )}
                {service.pricingType === 'hourly' && (
                  <span className="text-[10px] text-gray-400">/hr</span>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Clock size={12} aria-hidden="true" />
            {service.duration}
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div className="flex items-center gap-3 text-[11px] text-gray-400">
            <span className="flex items-center gap-1">
              <Users size={11} aria-hidden="true" />
              {service.totalBookings}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={11} aria-hidden="true" />
              {service.serviceArea}
            </span>
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={handleView}
              className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              aria-label={`View ${service.name}`}
            >
              <Eye size={14} />
            </button>
            <button
              onClick={handleEdit}
              className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              aria-label={`Edit ${service.name}`}
            >
              <Pencil size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default memo(ServiceCard)
