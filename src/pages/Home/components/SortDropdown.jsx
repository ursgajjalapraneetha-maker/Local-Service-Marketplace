/**
 * SortDropdown Component
 *
 * Dropdown for sorting services by different criteria.
 *
 * Props:
 * @param {string} value - Current sort value
 * @param {function} onChange - Sort change handler
 */
import { ArrowUpDown } from 'lucide-react'
import { sortOptions } from '../data/services'

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-sm">
        <ArrowUpDown size={14} className="text-gray-400 flex-shrink-0" />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent text-sm text-gray-600 font-medium focus:outline-none cursor-pointer pr-4"
          aria-label="Sort services"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
