import { memo, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check, Clock, User, CheckCircle, XCircle } from 'lucide-react'

const STEP_CONFIG = {
  booked: { icon: Check, color: 'text-primary bg-primary/5', lineColor: 'bg-primary' },
  confirmed: { icon: Clock, color: 'text-primary bg-primary/5', lineColor: 'bg-primary' },
  in_progress: { icon: User, color: 'text-blue-500 bg-blue-50', lineColor: 'bg-blue-400' },
  completed: { icon: CheckCircle, color: 'text-success bg-success/10', lineColor: 'bg-success' },
  cancelled: { icon: XCircle, color: 'text-danger bg-danger/10', lineColor: 'bg-danger' },
}

function BookingTimeline({ timeline, status }) {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])

  const activeSteps = status === 'cancelled' || status === 'rejected'
    ? timeline.filter((s) => s.status !== 'completed')
    : timeline

  const currentIndex = activeSteps.findIndex((s) => s.status === status)
  const isCancelled = status === 'cancelled' || status === 'rejected'

  return (
    <div className="border-t border-gray-100 pt-3 mt-3">
      <button
        onClick={toggle}
        className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded"
        aria-expanded={isOpen}
        aria-controls="booking-timeline"
      >
        <Clock size={13} />
        View Timeline
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={13} />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="booking-timeline"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-3 pl-1 space-y-0">
              {activeSteps.map((step, i) => {
                const StepIcon = STEP_CONFIG[step.status]?.icon || Check
                const isActive = i <= currentIndex && !isCancelled
                const isLast = i === activeSteps.length - 1
                const config = isCancelled && step.status === 'cancelled'
                  ? { color: 'text-danger bg-danger/10', lineColor: 'bg-danger' }
                  : isCancelled
                    ? { color: 'text-gray-300 bg-gray-100', lineColor: 'bg-gray-200' }
                    : STEP_CONFIG[step.status]

                return (
                  <div key={step.status} className="relative flex items-start gap-3 pb-5 last:pb-0">
                    {!isLast && (
                      <div
                        className={`absolute left-3.5 top-6 bottom-0 w-0.5 ${isActive ? config.lineColor : 'bg-gray-200'}`}
                        aria-hidden="true"
                      />
                    )}
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${isActive ? config.color : 'bg-gray-100 text-gray-300'}`}>
                      <StepIcon size={13} />
                    </div>
                    <div className="pt-0.5">
                      <p className={`text-sm font-medium ${isActive ? 'text-secondary' : 'text-gray-400'}`}>
                        {step.label}
                      </p>
                      {step.date && (
                        <p className="text-xs text-gray-400 mt-0.5">{step.date}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default memo(BookingTimeline)
