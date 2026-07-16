import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Wrench, CalendarCheck, CalendarRange, IndianRupee, Zap } from 'lucide-react'

const ACTIONS = [
  {
    icon: Wrench,
    label: 'Add New Service',
    desc: 'List a new service',
    path: '/provider-dashboard/services',
    color: 'bg-primary/10 text-primary',
    hoverColor: 'hover:border-primary/30 hover:shadow-primary/5',
  },
  {
    icon: CalendarCheck,
    label: 'View Bookings',
    desc: 'Manage requests',
    path: '/provider-dashboard/bookings',
    color: 'bg-blue-100 text-blue-600',
    hoverColor: 'hover:border-blue-300/30 hover:shadow-blue-500/5',
  },
  {
    icon: CalendarRange,
    label: 'Update Availability',
    desc: 'Set working hours',
    path: '/provider-dashboard/schedule',
    color: 'bg-green-50 text-green-600',
    hoverColor: 'hover:border-green-300/30 hover:shadow-green-500/5',
  },
  {
    icon: IndianRupee,
    label: 'Check Earnings',
    desc: 'View revenue',
    path: '/provider-dashboard/earnings',
    color: 'bg-amber-50 text-amber-600',
    hoverColor: 'hover:border-amber-300/30 hover:shadow-amber-500/5',
  },
]

function QuickActions() {
  const navigate = useNavigate()

  const handleNavigate = useCallback(
    (path) => {
      navigate(path)
    },
    [navigate]
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="bg-white rounded-xl border border-gray-100 p-5"
      role="region"
      aria-label="Quick actions"
    >
      <div className="flex items-center gap-2 mb-4">
        <Zap size={18} className="text-primary" aria-hidden="true" />
        <h2 className="text-base font-heading font-semibold text-secondary">Quick Actions</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {ACTIONS.map(({ icon: Icon, label, desc, path, color, hoverColor }, i) => (
          <motion.button
            key={label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.45 + 0.05 * i }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNavigate(path)}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${hoverColor}`}
            aria-label={label}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
              <Icon size={18} aria-hidden="true" />
            </div>
            <span className="text-xs font-semibold text-secondary">{label}</span>
            <span className="text-[10px] text-gray-400 -mt-1">{desc}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

export default memo(QuickActions)
