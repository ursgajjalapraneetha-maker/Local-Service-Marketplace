import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, ArrowRight } from 'lucide-react'
import { locations } from '../data/heroData'

export default function HeroSearch({ searchQuery, setSearchQuery, onSearch }) {
  const [location, setLocation] = useState(locations[0])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full"
    >
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-1.5 rounded-2xl shadow-xl shadow-primary/5 border border-gray-100">
        {/* Location Selector */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 rounded-xl min-w-[150px]">
          <MapPin size={16} className="text-primary flex-shrink-0" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-transparent text-sm text-secondary font-medium focus:outline-none cursor-pointer w-full"
            aria-label="Select your location"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Search Input */}
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch?.(searchQuery)}
            placeholder="What service do you need?"
            className="w-full pl-10 pr-4 py-2.5 bg-transparent text-sm text-secondary placeholder:text-gray-400 focus:outline-none"
            aria-label="Search for a service"
          />
        </div>

        {/* Search Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSearch?.(searchQuery)}
          className="px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors flex items-center gap-2 justify-center whitespace-nowrap shadow-lg shadow-primary/20"
          aria-label="Search services"
        >
          Search
          <ArrowRight size={16} />
        </motion.button>
      </div>
    </motion.div>
  )
}
