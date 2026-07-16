import { memo } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const VIEWS = [
  { key: 'month', label: 'Month' },
  { key: 'week', label: 'Week' },
  { key: 'day', label: 'Day' },
]

function CalendarHeader({ currentDate, view, onViewChange, onPrev, onNext, onToday }) {
  const title = currentDate.toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
    ...(view === 'day' && { day: 'numeric' }),
    ...(view === 'week' && { day: 'numeric' }),
  })

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-label="Previous"
        >
          <ChevronLeft size={18} className="text-gray-500" />
        </button>
        <h2 className="text-base font-heading font-semibold text-secondary min-w-[180px] text-center">{title}</h2>
        <button
          onClick={onNext}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-label="Next"
        >
          <ChevronRight size={18} className="text-gray-500" />
        </button>
        <button
          onClick={onToday}
          className="ml-1 px-2.5 py-1 text-xs font-semibold text-primary bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          Today
        </button>
      </div>

      <div className="flex bg-gray-100 rounded-lg p-0.5" role="tablist" aria-label="Calendar view">
        {VIEWS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onViewChange(key)}
            role="tab"
            aria-selected={view === key}
            className={`relative px-3 py-1.5 text-xs font-semibold rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
              view === key ? 'text-primary bg-white shadow-sm' : 'text-gray-500 hover:text-secondary'
            }`}
          >
            {view === key && (
              <motion.span
                layoutId="calendar-view-tab"
                className="absolute inset-0 bg-white rounded-md shadow-sm"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default memo(CalendarHeader)
