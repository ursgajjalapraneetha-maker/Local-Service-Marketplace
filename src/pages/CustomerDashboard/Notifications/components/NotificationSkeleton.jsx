import { memo } from 'react'

function SkeletonBlock({ className }) {
  return (
    <div
      className={`bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-lg ${className}`}
      aria-hidden="true"
    />
  )
}

function StatSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-2">
      <div className="flex items-center justify-between">
        <SkeletonBlock className="w-9 h-9" />
        <SkeletonBlock className="w-14 h-5 rounded-full" />
      </div>
      <SkeletonBlock className="w-16 h-7" />
      <SkeletonBlock className="w-24 h-3" />
    </div>
  )
}

function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <div className="flex items-start gap-3">
        <SkeletonBlock className="w-10 h-10 rounded-full shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <SkeletonBlock className="w-40 h-4" />
            <SkeletonBlock className="w-16 h-3" />
          </div>
          <SkeletonBlock className="w-full h-3" />
          <SkeletonBlock className="w-3/4 h-3" />
          <div className="flex items-center gap-2 pt-1">
            <SkeletonBlock className="w-16 h-5 rounded-full" />
            <SkeletonBlock className="w-24 h-3" />
          </div>
        </div>
      </div>
    </div>
  )
}

function NotificationSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading notifications">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatSkeleton key={i} />
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex gap-3">
          <SkeletonBlock className="w-60 h-9" />
          <SkeletonBlock className="w-28 h-9" />
          <SkeletonBlock className="w-28 h-9" />
          <SkeletonBlock className="w-24 h-9 ml-auto" />
        </div>
      </div>

      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>

      <span className="sr-only">Loading notifications...</span>
    </div>
  )
}

export default memo(NotificationSkeleton)
