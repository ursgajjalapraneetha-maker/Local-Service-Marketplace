import { useCallback } from 'react'

const MIN_PRICE = 0
const MAX_PRICE = 20000

export default function PriceRangeFilter({ range, onChange }) {
  const [minVal, maxVal] = range

  const handleMinChange = useCallback(
    (e) => {
      const val = Math.min(Number(e.target.value), maxVal - 100)
      onChange([val, maxVal])
    },
    [maxVal, onChange]
  )

  const handleMaxChange = useCallback(
    (e) => {
      const val = Math.max(Number(e.target.value), minVal + 100)
      onChange([minVal, val])
    },
    [minVal, onChange]
  )

  const minPercent = (minVal / MAX_PRICE) * 100
  const maxPercent = (maxVal / MAX_PRICE) * 100

  return (
    <div className="px-3 py-1">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-secondary">₹{minVal.toLocaleString('en-IN')}</span>
        <span className="text-sm font-medium text-secondary">₹{maxVal.toLocaleString('en-IN')}</span>
      </div>

      <div className="relative h-2">
        <div className="absolute inset-0 bg-gray-200 rounded-full" />
        <div
          className="absolute inset-y-0 rounded-full bg-primary/30"
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
        />
        <input
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={100}
          value={minVal}
          onChange={handleMinChange}
          className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white"
          aria-label="Minimum price"
        />
        <input
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={100}
          value={maxVal}
          onChange={handleMaxChange}
          className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white"
          aria-label="Maximum price"
        />
      </div>
    </div>
  )
}
