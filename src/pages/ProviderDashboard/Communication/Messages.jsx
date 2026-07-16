import { useState, useEffect, useCallback } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { conversations } from '../data/messagesData'
import PageContainer from '../components/PageContainer'
import ConversationList from './components/ConversationList'
import EmptyMessages from './components/EmptyMessages'

export default function Messages() {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [convList] = useState(conversations)

  const activeId = location.pathname.split('/').pop()
  const hasChat = location.pathname.includes('/messages/') && activeId !== 'messages'

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  const handleSelect = useCallback((id) => {
    navigate(`/provider-dashboard/messages/${id}`)
  }, [navigate])

  if (loading) {
    return (
      <PageContainer title="Messages" subtitle="Communicate with customers and manage conversations.">
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden h-[600px] flex" role="status" aria-label="Loading messages">
          <div className="w-full lg:w-80 border-r border-gray-100 p-3 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 w-24 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded" />
                  <div className="h-2 w-32 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded" />
                </div>
              </div>
            ))}
          </div>
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <span className="text-sm text-gray-400">Loading...</span>
          </div>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer title="Messages" subtitle="Communicate with customers and manage conversations.">
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden h-[calc(100vh-16rem)] min-h-[480px] max-h-[720px] flex">
        <div className={`${hasChat ? 'hidden' : 'flex'} lg:flex w-full lg:w-80 border-r border-gray-100 flex-col shrink-0`}>
          <ConversationList
            conversations={convList}
            activeId={hasChat ? activeId : null}
            onSelect={handleSelect}
          />
        </div>

        <div className={`flex-1 flex flex-col ${!hasChat ? 'hidden lg:flex' : 'flex'}`}>
          <Outlet context={{ conversations: convList }} />
        </div>

        {!hasChat && (
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <EmptyMessages isChat />
          </div>
        )}
      </div>
    </PageContainer>
  )
}
