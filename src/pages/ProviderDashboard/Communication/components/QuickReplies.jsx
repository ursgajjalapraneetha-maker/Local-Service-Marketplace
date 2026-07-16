import { memo, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, ChevronDown, ChevronUp } from 'lucide-react'

const DEFAULT_REPLIES = [
  'Your booking has been confirmed.',
  'I will arrive at the scheduled time.',
  'Your service has been completed.',
  'Please let me know if you have any questions.',
  'Thank you for choosing our service!',
  'I will send you an update shortly.',
]

function QuickReplies({ onSelect, onCustomize }) {
  const [open, setOpen] = useState(false)

  const handleSelect = useCallback((text) => {
    onSelect?.(text)
  }, [onSelect])

  return (
    <div className="shrink-0">
      <button
        onClick={() => setOpen(!open)}
        className="shrink-0 w-10 h-10 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        aria-label="Quick replies"
        title="Quick replies"
      >
        <Zap size={16} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 8, height: 0 }}
            className="absolute bottom-full left-0 right-0 mb-2 mx-4 bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden z-20"
          >
            <div className="p-2.5 space-y-1">
              <p className="text-[10px] font-medium text-gray-400 px-1 uppercase tracking-wider">Quick Replies</p>
              {DEFAULT_REPLIES.map((reply, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(reply)}
                  className="w-full text-left px-2.5 py-2 text-xs text-secondary hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                >
                  {reply}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default memo(QuickReplies)
