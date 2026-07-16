import { motion } from 'framer-motion'
import { MessageSquare } from 'lucide-react'

export default function EmptyMessages({ isChat = false }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center h-full min-h-[300px] px-4"
    >
      <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
        <MessageSquare size={28} className="text-gray-300" aria-hidden="true" />
      </div>
      {isChat ? (
        <>
          <h3 className="text-base font-heading font-semibold text-secondary mb-1">Select a Conversation</h3>
          <p className="text-sm text-gray-500 text-center max-w-xs">
            Choose a conversation from the left panel to start chatting.
          </p>
        </>
      ) : (
        <>
          <h3 className="text-base font-heading font-semibold text-secondary mb-1">No Conversations Yet</h3>
          <p className="text-sm text-gray-500 text-center max-w-xs">
            When customers book your services, conversations will appear here.
          </p>
        </>
      )}
    </motion.div>
  )
}
