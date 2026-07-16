import { memo } from 'react'
import { motion } from 'framer-motion'

const ICONS = {
  bookings: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  ),
  completed: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  ),
  wishlist: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  ),
  spending: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  ),
}

function StatCard({ icon, label, value, trend, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 * index }}
      whileHover={{ y: -4, boxShadow: '0 12px 24px -8px rgba(0,0,0,0.08)' }}
      className="relative bg-white rounded-xl border border-gray-100 p-5 transition-shadow cursor-default"
      role="region"
      aria-label={`${label}: ${value}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 bg-primary/5 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            {ICONS[icon]}
          </svg>
        </div>
        {trend && (
          <span className={`inline-flex items-center gap-0.5 text-[11px] font-semibold px-1.5 py-0.5 rounded-full ${
            trend.direction === 'up' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
          }`}>
            <svg className={`w-3 h-3 ${trend.direction === 'up' ? '' : 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
            {trend.value}
          </span>
        )}
      </div>
      <p className="text-2xl font-heading font-bold text-secondary">{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
    </motion.div>
  )
}

export default memo(StatCard)
