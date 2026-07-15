import { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SearchBox({ variant = 'desktop' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  if (variant === 'mobile') {
    return (
      <div className="relative px-4 py-3">
        <Search size={16} className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search services..."
          className="w-full pl-9 pr-4 py-2.5 bg-gray-100 border-0 rounded-lg text-sm text-secondary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
        />
      </div>
    )
  }

  return (
    <div className="relative flex items-center">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="input"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 220, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center"
          >
            <div className="relative w-full">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services..."
                className="w-full pl-9 pr-8 py-2 bg-gray-100 border-0 rounded-lg text-sm text-secondary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
              />
              <button
                onClick={() => {
                  setIsOpen(false)
                  setQuery('')
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-secondary transition-colors"
                aria-label="Close search"
              >
                <X size={14} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="icon"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-lg text-secondary/60 hover:text-secondary hover:bg-gray-100 transition-colors"
            aria-label="Open search"
          >
            <Search size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
