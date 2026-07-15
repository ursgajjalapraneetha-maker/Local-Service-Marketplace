import { serviceCategories } from '../data/services'

export default function CategoryFilter({ selected, onChange }) {
  return (
    <div className="space-y-1.5">
      {serviceCategories.map((cat) => {
        const isChecked = selected.has(cat.name)
        return (
          <label
            key={cat.id}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
              isChecked ? 'bg-primary/5 text-primary' : 'hover:bg-gray-50 text-gray-600'
            }`}
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => onChange(cat.name)}
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/30 accent-primary"
              aria-label={`Filter by ${cat.name}`}
            />
            <span className="text-sm font-medium">{cat.name}</span>
          </label>
        )
      })}
    </div>
  )
}
