import { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MessageSquare } from 'lucide-react'

function MessagesHeader() {
  const navigate = useNavigate()

  const handleBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleBack}
        className="p-2 -ml-2 rounded-lg text-gray-400 hover:text-secondary hover:bg-gray-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        aria-label="Go back"
      >
        <ArrowLeft size={18} />
      </button>
      <div>
        <div className="flex items-center gap-2">
          <MessageSquare size={20} className="text-primary" aria-hidden="true" />
          <h1 className="text-xl lg:text-2xl font-heading font-bold text-secondary">Messages</h1>
        </div>
        <p className="text-sm text-gray-500 mt-0.5">Conversations with service providers</p>
      </div>
    </div>
  )
}

export default memo(MessagesHeader)
