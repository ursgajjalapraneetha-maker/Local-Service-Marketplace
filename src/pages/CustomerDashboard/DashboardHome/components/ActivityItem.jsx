import { memo } from 'react'
import { motion } from 'framer-motion'

const ICON_MAP = {
  booking: 'text-primary bg-primary/5',
  payment: 'text-success bg-success/10',
  review: 'text-warning bg-warning/10',
  wishlist: 'text-danger bg-danger/10',
}

function ActivityItem({ activity, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.05 * index }}
      className="relative flex items-start gap-3 pb-5 last:pb-0"
    >
      <div className="relative flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${ICON_MAP[activity.type] || 'bg-gray-100 text-gray-500'}`}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {activity.icon === 'check' && <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />}
            {activity.icon === 'credit' && <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />}
            {activity.icon === 'star' && <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />}
            {activity.icon === 'heart' && <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />}
          </svg>
        </div>
        <div className="absolute top-8 bottom-0 w-px bg-gray-100" aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0 pt-1">
        <p className="text-sm font-medium text-secondary">{activity.title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{activity.description}</p>
        <p className="text-[11px] text-gray-400 mt-1">{activity.time}</p>
      </div>
    </motion.div>
  )
}

export default memo(ActivityItem)
