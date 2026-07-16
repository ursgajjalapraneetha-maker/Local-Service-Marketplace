import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Scale } from 'lucide-react'

function CompareButton({
  serviceId,
  isCompared,
  onToggle,
  serviceTitle,
  compareCount,
}) {
  const handleClick = useCallback(
    (e) => {
      e.stopPropagation()
      e.preventDefault()
      onToggle(serviceId)
    },
    [serviceId, onToggle]
  )

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.8 }}
      aria-label={
        isCompared
          ? `Remove ${serviceTitle} from compare`
          : `Add ${serviceTitle} to compare`
      }
      className={`
        relative p-2.5 rounded-xl border transition-all duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30
        ${
          isCompared
            ? 'bg-primary/5 border-primary/20 text-primary'
            : 'border-gray-200 text-gray-400 hover:text-primary hover:border-primary/30 hover:bg-primary/5'
        }
      `}
    >
      <Scale size={16} />
    </motion.button>
  )
}

export default memo(CompareButton)
