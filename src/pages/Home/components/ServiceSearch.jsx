/**
 * ServiceSearch Component
 *
 * Search input for filtering services by name or description.
 *
 * Props:
 * @param {string} query - Current search query
 * @param {function} onChange - Search change handler
 */
import { Search } from 'lucide-react'

export default function ServiceSearch({ query, onChange }) {
  return (
    <div className="relative max-w-md">
      <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      <input
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for services..."
        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-secondary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-shadow"
        aria-label="Search for services"
      />
    </div>
  )
}
