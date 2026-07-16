import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import MessagesHeader from './components/MessagesHeader'
import ConversationList from './components/ConversationList'
import ChatWindow from './components/ChatWindow'
import MessageSkeleton from './components/MessageSkeleton'
import { CONVERSATIONS_DATA, MESSAGES_DATA } from './components/messagesData'

const LS_CONVERSATIONS_KEY = 'local_marketplace_conversations'
const LS_MESSAGES_KEY = 'local_marketplace_messages'
const LS_ACTIVE_KEY = 'local_marketplace_active_chat'

function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (parsed) return parsed
    }
  } catch {}
  return fallback
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch {}
}

function generateId() {
  return `MSG-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
}

export default function Messages() {
  const [loading, setLoading] = useState(true)
  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState({})
  const [activeConversationId, setActiveConversationId] = useState(null)
  const initialized = useRef(false)

  useEffect(() => {
    setConversations(loadFromStorage(LS_CONVERSATIONS_KEY, CONVERSATIONS_DATA))
    setMessages(loadFromStorage(LS_MESSAGES_KEY, MESSAGES_DATA))
    setActiveConversationId(loadFromStorage(LS_ACTIVE_KEY, null))
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (initialized.current) {
      saveToStorage(LS_CONVERSATIONS_KEY, conversations)
    }
  }, [conversations])

  useEffect(() => {
    if (initialized.current) {
      saveToStorage(LS_MESSAGES_KEY, messages)
    }
  }, [messages])

  useEffect(() => {
    if (initialized.current) {
      saveToStorage(LS_ACTIVE_KEY, activeConversationId)
    }
  }, [activeConversationId])

  useEffect(() => {
    initialized.current = true
  }, [])

  const activeConversation = useMemo(
    () => conversations.find((c) => c.id === activeConversationId) || null,
    [conversations, activeConversationId]
  )

  const activeMessages = useMemo(
    () => (activeConversationId ? messages[activeConversationId] || [] : []),
    [messages, activeConversationId]
  )

  const handleSelectConversation = useCallback((conversationId) => {
    setActiveConversationId(conversationId)
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId ? { ...c, unread: 0 } : c
      )
    )
  }, [])

  const handleSend = useCallback((text) => {
    if (!activeConversationId) return

    const newMessage = {
      id: generateId(),
      sender: 'customer',
      text,
      time: new Date().toISOString(),
      status: 'sent',
    }

    setMessages((prev) => ({
      ...prev,
      [activeConversationId]: [...(prev[activeConversationId] || []), newMessage],
    }))

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversationId
          ? {
              ...c,
              lastMessage: text,
              lastMessageTime: new Date().toISOString(),
              lastMessageSender: 'customer',
            }
          : c
      )
    )

    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [activeConversationId]: (prev[activeConversationId] || []).map((m) =>
          m.id === newMessage.id ? { ...m, status: 'delivered' } : m
        ),
      }))
    }, 1000)

    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [activeConversationId]: (prev[activeConversationId] || []).map((m) =>
          m.id === newMessage.id ? { ...m, status: 'read' } : m
        ),
      }))
    }, 2000)
  }, [activeConversationId])

  const handleBack = useCallback(() => {
    setActiveConversationId(null)
  }, [])

  if (loading) return <MessageSkeleton />

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <MessagesHeader />

      <div className="flex h-[calc(100vh-12rem)] rounded-xl border border-gray-100 bg-white overflow-hidden">
        <div className={`${
          activeConversationId ? 'hidden sm:flex' : 'flex'
        } w-full sm:w-80 lg:w-96 border-r border-gray-100 flex-col shrink-0`}>
          <ConversationList
            conversations={conversations}
            activeConversationId={activeConversationId}
            onSelect={handleSelectConversation}
          />
        </div>

        <div className={`${
          activeConversationId ? 'flex' : 'hidden sm:flex'
        } flex-1 flex-col min-w-0`}>
          <ChatWindow
            conversation={activeConversation}
            messages={activeMessages}
            onSend={handleSend}
            onBack={handleBack}
          />
        </div>
      </div>
    </motion.div>
  )
}
