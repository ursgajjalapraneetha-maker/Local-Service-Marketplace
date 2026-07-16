import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarCheck, ChevronDown, ChevronUp, User, Wrench, IndianRupee } from 'lucide-react'
import ScheduleCard from './ScheduleCard'

function groupByDate(bookings) {
  const map = {}
  bookings.forEach((b) => {
    if (!map[b.date]) map[b.date] = []
    map[b.date].push(b)
  })
  return Object.entries(map).sort(([a], [b]) => a.localeCompare(b))
}

export default function UpcomingSchedule({ bookings }) {
  const [expanded, setExpanded] = useState(null)

  const grouped = useMemo(() => groupByDate(bookings), [bookings])
  const today = new Date().toISOString().split('T')[0]

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarCheck size={16} className="text-primary" aria-hidden="true" />
          <h2 className="text-base font-heading font-semibold text-secondary">Upcoming</h2>
          <span className="text-[10px] font-medium text-gray-400">{bookings.length} booking{bookings.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      <div className="space-y-2">
        {grouped.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">No upcoming bookings</p>
        ) : (
          grouped.map(([date, dayBookings]) => {
            const isToday = date === today
            const open = expanded === date
            return (
              <motion.div
                key={date}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setExpanded(open ? null : date)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
                    isToday ? 'bg-primary/5' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${isToday ? 'bg-primary' : 'bg-gray-300'}`} aria-hidden="true" />
                    <span className={`text-xs font-semibold ${isToday ? 'text-primary' : 'text-secondary'}`}>
                      {new Date(date + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </span>
                    <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded font-medium">
                      {dayBookings.length} slot{dayBookings.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  {open ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
                </button>

                {open && (
                  <div className="divide-y divide-gray-50">
                    {dayBookings.map((bk, i) => (
                      <motion.div
                        key={bk.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="flex items-center justify-between px-3 py-2.5 hover:bg-gray-50 transition-colors"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <Wrench size={11} className="text-gray-400 shrink-0" aria-hidden="true" />
                            <span className="text-xs font-medium text-secondary truncate">{bk.service}</span>
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <User size={10} className="text-gray-400 shrink-0" aria-hidden="true" />
                            <span className="text-[10px] text-gray-500 truncate">{bk.customer}</span>
                            <span className="text-[10px] text-gray-300">&middot;</span>
                            <span className="text-[10px] text-gray-500">{bk.start} - {bk.end}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 ml-2">
                          <span className="text-[10px] font-medium text-gray-500">
                            <IndianRupee size={8} className="inline" aria-hidden="true" />{bk.amount.toLocaleString()}
                          </span>
                          <span className={`text-[9px] font-medium px-1 py-0.5 rounded border ${
                            bk.status === 'confirmed' ? 'bg-green-50 text-green-600 border-green-100'
                            : bk.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100'
                            : 'bg-red-50 text-red-600 border-red-100'
                          }`}>
                            {bk.status}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )
          })
        )}
      </div>
    </div>
  )
}
