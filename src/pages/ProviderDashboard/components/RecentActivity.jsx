import { memo } from 'react'
import { motion } from 'framer-motion'
import { Clock, CalendarCheck, IndianRupee, Star, Wrench } from 'lucide-react'
import { recentActivities } from '../data/dashboardData'

const ACTIVITY_ICONS = {
  booking: CalendarCheck,
  payment: IndianRupee,
  review: Star,
  service: Wrench,
}

const ACTIVITY_COLORS = {
  booking: 'bg-blue-50 text-blue-600',
  payment: 'bg-green-50 text-green-600',
  review: 'bg-amber-50 text-amber-600',
  service: 'bg-purple-50 text-purple-600',
}

function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-white rounded-xl border border-gray-100 p-5"
      role="region"
      aria-label="Recent activity"
    >
      <div className="flex items-center gap-2 mb-4">
        <Clock size={18} className="text-primary" aria-hidden="true" />
        <h2 className="text-base font-heading font-semibold text-secondary">Recent Activity</h2>
      </div>

      {recentActivities.length === 0 ? (
        <div className="py-8 text-center">
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock size={22} className="text-gray-300" />
          </div>
          <p className="text-sm font-medium text-secondary">No recent activity</p>
          <p className="text-xs text-gray-400 mt-1">Your activity will appear here.</p>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-[18px] top-3 bottom-3 w-0.5 bg-gray-100" aria-hidden="true" />
          <div className="space-y-0">
            {recentActivities.map((activity, i) => {
              const Icon = ACTIVITY_ICONS[activity.type] || Clock
              const color = ACTIVITY_COLORS[activity.type] || 'bg-gray-50 text-gray-500'
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 * i }}
                  className="relative flex items-start gap-3 pb-4 pl-10"
                >
                  <div
                    className={`absolute left-0 top-0 w-9 h-9 rounded-full flex items-center justify-center ${color} ring-4 ring-white z-10`}
                  >
                    <Icon size={14} aria-hidden="true" />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-sm font-semibold text-secondary">{activity.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{activity.description}</p>
                    <span className="text-[11px] text-gray-400 mt-1 block">{activity.time}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default memo(RecentActivity)
