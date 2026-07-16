import { memo } from 'react'
import { motion } from 'framer-motion'
import { Check, CheckCheck } from 'lucide-react'

const STATUS_ICONS = {
  sent: { icon: Check, color: 'text-gray-400' },
  delivered: { icon: CheckCheck, color: 'text-gray-400' },
  read: { icon: CheckCheck, color: 'text-primary' },
}

function MessageBubble({ message, isProvider }) {
  const time = new Date(message.timestamp)
  const timeStr = time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false })
  const StatusIcon = STATUS_ICONS[message.status]?.icon
  const statusColor = STATUS_ICONS[message.status]?.color

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isProvider ? 'justify-end' : 'justify-start'} mb-2`}
    >
      <div
        className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-3.5 py-2.5 ${
          isProvider
            ? 'bg-primary text-white rounded-br-md'
            : 'bg-gray-100 text-secondary rounded-bl-md'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.text}</p>
        <div className={`flex items-center justify-end gap-1 mt-1 ${isProvider ? 'text-white/70' : 'text-gray-400'}`}>
          <span className="text-[10px]">{timeStr}</span>
          {isProvider && StatusIcon && (
            <StatusIcon size={11} className={statusColor} aria-label={message.status} />
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default memo(MessageBubble)
