import { useState, useEffect, useMemo, useCallback } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CalendarRange, CalendarDays, Settings } from 'lucide-react'
import {
  availability,
  workingHours as whData,
  timeSlots as tsData,
  bookingLimits as blData,
  holidays as holData,
  leaves as lvData,
  calendarBookings as bkData,
  scheduleSummary,
} from '../data/scheduleData'
import PageContainer from '../components/PageContainer'
import ScheduleCard from './components/ScheduleCard'
import AvailabilityToggle from './components/AvailabilityToggle'

const SUB_NAV = [
  { path: '/provider-dashboard/schedule', label: 'Dashboard', icon: CalendarRange, end: true },
  { path: '/provider-dashboard/schedule/calendar', label: 'Calendar', icon: CalendarDays },
  { path: '/provider-dashboard/schedule/settings', label: 'Settings', icon: Settings },
]

export default function Schedule() {
  const { pathname } = useLocation()
  const [loading, setLoading] = useState(true)
  const [isAvailable, setIsAvailable] = useState(availability.isAvailable)
  const [workingHours, setWorkingHours] = useState(whData)
  const [timeSlots, setTimeSlots] = useState(tsData)
  const [bookingLimits, setBookingLimits] = useState(blData)
  const [holidays, setHolidays] = useState(holData)
  const [leaves, setLeaves] = useState(lvData)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  const isSubPage = pathname !== '/provider-dashboard/schedule'

  if (loading) {
    return (
      <PageContainer title="My Schedule" subtitle="Manage your availability, working hours and service slots.">
        <div className="space-y-4" role="status" aria-label="Loading schedule">
          <div className="flex gap-2 mb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 w-24 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-lg" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-80 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-xl" />
            <div className="h-80 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-xl space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 mx-5 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-lg" />
              ))}
            </div>
          </div>
          <span className="sr-only">Loading schedule...</span>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer title="My Schedule" subtitle="Manage your availability, working hours and service slots.">
      <div className="flex items-center gap-1 mb-6 bg-gray-100 p-0.5 rounded-lg w-fit" role="tablist">
        {SUB_NAV.map(({ path, label, icon: Icon, end }) => {
          const isActive = end ? pathname === path : pathname.startsWith(path)
          return (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={`relative px-3 py-1.5 text-xs font-semibold rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
                isActive ? 'text-primary' : 'text-gray-500 hover:text-secondary'
              }`}
              role="tab"
              aria-selected={isActive}
            >
              {isActive && (
                <motion.span
                  layoutId="schedule-sub-nav"
                  className="absolute inset-0 bg-white rounded-md shadow-sm"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon size={14} aria-hidden="true" />
                {label}
              </span>
            </NavLink>
          )
        })}
      </div>

      {isSubPage ? (
        <Outlet />
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <ScheduleCard padding={false}>
              <div className="p-5">
                <p className="text-xs text-gray-500 mb-1">Total Bookings</p>
                <p className="text-2xl font-heading font-bold text-secondary">{scheduleSummary.totalBookings}</p>
              </div>
              <div className="border-t border-gray-50 px-5 py-2.5 flex items-center justify-between">
                <span className="text-[10px] text-green-600 font-medium">{scheduleSummary.confirmed} confirmed</span>
                <span className="text-[10px] text-amber-600 font-medium">{scheduleSummary.pending} pending</span>
              </div>
            </ScheduleCard>

            <ScheduleCard padding={false}>
              <div className="p-5">
                <p className="text-xs text-gray-500 mb-1">This Week</p>
                <p className="text-2xl font-heading font-bold text-secondary">{scheduleSummary.upcomingThisWeek}</p>
              </div>
              <div className="border-t border-gray-50 px-5 py-2.5">
                <span className="text-[10px] text-gray-500 font-medium">
                  {scheduleSummary.completedThisWeek} completed so far
                </span>
              </div>
            </ScheduleCard>

            <ScheduleCard>
              <AvailabilityToggle
                isAvailable={isAvailable}
                onToggle={(v) => setIsAvailable(v)}
              />
            </ScheduleCard>

            <ScheduleCard>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Working Days</p>
                  <p className="text-lg font-heading font-bold text-secondary">
                    {workingHours.filter((w) => w.enabled).length}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Avg. Hours / Day</p>
                  <p className="text-lg font-heading font-bold text-secondary">7.5</p>
                </div>
              </div>
            </ScheduleCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ScheduleCard>
              <h3 className="text-sm font-heading font-semibold text-secondary mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <NavLink
                  to="/provider-dashboard/schedule/calendar"
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-xs font-medium text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                >
                  <CalendarDays size={14} className="text-primary" />
                  View Calendar
                </NavLink>
                <NavLink
                  to="/provider-dashboard/schedule/settings"
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-xs font-medium text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                >
                  <Settings size={14} className="text-primary" />
                  Manage Settings
                </NavLink>
              </div>
            </ScheduleCard>

            <ScheduleCard>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Next Booking</p>
                  <p className="text-sm font-semibold text-secondary">
                    {bkData.find((b) => b.date >= new Date().toISOString().split('T')[0])?.service || 'No upcoming'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Slot Duration</p>
                  <p className="text-sm font-semibold text-secondary">{timeSlots.duration} min</p>
                </div>
              </div>
            </ScheduleCard>
          </div>
        </motion.div>
      )}
    </PageContainer>
  )
}
