import { Search } from 'lucide-react'

export default function SearchInput({ value, onChange }) {
  return (
    <div className="relative flex-1 min-w-0">
      <label htmlFor="service-search" className="sr-only">
        Search services
      </label>
      <Search
        size={16}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />
      <input
        id="service-search"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search services..."
        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-secondary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        aria-label="Search by service name, provider, or description"
      />
    </div>
  )
}
