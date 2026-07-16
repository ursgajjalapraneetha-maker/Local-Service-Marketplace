import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Compass } from 'lucide-react'

function NotFound() {
  const navigate = useNavigate()
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
        <Compass size={28} className="text-gray-300" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-heading font-semibold text-secondary mb-1">Page Not Found</h3>
      <p className="text-sm text-gray-500 text-center max-w-xs mb-6">
        The page you are looking for does not exist in the Provider Dashboard.
      </p>
      <button
        onClick={() => navigate('/provider-dashboard')}
        className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
      >
        Back to Dashboard
      </button>
    </motion.div>
  )
}

export default memo(NotFound)
