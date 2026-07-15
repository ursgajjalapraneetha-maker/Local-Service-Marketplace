export default function ProviderTypeFilter({ selected, onChange }) {
  const options = ['Verified', 'Top Rated', 'Instant Booking']

  return (
    <div className="space-y-1.5">
      {options.map((val) => {
        const isChecked = selected.has(val)
        return (
          <label
            key={val}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
              isChecked ? 'bg-primary/5 text-primary' : 'hover:bg-gray-50 text-gray-600'
            }`}
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => onChange(val)}
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/30 accent-primary"
              aria-label={val}
            />
            <span className="text-sm font-medium">{val}</span>
          </label>
        )
      })}
    </div>
  )
}
