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
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <SkeletonBlock className="w-full h-40 rounded-none" />
      <div className="p-3.5 space-y-2.5">
        <SkeletonBlock className="w-3/4 h-4" />
        <SkeletonBlock className="w-1/3 h-3" />
        <div className="flex items-center gap-1">
          <SkeletonBlock className="w-16 h-3" />
          <SkeletonBlock className="w-12 h-3" />
        </div>
        <SkeletonBlock className="w-full h-3" />
        <div className="flex items-center justify-between pt-1">
          <SkeletonBlock className="w-16 h-6" />
          <SkeletonBlock className="w-20 h-7 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

function RecentlyViewedSkeleton() {
  return (
    <div className="flex gap-4 overflow-hidden">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="min-w-[220px] w-[220px] shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <SkeletonBlock className="w-full h-28 rounded-none" />
            <div className="p-3 space-y-2">
              <SkeletonBlock className="w-3/4 h-3" />
              <div className="flex items-center gap-2">
                <SkeletonBlock className="w-12 h-3" />
                <SkeletonBlock className="w-12 h-3" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function WishlistSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading wishlist">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatSkeleton key={i} />
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex gap-3">
          <SkeletonBlock className="w-60 h-9" />
          <SkeletonBlock className="w-32 h-9" />
          <SkeletonBlock className="w-24 h-9 ml-auto" />
        </div>
        <div className="flex gap-2">
          <SkeletonBlock className="w-28 h-8" />
          <SkeletonBlock className="w-28 h-8" />
          <SkeletonBlock className="w-28 h-8" />
          <SkeletonBlock className="w-28 h-8" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <SkeletonBlock className="w-5 h-5" />
          <SkeletonBlock className="w-40 h-4" />
        </div>
        <RecentlyViewedSkeleton />
      </div>

      <span className="sr-only">Loading wishlist...</span>
    </div>
  )
}

export default memo(WishlistSkeleton)
