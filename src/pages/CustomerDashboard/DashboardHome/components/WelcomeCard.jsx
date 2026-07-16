import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon, Coffee } from 'lucide-react'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return { text: 'Good Morning', icon: Coffee }
  if (hour < 18) return { text: 'Good Afternoon', icon: Sun }
  return { text: 'Good Evening', icon: Moon }
}

function WelcomeCard() {
  const { text: greeting, icon: GreetingIcon } = useMemo(getGreeting, [])
  const today = useMemo(
    () =>
      new Intl.DateTimeFormat('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date()),
    []
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-blue-700 rounded-2xl p-6 sm:p-8 text-white"
      role="region"
      aria-label="Welcome"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" aria-hidden="true" />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <GreetingIcon size={20} className="text-blue-200" aria-hidden="true" />
            <span className="text-blue-100 text-sm font-medium">{greeting}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold mt-1">
            Rahul Kumar
          </h1>
          <p className="text-blue-200 text-sm">{today}</p>
          <p className="text-blue-100 text-sm mt-3 max-w-md leading-relaxed">
            Welcome back! You have 3 upcoming bookings scheduled.
          </p>
        </div>

        <div className="hidden sm:flex items-center justify-center w-16 h-16 bg-white/10 rounded-xl backdrop-blur-sm shrink-0" aria-hidden="true">
          <svg className="w-8 h-8 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

export default memo(WelcomeCard)
