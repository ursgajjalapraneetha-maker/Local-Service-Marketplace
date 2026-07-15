import { motion } from 'framer-motion'
import { popularSearches } from '../data/heroData'

export default function PopularSearches({ onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="flex flex-wrap items-center gap-2"
    >
      <span className="text-xs text-gray-400 font-medium mr-0.5">Popular:</span>
      {popularSearches.map(({ name, icon: Icon }) => (
        <motion.button
          key={name}
          whileHover={{ scale: 1.05, y: -1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect?.(name)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-full hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-colors shadow-sm"
          aria-label={`Search for ${name}`}
        >
          <Icon size={12} className="text-primary/60" />
          {name}
        </motion.button>
      ))}
    </motion.div>
  )
}
