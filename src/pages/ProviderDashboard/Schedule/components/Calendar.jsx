import { useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { DAY_LABELS } from '../../data/scheduleData'

function getMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startPad = firstDay.getDay()
  const daysInMonth = lastDay.getDate()
  const cells = []
  for (let i = 0; i < startPad; i++) {
    const d = new Date(year, month, -startPad + i + 1)
    cells.push({ date: d, day: d.getDate(), isCurrentMonth: false })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d)
    cells.push({ date, day: d, isCurrentMonth: true })
  }
  const remaining = (7 - (cells.length % 7)) % 7
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(year, month + 1, i)
    cells.push({ date: d, day: d.getDate(), isCurrentMonth: false })
  }
  return cells
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function getBookingCount(date, bookings) {
  const key = date.toISOString().split('T')[0]
  return bookings.filter((b) => b.date === key).length
}

function getBookingsForDay(date, bookings) {
  const key = date.toISOString().split('T')[0]
  return bookings.filter((b) => b.date === key)
}

function isLeaveDate(date, leaves) {
  const ts = date.getTime()
  return leaves.some((l) => {
    const start = new Date(l.startDate + 'T00:00:00').getTime()
    const end = new Date(l.endDate + 'T00:00:00').getTime()
    return ts >= start && ts <= end && l.status === 'approved'
  })
}

function isHoliday(date, holidays) {
  const key = date.toISOString().split('T')[0]
  return holidays.some((h) => h.date === key)
}

export default function Calendar({ currentDate, view, bookings, leaves, holidays, onDateClick }) {
  const today = useMemo(() => new Date(), [])

  const grid = useMemo(() => {
    if (view === 'month') {
      return getMonthGrid(currentDate.getFullYear(), currentDate.getMonth())
    }
    if (view === 'week') {
      const start = new Date(currentDate)
      start.setDate(start.getDate() - start.getDay())
      return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(start)
        d.setDate(d.getDate() + i)
        return { date: d, day: d.getDate(), isCurrentMonth: d.getMonth() === currentDate.getMonth() }
      })
    }
    return [{ date: currentDate, day: currentDate.getDate(), isCurrentMonth: true }]
  }, [currentDate, view])

  const handleClick = useCallback((date) => {
    onDateClick?.(date)
  }, [onDateClick])

  if (view === 'day') {
    const dayBookings = getBookingsForDay(currentDate, bookings)
    const isOff = isLeaveDate(currentDate, leaves) || isHoliday(currentDate, holidays)

    return (
      <div className="text-center py-8">
        <p className="text-4xl font-heading font-bold text-secondary mb-1">{currentDate.getDate()}</p>
        <p className="text-sm text-gray-500 mb-2">
          {currentDate.toLocaleDateString('en-IN', { weekday: 'long', month: 'long', year: 'numeric' })}
        </p>
        {isOff ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600">
            Day Off
          </span>
        ) : (
          <span className="text-xs text-gray-400">{dayBookings.length} booking{dayBookings.length !== 1 ? 's' : ''}</span>
        )}
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-7 gap-px bg-gray-100 rounded-lg overflow-hidden mb-px">
        {DAY_LABELS.map((label) => (
          <div key={label} className="bg-gray-50 py-2 text-center">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{label.slice(0, 3)}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-100 rounded-lg overflow-hidden">
        {grid.map(({ date, day, isCurrentMonth }, i) => {
          const isToday = isSameDay(date, today)
          const count = getBookingCount(date, bookings)
          const isOff = isLeaveDate(date, leaves) || isHoliday(date, holidays)
          const holiday = holidays.find((h) => h.date === date.toISOString().split('T')[0])

          return (
            <motion.button
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.003 }}
              onClick={() => handleClick(date)}
              className={`relative min-h-[64px] sm:min-h-[80px] p-1.5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-inset ${
                isCurrentMonth ? 'bg-white' : 'bg-gray-50/50'
              } ${isToday ? 'ring-2 ring-primary/20 ring-inset' : ''} hover:bg-gray-50`}
              aria-label={`${date.toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}${count ? `, ${count} bookings` : ''}`}
            >
              <span className={`text-xs font-medium ${isToday ? 'text-primary' : isCurrentMonth ? 'text-secondary' : 'text-gray-300'}`}>
                {day}
              </span>
              {isOff && (
                <span className="block text-[8px] text-red-500 font-medium mt-0.5">Off</span>
              )}
              {holiday && (
                <span className="block text-[8px] text-blue-500 font-medium truncate leading-tight">{holiday.name}</span>
              )}
              {count > 0 && !isOff && (
                <span className="block text-[9px] text-primary font-semibold mt-0.5">
                  {count} booking{count > 1 ? 's' : ''}
                </span>
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
