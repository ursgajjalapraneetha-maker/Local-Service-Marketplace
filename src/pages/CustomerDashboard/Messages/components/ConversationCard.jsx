import { memo } from 'react'
import { motion } from 'framer-motion'

function formatConversationTime(dateString) {
  const now = new Date()
  const date = new Date(dateString)
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Now'
  if (diffMins < 60) return `${diffMins}m`
  if (diffHours < 24) return `${diffHours}h`
  if (diffDays < 7) return `${diffDays}d`
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit' })
}

function ConversationCard({ conversation, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 flex items-center gap-3 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/30 ${
        isActive
          ? 'bg-primary/5'
          : 'hover:bg-gray-50'
      }`}
      aria-label={`Conversation with ${conversation.providerName} about ${conversation.serviceName}`}
      aria-current={isActive ? 'page' : undefined}
    >
      <div className="relative shrink-0">
        <img
          src={conversation.providerAvatar}
          alt={conversation.providerName}
          className="w-10 h-10 rounded-full object-cover"
          loading="lazy"
        />
        {conversation.online && (
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success border-2 border-white rounded-full" aria-label="Online" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className={`text-sm truncate ${conversation.unread > 0 ? 'font-semibold text-secondary' : 'font-medium text-gray-700'}`}>
            {conversation.providerName}
          </span>
          <span className="text-[11px] text-gray-400 whitespace-nowrap">
            {formatConversationTime(conversation.lastMessageTime)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p className={`text-xs truncate ${conversation.unread > 0 ? 'font-medium text-gray-700' : 'text-gray-500'}`}>
            {conversation.lastMessageSender === 'customer' && (
              <span className="text-gray-400">You: </span>
            )}
            {conversation.lastMessage}
          </p>
          {conversation.unread > 0 && (
            <span className="w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">
              {conversation.unread > 9 ? '9+' : conversation.unread}
            </span>
          )}
        </div>

        <p className="text-[11px] text-gray-400 mt-0.5 truncate">{conversation.serviceName}</p>
      </div>
    </button>
  )
}

export default memo(ConversationCard)
