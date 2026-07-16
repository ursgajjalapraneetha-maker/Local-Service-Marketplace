import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Clock, User, Wrench, IndianRupee } from 'lucide-react'

const HOURS = Array.from({ length: 14 }, (_, i) => i + 7)

function formatHour(h) {
  if (h === 0) return '12 AM'
  if (h < 12) return `${h} AM`
  if (h === 12) return '12 PM'
  return `${h - 12} PM`
}

const STATUS_STYLES = {
  confirmed: { bg: 'bg-green-500', label: 'bg-green-50 text-green-600 border-green-100' },
  pending: { bg: 'bg-amber-500', label: 'bg-amber-50 text-amber-600 border-amber-100' },
  cancelled: { bg: 'bg-red-500', label: 'bg-red-50 text-red-600 border-red-100' },
}

export default function DaySchedule({ date, bookings, workingHours }) {
  const dayIndex = date.getDay()
  const daySchedule = workingHours.find((w) => w.day === dayIndex)
  const dateKey = date.toISOString().split('T')[0]
  const dayBookings = useMemo(() => bookings.filter((b) => b.date === dateKey), [bookings, dateKey])

  const totalSlots = daySchedule?.slots?.reduce((acc, s) => {
    const [sH] = s.start.split(':').map(Number)
    const [eH] = s.end.split(':').map(Number)
    return acc + (eH - sH)
  }, 0) || 0

  if (!daySchedule?.enabled) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-gray-400">Day off — no working hours set</p>
      </div>
    )
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-medium">
            {dayBookings.length} of {totalSlots} slots booked
          </span>
        </div>
        {daySchedule?.slots?.map((s, i) => (
          <span key={i} className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
            {s.start} - {s.end}
          </span>
        ))}
      </div>

      <div className="space-y-1">
        {HOURS.map((hour) => {
          const isWorking = daySchedule.slots.some((s) => {
            const [sH] = s.start.split(':').map(Number)
            const [eH] = s.end.split(':').map(Number)
            return hour >= sH && hour < eH
          })

          const hourBookings = dayBookings.filter((b) => {
            const [bH] = b.start.split(':').map(Number)
            return bH === hour
          })

          return (
            <div key={hour} className="flex items-start gap-2 group">
              <div className="w-14 shrink-0 pt-1.5 text-right">
                <span className="text-[10px] text-gray-400 font-medium">{formatHour(hour)}</span>
              </div>
              <div className={`flex-1 min-h-[36px] rounded-lg border ${isWorking ? 'border-gray-100' : 'border-dashed border-gray-50'} ${hourBookings.length > 0 ? 'bg-white' : ''}`}>
                {hourBookings.length === 0 && isWorking && (
                  <div className="px-2 py-1.5">
                    <span className="text-[10px] text-gray-300">Available</span>
                  </div>
                )}
                {hourBookings.map((bk, i) => {
                  const style = STATUS_STYLES[bk.status] || STATUS_STYLES.pending
                  return (
                    <motion.div
                      key={bk.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center justify-between px-2.5 py-1.5 hover:bg-gray-50 rounded-lg transition-colors"
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
                          <Clock size={10} className="text-gray-400 shrink-0" aria-hidden="true" />
                          <span className="text-[10px] text-gray-500">{bk.start} - {bk.end}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <span className="text-[10px] text-gray-500 font-medium">
                          <IndianRupee size={8} className="inline" aria-hidden="true" />{bk.amount.toLocaleString()}
                        </span>
                        <span className={`text-[9px] font-medium px-1 py-0.5 rounded border ${style.label}`}>
                          {bk.status}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
