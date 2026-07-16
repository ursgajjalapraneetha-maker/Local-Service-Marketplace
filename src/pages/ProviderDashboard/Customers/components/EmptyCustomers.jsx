import { memo } from 'react'
import { motion } from 'framer-motion'
import { Users, Search, Filter } from 'lucide-react'

function EmptyCustomers({ hasFilters }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-xl border border-gray-100"
      role="status"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-5">
        {hasFilters ? (
          <div className="relative">
            <Search size={28} className="text-primary/40" aria-hidden="true" />
            <Filter size={14} className="text-primary absolute -top-1 -right-2" aria-hidden="true" />
          </div>
        ) : (
          <Users size={28} className="text-primary/40" aria-hidden="true" />
        )}
      </div>
      <h3 className="text-lg font-heading font-semibold text-secondary mb-1">
        {hasFilters ? 'No customers match your filters' : 'No customers yet'}
      </h3>
      <p className="text-sm text-gray-500 text-center max-w-sm">
        {hasFilters
          ? 'Try adjusting your search or filter criteria to find what you are looking for.'
          : 'When customers book your services, they will appear here.'}
      </p>
    </motion.div>
  )
}

export default memo(EmptyCustomers)
