import { memo } from 'react'

function SkeletonBlock({ className }) {
  return (
    <div
      className={`bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-lg ${className}`}
      aria-hidden="true"
    />
  )
}

function ConversationCardSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3">
      <SkeletonBlock className="w-10 h-10 rounded-full shrink-0" />
      <div className="flex-1 space-y-2 min-w-0">
        <div className="flex items-center justify-between">
          <SkeletonBlock className="w-24 h-3" />
          <SkeletonBlock className="w-12 h-2" />
        </div>
        <SkeletonBlock className="w-3/4 h-2" />
      </div>
    </div>
  )
}

function MessageBubbleSkeleton({ isCustomer }) {
  return (
    <div className={`flex ${isCustomer ? 'justify-end' : 'justify-start'}`}>
      <SkeletonBlock className={`h-12 ${isCustomer ? 'w-48' : 'w-56'} rounded-2xl`} />
    </div>
  )
}

function MessageSkeleton() {
  return (
    <div className="flex h-[calc(100vh-12rem)] rounded-xl border border-gray-100 bg-white overflow-hidden" role="status" aria-label="Loading messages">
      <div className="w-full sm:w-80 lg:w-96 border-r border-gray-100 shrink-0">
        <div className="p-4 space-y-2 border-b border-gray-100">
          <SkeletonBlock className="w-40 h-5" />
          <SkeletonBlock className="w-full h-8 rounded-lg" />
        </div>
        <div className="divide-y divide-gray-50">
          {Array.from({ length: 6 }).map((_, i) => (
            <ConversationCardSkeleton key={i} />
          ))}
        </div>
      </div>

      <div className="hidden sm:flex flex-1 flex-col">
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <SkeletonBlock className="w-10 h-10 rounded-full" />
          <div className="space-y-1.5">
            <SkeletonBlock className="w-32 h-4" />
            <SkeletonBlock className="w-20 h-3" />
          </div>
        </div>
        <div className="flex-1 p-4 space-y-4">
          <MessageBubbleSkeleton isCustomer={false} />
          <MessageBubbleSkeleton isCustomer={true} />
          <MessageBubbleSkeleton isCustomer={false} />
          <MessageBubbleSkeleton isCustomer={true} />
          <MessageBubbleSkeleton isCustomer={true} />
        </div>
        <div className="p-4 border-t border-gray-100">
          <SkeletonBlock className="w-full h-10 rounded-xl" />
        </div>
      </div>

      <span className="sr-only">Loading messages...</span>
    </div>
  )
}

export default memo(MessageSkeleton)
