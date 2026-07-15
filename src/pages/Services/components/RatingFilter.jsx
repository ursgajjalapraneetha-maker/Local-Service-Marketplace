import { Star } from 'lucide-react'

export default function RatingFilter({ rating, options, onChange }) {
  return (
    <div className="space-y-1.5 px-3">
      {options.map((val) => {
        const isSelected = rating === val
        return (
          <label
            key={val}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
              isSelected ? 'bg-primary/5 text-primary' : 'hover:bg-gray-50 text-gray-600'
            }`}
          >
            <input
              type="radio"
              name="rating"
              checked={isSelected}
              onChange={() => onChange(val)}
              className="w-4 h-4 border-gray-300 text-primary focus:ring-primary/30 accent-primary"
              aria-label={`${val} stars and above`}
            />
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">{val}</span>
              <Star size={13} className={`${isSelected ? 'text-primary' : 'text-yellow-400'} fill-current`} />
            </div>
          </label>
        )
      })}
    </div>
  )
}
