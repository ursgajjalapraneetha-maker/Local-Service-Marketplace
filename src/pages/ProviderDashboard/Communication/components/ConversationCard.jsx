import { memo } from 'react'
import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import { cn } from '../../../../utils'

function ConversationCard({ conversation, isActive, onClick }) {
  const { customer, lastMessage, unreadCount, service } = conversation
  const time = new Date(lastMessage.timestamp)
  const timeStr = time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false })
  const today = new Date()
  const dateStr = time.toDateString() === today.toDateString()
    ? timeStr
    : time.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })

  return (
    <motion.button
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'w-full text-left px-4 py-3 flex items-start gap-3 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
        isActive ? 'bg-primary/5' : 'hover:bg-gray-50'
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <div className="relative shrink-0">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
          <User size={18} className="text-primary" aria-hidden="true" />
        </div>
        {customer.isOnline && (
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" aria-label="Online" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-heading font-semibold text-secondary truncate">{customer.name}</span>
          <span className="text-[10px] text-gray-400 shrink-0">{dateStr}</span>
        </div>
        <p className="text-xs text-gray-500 mt-0.5 truncate">
          {lastMessage.sender === 'provider' && <span className="text-primary font-medium">You: </span>}
          {lastMessage.text}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] text-gray-400 truncate">{service}</span>
          {unreadCount > 0 && (
            <span className="ml-auto shrink-0 w-4 h-4 rounded-full bg-primary text-white text-[8px] font-bold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
    </motion.button>
  )
}

export default memo(ConversationCard)
