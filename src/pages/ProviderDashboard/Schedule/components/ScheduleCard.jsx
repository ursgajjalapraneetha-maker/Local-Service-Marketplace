import { memo } from 'react'
import { motion } from 'framer-motion'

function ScheduleCard({ children, className = '', hoverable = true, onClick, padding = true }) {
  return (
    <motion.div
      whileHover={hoverable && onClick ? { y: -2 } : undefined}
      onClick={onClick}
      className={`bg-white rounded-xl border border-gray-100 transition-all ${
        hoverable ? 'hover:border-gray-200 hover:shadow-sm' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${padding ? 'p-5' : ''} ${className}`}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(e) } : undefined}
    >
      {children}
    </motion.div>
  )
}

export default memo(ScheduleCard)
