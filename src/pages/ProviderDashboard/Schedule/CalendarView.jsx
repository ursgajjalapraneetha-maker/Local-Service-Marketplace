import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  calendarBookings as bkData,
  leaves as lvData,
  holidays as holData,
  workingHours as whData,
} from '../data/scheduleData'
import CalendarHeader from './components/CalendarHeader'
import Calendar from './components/Calendar'
import DaySchedule from './components/DaySchedule'
import UpcomingSchedule from './components/UpcomingSchedule'

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState('month')
  const [selectedDate, setSelectedDate] = useState(null)

  const handlePrev = useCallback(() => {
    setCurrentDate((d) => {
      const next = new Date(d)
      if (view === 'month') next.setMonth(next.getMonth() - 1)
      else if (view === 'week') next.setDate(next.getDate() - 7)
      else next.setDate(next.getDate() - 1)
      return next
    })
  }, [view])

  const handleNext = useCallback(() => {
    setCurrentDate((d) => {
      const next = new Date(d)
      if (view === 'month') next.setMonth(next.getMonth() + 1)
      else if (view === 'week') next.setDate(next.getDate() + 7)
      else next.setDate(next.getDate() + 1)
      return next
    })
  }, [view])

  const handleToday = useCallback(() => {
    setCurrentDate(new Date())
    setView('month')
  }, [])

  const handleViewChange = useCallback((v) => {
    setView(v)
  }, [])

  const handleDateClick = useCallback((date) => {
    setSelectedDate(date)
    if (view !== 'day') {
      setCurrentDate(date)
      setView('day')
    }
  }, [view])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <CalendarHeader
          currentDate={selectedDate || currentDate}
          view={view}
          onViewChange={handleViewChange}
          onPrev={handlePrev}
          onNext={handleNext}
          onToday={handleToday}
        />
        {view === 'day' && selectedDate ? (
          <DaySchedule
            date={selectedDate}
            bookings={bkData}
            workingHours={whData}
          />
        ) : (
          <Calendar
            currentDate={currentDate}
            view={view}
            bookings={bkData}
            leaves={lvData}
            holidays={holData}
            onDateClick={handleDateClick}
          />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <UpcomingSchedule bookings={bkData} />
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-500" aria-hidden="true" />
            <span className="text-xs text-gray-500">Available slots</span>
            <span className="w-2 h-2 rounded-full bg-amber-500 ml-3" aria-hidden="true" />
            <span className="text-xs text-gray-500">Pending</span>
            <span className="w-2 h-2 rounded-full bg-blue-500 ml-3" aria-hidden="true" />
            <span className="text-xs text-gray-500">Holiday</span>
            <span className="w-2 h-2 rounded-full bg-red-500 ml-3" aria-hidden="true" />
            <span className="text-xs text-gray-500">Leave</span>
          </div>

          <AnimatePresence mode="wait">
            {selectedDate ? (
              <motion.div
                key={selectedDate.toISOString()}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-sm font-medium text-secondary mb-3">
                  Selected: {selectedDate.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Working day</span>
                    <span className="font-medium text-secondary">
                      {whData.find((w) => w.day === selectedDate.getDay())?.enabled ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Bookings</span>
                    <span className="font-medium text-secondary">
                      {bkData.filter((b) => b.date === selectedDate.toISOString().split('T')[0]).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Is holiday</span>
                    <span className="font-medium text-secondary">
                      {holData.some((h) => h.date === selectedDate.toISOString().split('T')[0]) ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">On leave</span>
                    <span className="font-medium text-secondary">
                      {lvData.some((l) => {
                        const ts = selectedDate.getTime()
                        const s = new Date(l.startDate + 'T00:00:00').getTime()
                        const e = new Date(l.endDate + 'T00:00:00').getTime()
                        return ts >= s && ts <= e && l.status === 'approved'
                      }) ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.p
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-gray-400 text-center py-6"
              >
                Click a date on the calendar to see details
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
