import { memo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { SearchX, ArrowLeft } from 'lucide-react'

function DashboardNotFound() {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-6">
        <SearchX className="w-10 h-10 text-gray-400" aria-hidden="true" />
      </div>
      <h2 className="text-xl font-heading font-bold text-secondary mb-2">Page Not Found</h2>
      <p className="text-sm text-gray-500 text-center max-w-md mb-8">
        The page you are looking for does not exist in your dashboard.
      </p>
      <button
        onClick={() => navigate('/customer-dashboard')}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </button>
    </motion.div>
  )
}

export default memo(DashboardNotFound)
