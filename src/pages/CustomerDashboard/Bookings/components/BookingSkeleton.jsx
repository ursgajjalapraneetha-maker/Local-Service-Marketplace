import { memo } from 'react'

function SkeletonBlock({ className }) {
  return (
    <div
      className={`bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-lg ${className}`}
      aria-hidden="true"
    />
  )
}

function BookingCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <SkeletonBlock className="w-full sm:w-44 lg:w-52 h-32 sm:h-40 rounded-none" />
        <div className="flex-1 p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <SkeletonBlock className="w-24 h-4" />
              <SkeletonBlock className="w-48 h-5" />
              <SkeletonBlock className="w-32 h-3" />
            </div>
            <div className="text-right space-y-2">
              <SkeletonBlock className="w-20 h-6" />
              <SkeletonBlock className="w-14 h-4 ml-auto" />
            </div>
          </div>
          <div className="flex gap-4">
            <SkeletonBlock className="w-28 h-3" />
            <SkeletonBlock className="w-28 h-3" />
            <SkeletonBlock className="w-32 h-3" />
          </div>
          <div className="flex gap-2 pt-2">
            <SkeletonBlock className="w-20 h-7 rounded-lg" />
            <SkeletonBlock className="w-20 h-7 rounded-lg" />
            <SkeletonBlock className="w-20 h-7 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}

function BookingSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading bookings">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 space-y-2">
            <SkeletonBlock className="w-8 h-8" />
            <SkeletonBlock className="w-16 h-6" />
            <SkeletonBlock className="w-24 h-3" />
          </div>
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
        </div>
      </div>

      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <BookingCardSkeleton key={i} />
        ))}
      </div>

      <span className="sr-only">Loading bookings...</span>
    </div>
  )
}

export default memo(BookingSkeleton)
