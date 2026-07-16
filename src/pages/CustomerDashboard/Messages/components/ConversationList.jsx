import { memo, useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import ConversationCard from './ConversationCard'

function ConversationList({ conversations, activeConversationId, onSelect }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [localValue, setLocalValue] = useState('')
  const timerRef = useRef(null)

  const handleChange = useCallback((e) => {
    const val = e.target.value
    setLocalValue(val)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setSearchQuery(val)
    }, 300)
  }, [])

  const handleClear = useCallback(() => {
    setLocalValue('')
    setSearchQuery('')
  }, [])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations
    const q = searchQuery.toLowerCase()
    return conversations.filter(
      (c) =>
        c.providerName.toLowerCase().includes(q) ||
        c.serviceName.toLowerCase().includes(q)
    )
  }, [conversations, searchQuery])

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-gray-100">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden="true" />
          <input
            type="search"
            value={localValue}
            onChange={handleChange}
            placeholder="Search conversations..."
            className="w-full pl-8 pr-7 py-1.5 text-xs bg-gray-100 rounded-lg border-0 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            aria-label="Search conversations"
          />
          {localValue && (
            <button
              onClick={handleClear}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              aria-label="Clear search"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-gray-50" role="list" aria-label="Conversations">
        {filteredConversations.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-xs text-gray-400">No conversations found</p>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <ConversationCard
              key={conversation.id}
              conversation={conversation}
              isActive={conversation.id === activeConversationId}
              onClick={() => onSelect(conversation.id)}
            />
          ))
        )}
      </div>

      <div className="p-3 border-t border-gray-100 text-center">
        <p className="text-[11px] text-gray-400">{filteredConversations.length} conversation{filteredConversations.length !== 1 ? 's' : ''}</p>
      </div>
    </div>
  )
}

export default memo(ConversationList)
