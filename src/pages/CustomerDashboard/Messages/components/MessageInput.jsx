import { memo, useState, useCallback, useRef } from 'react'
import { Smile, Paperclip, Send } from 'lucide-react'

function MessageInput({ onSend }) {
  const [text, setText] = useState('')
  const inputRef = useRef(null)

  const handleSend = useCallback(() => {
    const trimmed = text.trim()
    if (!trimmed) return
    onSend?.(trimmed)
    setText('')
    inputRef.current?.focus()
  }, [text, onSend])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }, [handleSend])

  return (
    <div className="border-t border-gray-100 p-3 bg-white">
      <div className="flex items-end gap-2">
        <button
          className="p-2 rounded-lg text-gray-400 hover:text-secondary hover:bg-gray-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-label="Add emoji"
        >
          <Smile size={18} />
        </button>
        <button
          className="p-2 rounded-lg text-gray-400 hover:text-secondary hover:bg-gray-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-label="Attach file"
        >
          <Paperclip size={18} />
        </button>
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            rows={1}
            className="w-full px-3 py-2 text-sm bg-gray-100 rounded-xl border-0 placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all min-h-[36px] max-h-32"
            aria-label="Message input"
          />
        </div>
        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className="p-2.5 rounded-xl bg-primary text-white hover:bg-primary-dark transition-all active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-label="Send message"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  )
}

export default memo(MessageInput)
