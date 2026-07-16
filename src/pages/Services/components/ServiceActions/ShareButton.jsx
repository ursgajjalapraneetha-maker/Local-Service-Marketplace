import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Share2 } from 'lucide-react'

function ShareButton({ service, onShare, serviceTitle }) {
  const handleClick = useCallback(
    (e) => {
      e.stopPropagation()
      e.preventDefault()
      onShare(service)
    },
    [service, onShare]
  )

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.8 }}
      aria-label={`Share ${serviceTitle}`}
      className="p-2.5 rounded-xl border border-gray-200 text-gray-400 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
    >
      <Share2 size={16} />
    </motion.button>
  )
}

export default memo(ShareButton)
