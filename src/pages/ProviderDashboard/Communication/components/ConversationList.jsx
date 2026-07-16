import { memo, useState, useMemo, useCallback } from 'react'
import { Search, MessageSquarePlus } from 'lucide-react'
import ConversationCard from './ConversationCard'

function ConversationList({ conversations, activeId, onSelect }) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search.trim()) return conversations
    const q = search.toLowerCase()
    return conversations.filter(
      (c) =>
        c.customer.name.toLowerCase().includes(q) ||
        c.service.toLowerCase().includes(q) ||
        c.lastMessage.text.toLowerCase().includes(q)
    )
  }, [conversations, search])

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-gray-100">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 placeholder:text-gray-400"
            aria-label="Search conversations"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-gray-50" role="listbox" aria-label="Conversations">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
            <MessageSquarePlus size={28} className="text-gray-300 mb-2" aria-hidden="true" />
            <p className="text-xs text-gray-500">No conversations match your search</p>
          </div>
        ) : (
          filtered.map((conv) => (
            <ConversationCard
              key={conv.id}
              conversation={conv}
              isActive={conv.id === activeId}
              onClick={() => onSelect(conv.id)}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default memo(ConversationList)
