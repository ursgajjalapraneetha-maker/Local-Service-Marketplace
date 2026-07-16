import { memo, useState, useCallback, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

function MessageInput({ onSend, loading }) {
  const [text, setText] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSend = useCallback(() => {
    const trimmed = text.trim()
    if (!trimmed || loading) return
    onSend?.(trimmed)
    setText('')
    inputRef.current?.focus()
  }, [text, loading, onSend])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }, [handleSend])

  return (
    <div className="flex items-end gap-2 px-4 py-3 border-t border-gray-100 bg-white">
      <div className="flex-1 relative">
        <textarea
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={1}
          disabled={loading}
          className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 bg-gray-50 resize-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 placeholder:text-gray-400 disabled:opacity-50"
          aria-label="Message input"
          style={{ minHeight: 40, maxHeight: 120 }}
          onInput={(e) => {
            e.target.style.height = 'auto'
            e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
          }}
        />
      </div>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleSend}
        disabled={!text.trim() || loading}
        className="shrink-0 w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-all disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        aria-label="Send message"
      >
        <Send size={16} aria-hidden="true" />
      </motion.button>
    </div>
  )
}

export default memo(MessageInput)
