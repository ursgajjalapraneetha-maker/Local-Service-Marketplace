import { memo } from 'react'
import { motion } from 'framer-motion'
import { Inbox } from 'lucide-react'

function EmptyState({ icon: Icon = Inbox, title = 'Nothing here', message = 'No items to display.', action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-4"
    >
      <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
        <Icon size={26} className="text-gray-300" aria-hidden="true" />
      </div>
      <h3 className="text-base font-heading font-semibold text-secondary mb-1">{title}</h3>
      <p className="text-sm text-gray-500 text-center max-w-xs mb-4">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          {action.label}
        </button>
      )}
    </motion.div>
  )
}

export default memo(EmptyState)
