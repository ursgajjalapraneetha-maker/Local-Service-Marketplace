import { memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Scale, X } from 'lucide-react'

function CompareBar({ items, onRemove, onClear, onCompare, maxItems }) {
  if (items.length === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-2xl px-4 py-3"
        role="region"
        aria-label="Compare panel"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Scale size={18} className="text-primary shrink-0" />
            <span className="text-sm font-semibold text-secondary whitespace-nowrap">
              Compare ({items.length}/{maxItems})
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {items.map((id) => (
                <span
                  key={id}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/5 text-primary text-xs font-medium rounded-full whitespace-nowrap"
                >
                  Service #{id}
                  <button
                    onClick={() => onRemove(id)}
                    className="hover:bg-primary/10 rounded-full p-0.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                    aria-label={`Remove service ${id} from compare`}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onClear}
              className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              aria-label="Clear all compared services"
            >
              Clear
            </button>
            <button
              onClick={onCompare}
              disabled={items.length < 2}
              className="px-4 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              aria-label="Compare selected services"
            >
              Compare
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default memo(CompareBar)
