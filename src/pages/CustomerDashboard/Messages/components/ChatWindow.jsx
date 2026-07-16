import { memo, useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatHeader from './ChatHeader'
import MessageBubble from './MessageBubble'
import MessageInput from './MessageInput'
import TypingIndicator from './TypingIndicator'
import EmptyChat from './EmptyChat'

function ChatWindow({ conversation, messages, onSend, onBack }) {
  const messagesEndRef = useRef(null)
  const [isTyping, setIsTyping] = useState(false)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (!conversation) return
    const timer = setTimeout(() => setIsTyping(true), 3000)
    const stopTimer = setTimeout(() => setIsTyping(false), 8000)
    return () => {
      clearTimeout(timer)
      clearTimeout(stopTimer)
    }
  }, [conversation])

  if (!conversation) return <EmptyChat />

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <ChatHeader conversation={conversation} onBack={onBack} />

      <div className="flex-1 overflow-y-auto p-4 space-y-1.5 bg-gray-50/30">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-gray-400">No messages yet. Start a conversation!</p>
          </div>
        ) : (
          <>
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </AnimatePresence>
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                >
                  <TypingIndicator />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput onSend={onSend} />
    </div>
  )
}

export default memo(ChatWindow)
