import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  UserCheck,
  MapPin,
  Loader2,
} from 'lucide-react'

const STATUS_CONFIG = {
  pending: {
    icon: Clock,
    color: 'text-warning',
    bg: 'bg-warning/10',
    border: 'border-warning/20',
    gradient: 'from-warning/5 to-transparent',
    label: 'Awaiting Confirmation',
    description: 'Your booking is pending and waiting for provider confirmation.',
  },
  confirmed: {
    icon: CheckCircle2,
    color: 'text-primary',
    bg: 'bg-primary/5',
    border: 'border-primary/15',
    gradient: 'from-primary/5 to-transparent',
    label: 'Booking Confirmed',
    description: 'Your booking has been confirmed. Provider will be assigned shortly.',
  },
  in_progress: {
    icon: Loader2,
    color: 'text-blue-600',
    bg: 'bg-blue-100',
    border: 'border-blue-200',
    gradient: 'from-blue-500/5 to-transparent',
    label: 'Service In Progress',
    description: 'Your service is currently in progress.',
    spin: true,
  },
  completed: {
    icon: CheckCircle2,
    color: 'text-success',
    bg: 'bg-success/10',
    border: 'border-success/20',
    gradient: 'from-success/5 to-transparent',
    label: 'Service Completed',
    description: 'Your service has been completed successfully.',
  },
  cancelled: {
    icon: XCircle,
    color: 'text-danger',
    bg: 'bg-danger/10',
    border: 'border-danger/20',
    gradient: 'from-danger/5 to-transparent',
    label: 'Booking Cancelled',
    description: 'This booking has been cancelled.',
  },
  rejected: {
    icon: AlertCircle,
    color: 'text-red-600',
    bg: 'bg-red-100',
    border: 'border-red-200',
    gradient: 'from-red-500/5 to-transparent',
    label: 'Booking Rejected',
    description: 'The provider was unable to accept this booking.',
  },
}

function BookingStatus({ status, scheduledDate, scheduledTime }) {
  const config = useMemo(() => STATUS_CONFIG[status] || STATUS_CONFIG.pending, [status])

  const IconComponent = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`bg-white dark:bg-gray-800 rounded-2xl border ${config.border} overflow-hidden`}>
        <div className={`bg-gradient-to-br ${config.gradient} p-6`}>
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${config.bg} ${config.color}`}>
              <IconComponent className={`w-8 h-8 ${config.spin ? 'animate-spin' : ''}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {config.label}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {config.description}
              </p>
              {(scheduledDate || scheduledTime) && (
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                  {scheduledDate && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      Scheduled: {scheduledDate}
                    </span>
                  )}
                  {scheduledTime && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {scheduledTime}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default memo(BookingStatus)
