import { memo } from 'react'
import { motion } from 'framer-motion'
import { Check, CheckCheck } from 'lucide-react'

function formatMessageTime(dateString) {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
}

const STATUS_ICONS = {
  sent: Check,
  delivered: CheckCheck,
  read: CheckCheck,
}

const STATUS_COLORS = {
  sent: 'text-gray-400',
  delivered: 'text-gray-400',
  read: 'text-primary',
}

function MessageBubble({ message }) {
  const isCustomer = message.sender === 'customer'
  const StatusIcon = STATUS_ICONS[message.status] || Check

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isCustomer ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[75%] sm:max-w-[65%] ${isCustomer ? 'order-1' : 'order-1'}`}>
        <div
          className={`px-3.5 py-2 rounded-2xl text-sm leading-relaxed ${
            isCustomer
              ? 'bg-primary text-white rounded-br-md'
              : 'bg-gray-100 text-secondary rounded-bl-md'
          }`}
        >
          <p className="whitespace-pre-wrap break-words">{message.text}</p>
        </div>
        <div className={`flex items-center gap-1 mt-0.5 ${isCustomer ? 'justify-end' : 'justify-start'} px-1`}>
          <span className="text-[10px] text-gray-400">{formatMessageTime(message.time)}</span>
          {isCustomer && (
            <StatusIcon size={11} className={STATUS_COLORS[message.status] || 'text-gray-400'} aria-label={message.status} />
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default memo(MessageBubble)
