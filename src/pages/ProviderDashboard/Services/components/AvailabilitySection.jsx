import { memo, useCallback } from 'react'
import { CalendarRange, Clock } from 'lucide-react'

const ALL_DAYS = [
  { value: 'Mon', label: 'Mon' },
  { value: 'Tue', label: 'Tue' },
  { value: 'Wed', label: 'Wed' },
  { value: 'Thu', label: 'Thu' },
  { value: 'Fri', label: 'Fri' },
  { value: 'Sat', label: 'Sat' },
  { value: 'Sun', label: 'Sun' },
]

function AvailabilitySection({ formData, errors, onChange }) {
  const handleDayToggle = useCallback((day) => {
    const current = formData.workingDays || []
    const updated = current.includes(day)
      ? current.filter((d) => d !== day)
      : [...current, day]
    onChange({ ...formData, workingDays: updated })
  }, [formData, onChange])

  const handleHoursChange = useCallback((field, value) => {
    onChange({
      ...formData,
      workingHours: { ...formData.workingHours, [field]: value },
    })
  }, [formData, onChange])

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <CalendarRange size={16} className="text-primary" aria-hidden="true" />
        <h3 className="text-sm font-heading font-semibold text-secondary">Availability</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            Working Days <span className="text-red-400">*</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {ALL_DAYS.map(({ value, label }) => {
              const selected = (formData.workingDays || []).includes(value)
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleDayToggle(value)}
                  className={`w-10 h-10 text-xs font-semibold rounded-lg border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
                    selected
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-secondary'
                  }`}
                  aria-pressed={selected}
                  aria-label={`${label}${selected ? ', selected' : ''}`}
                >
                  {label}
                </button>
              )
            })}
          </div>
          {errors.workingDays && <p className="text-xs text-red-500 mt-1">{errors.workingDays}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-secondary mb-1.5">
              <Clock size={14} className="inline mr-1 text-gray-400" aria-hidden="true" />
              Start Time <span className="text-red-400">*</span>
            </label>
            <input
              id="startTime"
              type="time"
              value={formData.workingHours?.start || '09:00'}
              onChange={(e) => handleHoursChange('start', e.target.value)}
              className={`w-full px-3 py-2 text-sm border rounded-lg text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 transition-colors ${
                errors.workingHours ? 'border-red-300 focus-visible:ring-red-500/30' : 'border-gray-200 focus:border-primary'
              }`}
            />
          </div>
          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-secondary mb-1.5">
              <Clock size={14} className="inline mr-1 text-gray-400" aria-hidden="true" />
              End Time <span className="text-red-400">*</span>
            </label>
            <input
              id="endTime"
              type="time"
              value={formData.workingHours?.end || '18:00'}
              onChange={(e) => handleHoursChange('end', e.target.value)}
              className={`w-full px-3 py-2 text-sm border rounded-lg text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 transition-colors ${
                errors.workingHours ? 'border-red-300 focus-visible:ring-red-500/30' : 'border-gray-200 focus:border-primary'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(AvailabilitySection)
