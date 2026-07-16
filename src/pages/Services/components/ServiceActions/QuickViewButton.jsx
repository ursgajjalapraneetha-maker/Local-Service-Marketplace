import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'

function QuickViewButton({ service, onQuickView, serviceTitle }) {
  const handleClick = useCallback(
    (e) => {
      e.stopPropagation()
      e.preventDefault()
      onQuickView(service)
    },
    [service, onQuickView]
  )

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Quick view ${serviceTitle}`}
      className="p-2 rounded-lg bg-white/90 backdrop-blur-sm text-gray-700 shadow-sm hover:bg-white hover:text-primary transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
      title="Quick view"
    >
      <Eye size={15} />
    </motion.button>
  )
}

export default memo(QuickViewButton)
