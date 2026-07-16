import { memo } from 'react'
import PaymentSearch from './PaymentSearch'
import PaymentFilters from './PaymentFilters'

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'amount_high', label: 'Highest Amount' },
  { value: 'amount_low', label: 'Lowest Amount' },
]

function PaymentToolbar({
  searchQuery,
  onSearchChange,
  statusFilter,
  dateFilter,
  onStatusChange,
  onDateChange,
  onResetFilters,
  sortValue,
  onSortChange,
  resultsCount,
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <PaymentSearch value={searchQuery} onChange={onSearchChange} />
        <select
          value={sortValue}
          onChange={(e) => onSortChange(e.target.value)}
          className="text-xs bg-gray-100 border-0 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
          aria-label="Sort payments"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <div className="text-xs text-gray-400 ml-auto whitespace-nowrap">
          <span className="font-semibold text-secondary">{resultsCount}</span> payment{resultsCount !== 1 ? 's' : ''} found
        </div>
      </div>
      <PaymentFilters
        statusFilter={statusFilter}
        dateFilter={dateFilter}
        onStatusChange={onStatusChange}
        onDateChange={onDateChange}
        onReset={onResetFilters}
      />
    </div>
  )
}

export default memo(PaymentToolbar)
