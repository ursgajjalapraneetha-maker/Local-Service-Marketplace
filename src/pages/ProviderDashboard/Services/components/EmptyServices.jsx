import { memo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Wrench, Plus, Search, Filter } from 'lucide-react'

function EmptyServices({ hasFilters }) {
  const navigate = useNavigate()

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
          <Wrench size={28} className="text-primary/40" aria-hidden="true" />
        )}
      </div>
      <h3 className="text-lg font-heading font-semibold text-secondary mb-1">
        {hasFilters ? 'No services match your filters' : 'No services yet'}
      </h3>
      <p className="text-sm text-gray-500 text-center max-w-sm mb-6">
        {hasFilters
          ? 'Try adjusting your search or filter criteria to find what you are looking for.'
          : 'Start by creating your first service to begin offering your skills on the marketplace.'}
      </p>
      {!hasFilters && (
        <button
          onClick={() => navigate('/provider-dashboard/services/add')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all active:scale-[0.97] shadow-lg shadow-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          <Plus size={16} />
          Add Your First Service
        </button>
      )}
    </motion.div>
  )
}

export default memo(EmptyServices)
