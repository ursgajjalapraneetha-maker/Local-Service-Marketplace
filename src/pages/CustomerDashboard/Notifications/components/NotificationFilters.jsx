import { memo, useCallback } from 'react'
import { RotateCcw } from 'lucide-react'

const TYPE_OPTIONS = [
  { value: '', label: 'All Notifications' },
  { value: 'unread', label: 'Unread' },
  { value: 'read', label: 'Read' },
  { value: 'bookings', label: 'Bookings' },
  { value: 'payments', label: 'Payments' },
  { value: 'offers', label: 'Offers' },
  { value: 'system', label: 'System' },
  { value: 'messages', label: 'Messages' },
]

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'unread_first', label: 'Unread First' },
  { value: 'read_first', label: 'Read First' },
]

function NotificationFilters({
  typeFilter,
  sortValue,
  onTypeChange,
  onSortChange,
  onReset,
}) {
  const hasFilters = typeFilter

  const handleTypeChange = useCallback((e) => onTypeChange(e.target.value), [onTypeChange])
  const handleSortChange = useCallback((e) => onSortChange(e.target.value), [onSortChange])

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={typeFilter}
        onChange={handleTypeChange}
        className="text-xs bg-gray-100 border-0 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
        aria-label="Filter by type"
      >
        {TYPE_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      <select
        value={sortValue}
        onChange={handleSortChange}
        className="text-xs bg-gray-100 border-0 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
        aria-label="Sort notifications"
      >
        {SORT_OPTIONS.map((opt) => (
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

export default memo(NotificationFilters)
