import { Search, X } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * Premium FAQ Search component with clear feedback and keyboard support.
 *
 * @param {{ searchQuery: string, onSearchChange: Function }} props
 */
export default function FAQSearch({ searchQuery, onSearchChange }) {
  return (
    <div className="relative max-w-2xl mx-auto mb-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative group"
      >
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10"
          aria-hidden="true"
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search FAQs... (e.g., 'payment', 'booking', 'verification')"
          className="w-full pl-12 pr-12 py-4 bg-white border border-gray-200 rounded-xl text-sm text-secondary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 shadow-sm hover:shadow-md"
          aria-label="Search FAQs"
        />
        {searchQuery && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onSearchChange('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-secondary transition-colors rounded-lg hover:bg-gray-50"
            aria-label="Clear search"
          >
            <X size={16} />
          </motion.button>
        )}
      </motion.div>
    </div>
  )
}
