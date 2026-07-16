import { useState, useRef, useEffect, useCallback } from 'react'
import { useParams, useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { messages as messagesData } from '../data/messagesData'
import ChatHeader from './components/ChatHeader'
import MessageBubble from './components/MessageBubble'
import MessageInput from './components/MessageInput'
import AttachmentUpload from './components/AttachmentUpload'
import QuickReplies from './components/QuickReplies'
import LoadingSpinner from '../components/LoadingSpinner'

export default function ChatWindow() {
  const { conversationId } = useParams()
  const { conversations } = useOutletContext()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)

  const conversation = conversations?.find((c) => c.id === conversationId)

  useEffect(() => {
    setLoading(true)
    setMessages([])
    const timer = setTimeout(() => {
      setMessages(messagesData[conversationId] || [])
      setLoading(false)
    }, 350)
    return () => clearTimeout(timer)
  }, [conversationId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = useCallback((text) => {
    setSending(true)
    const newMsg = {
      id: `m-${Date.now()}`,
      sender: 'provider',
      text,
      timestamp: new Date().toISOString(),
      status: 'sent',
    }
    setTimeout(() => {
      setMessages((prev) => [...prev, newMsg])
      setSending(false)
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) => (m.id === newMsg.id ? { ...m, status: 'delivered' } : m))
        )
      }, 1000)
    }, 200)
  }, [])

  const handleQuickReply = useCallback((text) => {
    handleSend(text)
  }, [handleSend])

  const handleAttach = useCallback(() => {
    toast.success('File ready to send (simulated)')
  }, [])

  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm text-gray-400">Conversation not found</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader conversation={conversation} />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 bg-white">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <LoadingSpinner fullScreen={false} text="Loading messages..." />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-sm text-gray-400">No messages yet</p>
            <p className="text-xs text-gray-300 mt-1">Send a message to start the conversation</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isProvider={msg.sender === 'provider'}
            />
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <div className="relative">
        <div className="flex items-center gap-1.5 px-2">
          <QuickReplies onSelect={handleQuickReply} />
          <AttachmentUpload onAttach={handleAttach} />
          <div className="flex-1" />
        </div>
        <MessageInput onSend={handleSend} loading={sending} />
      </div>
    </div>
  )
}
