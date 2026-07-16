import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../../../utils'
import {
  Clock,
  CheckCircle,
  CalendarCheck,
  PlayCircle,
  Star,
  XCircle,
  Ban,
  ArrowRight,
} from 'lucide-react'
import { CONFIG } from './BookingStatusBadge'

const STEPS = [
  { status: 'pending', icon: Clock, label: 'Booking Created' },
  { status: 'accepted', icon: CheckCircle, label: 'Provider Accepted' },
  { status: 'scheduled', icon: CalendarCheck, label: 'Service Scheduled' },
  { status: 'in-progress', icon: PlayCircle, label: 'Service Started' },
  { status: 'completed', icon: Star, label: 'Service Completed' },
]

function BookingTimeline({ bookingStatus }) {
  const currentIndex = useMemo(
    () => STEPS.findIndex((s) => s.status === bookingStatus),
    [bookingStatus]
  )

  const isTerminal = bookingStatus === 'cancelled' || bookingStatus === 'rejected'

  return (
    <div className="relative" role="list" aria-label="Booking timeline">
      {isTerminal ? (
        <div className="flex flex-col items-center py-6">
          <div className={cn(
            'w-14 h-14 rounded-full flex items-center justify-center mb-3',
            bookingStatus === 'cancelled' ? 'bg-red-50' : 'bg-red-50'
          )}>
            {bookingStatus === 'cancelled' ? (
              <Ban size={24} className="text-red-500" aria-hidden="true" />
            ) : (
              <XCircle size={24} className="text-red-500" aria-hidden="true" />
            )}
          </div>
          <p className="text-sm font-semibold text-secondary capitalize">
            Booking {bookingStatus}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {bookingStatus === 'cancelled' ? 'This booking was cancelled.' : 'This booking was rejected.'}
          </p>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-[19px] top-3 bottom-3 w-0.5 bg-gray-100" aria-hidden="true" />
          <div className="space-y-0">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              const isActive = i <= currentIndex
              const isCurrent = i === currentIndex
              const config = CONFIG[step.status]
              return (
                <motion.div
                  key={step.status}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * i }}
                  className="relative flex items-start gap-3 pb-5 pl-12"
                  role="listitem"
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  <div className={cn(
                    'absolute left-0 top-0 w-[38px] h-[38px] rounded-full flex items-center justify-center ring-4 ring-white z-10 transition-colors',
                    isActive ? config.className.split(' ')[0] : 'bg-gray-50'
                  )}>
                    <Icon size={16} className={isActive ? config.className.split(' ')[1] : 'text-gray-300'} aria-hidden="true" />
                  </div>
                  <div className="pt-1.5">
                    <p className={cn(
                      'text-sm font-semibold transition-colors',
                      isActive ? 'text-secondary' : 'text-gray-300'
                    )}>
                      {step.label}
                    </p>
                    {isCurrent && (
                      <span className={cn(
                        'text-[11px] font-medium mt-0.5 block',
                        config.className.split(' ')[1]
                      )}>
                        Current stage
                      </span>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(BookingTimeline)
