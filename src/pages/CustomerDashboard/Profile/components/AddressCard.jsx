import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Edit2, Trash2, Star } from 'lucide-react'

function AddressCard({ address, onEdit, onDelete, onSetDefault }) {
  const handleEdit = useCallback(() => onEdit?.(address), [address, onEdit])
  const handleDelete = useCallback(() => onDelete?.(address.id), [address.id, onDelete])
  const handleSetDefault = useCallback(() => onSetDefault?.(address.id), [address.id, onSetDefault])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
      className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-sm transition-shadow"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <MapPin size={16} className="text-primary" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-secondary">{address.label}</span>
              {address.isDefault && (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                  <Star size={10} />
                  Default
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-0.5 truncate">
              {address.street}{address.apt ? `, ${address.apt}` : ''}
            </p>
            <p className="text-xs text-gray-500">
              {address.city}, {address.state} {address.zip}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {!address.isDefault && (
            <button
              onClick={handleSetDefault}
              className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              aria-label={`Set ${address.label} as default`}
              title="Set as default"
            >
              <Star size={14} />
            </button>
          )}
          <button
            onClick={handleEdit}
            className="p-1.5 rounded-lg text-gray-400 hover:text-secondary hover:bg-gray-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            aria-label={`Edit ${address.label} address`}
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 rounded-lg text-gray-400 hover:text-danger hover:bg-danger/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-danger/30"
            aria-label={`Delete ${address.label} address`}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default memo(AddressCard)
