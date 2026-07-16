import { memo } from 'react'
import { ArrowLeft, Phone, Video } from 'lucide-react'

function ChatHeader({ conversation, onBack }) {
  if (!conversation) return null

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onBack}
          className="sm:hidden p-1 -ml-1 rounded-lg text-gray-400 hover:text-secondary hover:bg-gray-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-label="Back to conversations"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="relative shrink-0">
          <img
            src={conversation.providerAvatar}
            alt={conversation.providerName}
            className="w-9 h-9 rounded-full object-cover"
            loading="lazy"
          />
          {conversation.online && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success border-2 border-white rounded-full" aria-label="Online" />
          )}
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-secondary truncate">{conversation.providerName}</h3>
          <div className="flex items-center gap-2">
            <span className={`text-[11px] ${conversation.online ? 'text-success' : 'text-gray-400'}`}>
              {conversation.online ? 'Online' : 'Offline'}
            </span>
            <span className="text-[11px] text-gray-300">·</span>
            <span className="text-[11px] text-gray-400 truncate">{conversation.serviceName}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          className="p-2 rounded-lg text-gray-400 hover:text-secondary hover:bg-gray-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-label={`Call ${conversation.providerName}`}
        >
          <Phone size={16} />
        </button>
        <button
          className="p-2 rounded-lg text-gray-400 hover:text-secondary hover:bg-gray-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-label={`Video call ${conversation.providerName}`}
        >
          <Video size={16} />
        </button>
      </div>
    </div>
  )
}

export default memo(ChatHeader)
