import { memo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../../utils'

const VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: 0.06 * i },
  }),
}

function StatsCard({ icon: Icon, label, value, subtext, color, index, trend }) {
  return (
    <motion.div
      variants={VARIANTS}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover={{ y: -3, boxShadow: '0 12px 24px -8px rgba(0,0,0,0.08)' }}
      className="relative bg-white rounded-xl border border-gray-100 p-5 transition-shadow cursor-default"
      role="region"
      aria-label={`${label}: ${value}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', color)}>
          <Icon size={18} aria-hidden="true" />
        </div>
        {trend && (
          <span
            className={cn(
              'inline-flex items-center gap-0.5 text-[11px] font-semibold px-1.5 py-0.5 rounded-full',
              trend.direction === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
            )}
          >
            <svg
              className={cn('w-3 h-3', trend.direction === 'down' && 'rotate-180')}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
            {trend.value}
          </span>
        )}
      </div>
      <p className="text-2xl font-heading font-bold text-secondary">{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
      {subtext && <p className="text-[11px] text-gray-400 mt-0.5">{subtext}</p>}
    </motion.div>
  )
}

export default memo(StatsCard)
