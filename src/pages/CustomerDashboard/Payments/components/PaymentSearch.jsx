import { memo, useState, useCallback, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'

function PaymentSearch({ value, onChange }) {
  const [localValue, setLocalValue] = useState(value || '')
  const timerRef = useRef(null)

  const handleChange = useCallback((e) => {
    const val = e.target.value
    setLocalValue(val)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      onChange(val)
    }, 300)
  }, [onChange])

  const handleClear = useCallback(() => {
    setLocalValue('')
    onChange('')
  }, [onChange])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <div className="relative flex-1 max-w-xs">
      <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden="true" />
      <input
        type="search"
        value={localValue}
        onChange={handleChange}
        placeholder="Search by booking ID, service, or provider..."
        className="w-full pl-9 pr-8 py-2 text-sm bg-gray-100 rounded-lg border-0 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        aria-label="Search payments"
      />
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}

export default memo(PaymentSearch)
