import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const ICONS = {
  book: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  ),
  browse: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  ),
  bookings: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  ),
  wishlist: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  ),
  profile: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  ),
  support: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
  ),
}

function QuickActionCard({ icon, label, path, color, index }) {
  const navigate = useNavigate()

  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.06 * index }}
      whileHover={{ y: -3, boxShadow: '0 8px 20px -6px rgba(0,0,0,0.08)' }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(path)}
      className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-4 text-left transition-colors hover:border-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
      aria-label={label}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          {ICONS[icon]}
        </svg>
      </div>
      <span className="text-sm font-medium text-secondary">{label}</span>
    </motion.button>
  )
}

export default memo(QuickActionCard)
