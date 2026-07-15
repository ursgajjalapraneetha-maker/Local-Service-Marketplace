export default function ExperienceFilter({ selected, onChange }) {
  return (
    <div className="space-y-1.5">
      {['1+', '3+', '5+', '10+'].map((val) => {
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
              aria-label={`${val} years experience`}
            />
            <span className="text-sm font-medium">{val} Years</span>
          </label>
        )
      })}
    </div>
  )
}
