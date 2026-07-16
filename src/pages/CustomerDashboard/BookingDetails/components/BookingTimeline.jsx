import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  CheckCircle2,
  Circle,
  XCircle,
  AlertCircle,
  Clock,
  UserCheck,
  MapPin,
  Loader2,
} from 'lucide-react'

const TIMELINE_ICONS = {
  booked: { icon: Clock, color: 'text-primary', bg: 'bg-primary/10' },
  confirmed: { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100' },
  provider_assigned: { icon: UserCheck, color: 'text-blue-600', bg: 'bg-blue-100' },
  provider_started: { icon: MapPin, color: 'text-purple-600', bg: 'bg-purple-100' },
  completed: { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10' },
  cancelled: { icon: XCircle, color: 'text-danger', bg: 'bg-danger/10' },
  rejected: { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' },
}

const STEP_ORDER = ['booked', 'confirmed', 'provider_assigned', 'provider_started', 'completed']
const CANCELLED_STEP = { cancelled: true, rejected: true }

function TimelineStep({ step, isActive, isCompleted, isLast, index }) {
  const config = TIMELINE_ICONS[step.status] || { icon: Circle, color: 'text-gray-400', bg: 'bg-gray-100' }
  const IconComponent = config.icon
  const isCancelled = CANCELLED_STEP[step.status]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="relative flex gap-4"
    >
      <div className="flex flex-col items-center">
        <motion.div
          animate={isActive ? { scale: [1, 1.2, 1] } : {}}
          transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
          className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
            isCompleted
              ? `${config.bg} ${config.color} border-current`
              : isActive
              ? 'bg-primary/10 text-primary border-primary'
              : 'bg-gray-50 dark:bg-gray-700 text-gray-400 border-gray-200 dark:border-gray-600'
          }`}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : isCancelled ? (
            <XCircle className="w-5 h-5" />
          ) : (
            <IconComponent className="w-5 h-5" />
          )}
        </motion.div>
        {!isLast && (
          <div
            className={`w-0.5 h-full min-h-[3rem] -mt-0.5 transition-colors duration-500 ${
              isCompleted
                ? 'bg-primary/30'
                : isCancelled
                ? 'bg-danger/30'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          />
        )}
      </div>

      <div className={`pb-8 flex-1 ${isLast ? 'pb-0' : ''}`}>
        <div className={`pt-1.5 ${isCancelled ? 'opacity-80' : ''}`}>
          <motion.p
            animate={isActive ? { x: [0, 5, 0] } : {}}
            transition={{ repeat: Infinity, duration: 3, repeatType: 'reverse' }}
            className={`text-sm font-semibold ${
              isCompleted || isActive
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-400 dark:text-gray-500'
            }`}
          >
            {step.label}
          </motion.p>
          {step.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
              {step.description}
            </p>
          )}
          {step.date && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {step.date}{step.time ? ` at ${step.time}` : ''}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function BookingTimeline({ timeline = [], status }) {
  const processedTimeline = useMemo(() => {
    if (!timeline.length) return []

    const isCancelled = CANCELLED_STEP[status]
    const isCompleted = status === 'completed'
    let foundCurrent = false

    if (isCancelled) {
      return timeline.map((step, idx) => ({
        ...step,
        isActive: idx === timeline.length - 1,
        isCompleted: false,
      }))
    }

    return timeline.map((step, idx) => {
      if (step.date) {
        return { ...step, isCompleted: true, isActive: false }
      }
      if (!foundCurrent && !step.date) {
        foundCurrent = true
        return { ...step, isActive: true, isCompleted: false }
      }
      return { ...step, isActive: false, isCompleted: false }
    })
  }, [timeline, status])

  if (!processedTimeline.length) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-6">
          Booking Timeline
        </h3>
        <div className="pl-1">
          {processedTimeline.map((step, index) => (
            <TimelineStep
              key={step.status}
              step={step}
              index={index}
              isActive={step.isActive}
              isCompleted={step.isCompleted}
              isLast={index === processedTimeline.length - 1}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default memo(BookingTimeline)
