import { ArrowUpDown } from 'lucide-react'

export default function SortDropdown({ sortOption, options, onChange }) {
  return (
    <div className="relative">
      <label htmlFor="sort-select" className="sr-only">Sort by</label>
      <div className="flex items-center gap-2">
        <ArrowUpDown size={14} className="text-gray-400 shrink-0" />
        <select
          id="sort-select"
          value={sortOption}
          onChange={(e) => onChange(e.target.value)}
          className="text-sm text-secondary bg-transparent border-0 cursor-pointer focus:outline-none focus:ring-0 pr-6 appearance-none"
          aria-label="Sort services"
        >
          <option value="">Sort by</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
