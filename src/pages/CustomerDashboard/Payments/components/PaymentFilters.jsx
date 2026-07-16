import { memo, useCallback } from 'react'
import { RotateCcw } from 'lucide-react'

const STATUS_OPTIONS = [
  { value: '', label: 'All Status' },
  { value: 'completed', label: 'Completed' },
  { value: 'pending', label: 'Pending' },
  { value: 'failed', label: 'Failed' },
  { value: 'refunded', label: 'Refunded' },
]

const DATE_OPTIONS = [
  { value: '', label: 'All Dates' },
  { value: 'this_month', label: 'This Month' },
  { value: 'last_month', label: 'Last Month' },
]

function PaymentFilters({ statusFilter, dateFilter, onStatusChange, onDateChange, onReset }) {
  const hasFilters = statusFilter || dateFilter

  const handleStatusChange = useCallback((e) => onStatusChange(e.target.value), [onStatusChange])
  const handleDateChange = useCallback((e) => onDateChange(e.target.value), [onDateChange])

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={statusFilter}
        onChange={handleStatusChange}
        className="text-xs bg-gray-100 border-0 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
        aria-label="Filter by payment status"
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      <select
        value={dateFilter}
        onChange={handleDateChange}
        className="text-xs bg-gray-100 border-0 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
        aria-label="Filter by date"
      >
        {DATE_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      {hasFilters && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-danger px-2 py-2 rounded-lg hover:bg-danger/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-label="Reset filters"
        >
          <RotateCcw size={12} />
          Reset
        </button>
      )}
    </div>
  )
}

export default memo(PaymentFilters)
