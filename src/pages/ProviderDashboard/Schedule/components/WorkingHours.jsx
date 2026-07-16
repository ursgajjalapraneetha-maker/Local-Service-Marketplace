import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Clock, Check, Plus, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { DAY_LABELS } from '../../data/scheduleData'

const TIME_OPTIONS = Array.from({ length: 24 }, (_, i) => {
  const h = i.toString().padStart(2, '0')
  return { value: `${h}:00`, label: `${h}:00` }
})

function DayRow({ day, data, onChange }) {
  const enabled = data?.enabled || false
  const slots = data?.slots || [{ start: '09:00', end: '18:00' }]

  const handleToggle = () => onChange(day, !enabled, slots)

  const handleSlotChange = (idx, field, value) => {
    const next = slots.map((s, i) => (i === idx ? { ...s, [field]: value } : s))
    onChange(day, enabled, next)
  }

  const addSlot = () => {
    const last = slots.length > 0 ? slots[slots.length - 1].end : '18:00'
    onChange(day, enabled, [...slots, { start: last, end: '18:00' }])
  }

  const removeSlot = (idx) => {
    if (slots.length <= 1) return
    onChange(day, enabled, slots.filter((_, i) => i !== idx))
  }

  return (
    <div className={`rounded-lg border p-3 transition-colors ${enabled ? 'border-green-100 bg-green-50/20' : 'border-gray-100 bg-gray-50/50'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggle}
            className={`w-5 h-5 rounded flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
              enabled ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}
            aria-label={`Toggle ${DAY_LABELS[day]}`}
          >
            {enabled && <Check size={12} />}
          </button>
          <span className={`text-sm font-medium ${enabled ? 'text-secondary' : 'text-gray-400'}`}>
            {DAY_LABELS[day]}
          </span>
        </div>
        {enabled && (
          <button
            onClick={addSlot}
            className="text-xs text-primary font-medium hover:text-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded px-1"
          >
            + Break
          </button>
        )}
      </div>

      {enabled && (
        <div className="space-y-1.5 mt-2 ml-7">
          {slots.map((slot, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <select
                value={slot.start}
                onChange={(e) => handleSlotChange(i, 'start', e.target.value)}
                className="text-xs border border-gray-200 rounded-md px-1.5 py-1 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                {TIME_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <span className="text-[10px] text-gray-400">to</span>
              <select
                value={slot.end}
                onChange={(e) => handleSlotChange(i, 'end', e.target.value)}
                className="text-xs border border-gray-200 rounded-md px-1.5 py-1 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                {TIME_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              {slots.length > 1 && (
                <button
                  onClick={() => removeSlot(i)}
                  className="text-red-400 hover:text-red-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300 rounded p-0.5"
                  aria-label="Remove slot"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function WorkingHours({ workingHours, onSave }) {
  const [data, setData] = useState(() =>
    workingHours.map((w) => ({ ...w, slots: w.slots.map((s) => ({ ...s })) }))
  )

  const handleChange = useCallback((day, enabled, slots) => {
    setData((prev) =>
      prev.map((d) => (d.day === day ? { ...d, enabled, slots: slots.map((s) => ({ ...s })) } : d))
    )
  }, [])

  const handleSave = () => {
    onSave?.(data)
    toast.success('Working hours updated')
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Clock size={16} className="text-primary" aria-hidden="true" />
        <h2 className="text-base font-heading font-semibold text-secondary">Working Hours</h2>
      </div>

      <div className="space-y-2 mb-4">
        {DAY_LABELS.map((_, day) => {
          const dayData = data.find((d) => d.day === day) || { day, enabled: false, slots: [] }
          return <DayRow key={day} day={day} data={dayData} onChange={handleChange} />
        })}
      </div>

      <button
        onClick={handleSave}
        className="w-full py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
      >
        Save Working Hours
      </button>
    </div>
  )
}
