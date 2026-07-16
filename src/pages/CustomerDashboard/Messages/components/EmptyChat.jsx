import { memo } from 'react'
import { MessageSquare } from 'lucide-react'

function EmptyChat() {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare size={32} className="text-primary/40" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-secondary">Select a Conversation</h3>
        <p className="mt-1 text-sm text-gray-500">
          Choose a conversation from the sidebar to start chatting with your service provider.
        </p>
      </div>
    </div>
  )
}

export default memo(EmptyChat)
