import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Clock, Timer } from 'lucide-react'
import toast from 'react-hot-toast'

const DURATION_OPTIONS = [
  { value: 30, label: '30 minutes' },
  { value: 60, label: '60 minutes' },
  { value: 90, label: '90 minutes' },
  { value: 120, label: '2 hours' },
]

const BUFFER_OPTIONS = [
  { value: 0, label: 'None' },
  { value: 15, label: '15 minutes' },
  { value: 30, label: '30 minutes' },
  { value: 60, label: '1 hour' },
]

export default function TimeSlotPicker({ timeSlots, bookingLimits, onUpdate }) {
  const [duration, setDuration] = useState(timeSlots.duration)
  const [buffer, setBuffer] = useState(timeSlots.bufferTime)
  const [maxPerDay, setMaxPerDay] = useState(bookingLimits.maxPerDay)
  const [noticePeriod, setNoticePeriod] = useState(bookingLimits.minNoticePeriod)
  const [advanceDays, setAdvanceDays] = useState(bookingLimits.advanceBookingDays)

  const handleSave = useCallback(() => {
    onUpdate?.({
      timeSlots: { ...timeSlots, duration, bufferTime: buffer },
      bookingLimits: { ...bookingLimits, maxPerDay, minNoticePeriod: noticePeriod, advanceBookingDays: advanceDays },
    })
    toast.success('Slot settings updated')
  }, [duration, buffer, maxPerDay, noticePeriod, advanceDays, timeSlots, bookingLimits, onUpdate])

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Timer size={16} className="text-primary" aria-hidden="true" />
        <h2 className="text-base font-heading font-semibold text-secondary">Time Slot Settings</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1.5">Slot Duration</label>
          <div className="grid grid-cols-2 gap-2">
            {DURATION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setDuration(opt.value)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
                  duration === opt.value
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-gray-100 text-gray-500 hover:border-gray-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1.5">Buffer Between Bookings</label>
          <div className="grid grid-cols-2 gap-2">
            {BUFFER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setBuffer(opt.value)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
                  buffer === opt.value
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-gray-100 text-gray-500 hover:border-gray-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Max / Day</label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min={1}
                max={20}
                value={maxPerDay}
                onChange={(e) => setMaxPerDay(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                aria-label="Maximum bookings per day"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Notice (min)</label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min={0}
                step={30}
                value={noticePeriod}
                onChange={(e) => setNoticePeriod(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                aria-label="Minimum notice period in minutes"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Advance (days)</label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min={1}
                max={90}
                value={advanceDays}
                onChange={(e) => setAdvanceDays(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                aria-label="Advance booking days"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          Save Slot Settings
        </button>
      </div>
    </div>
  )
}
