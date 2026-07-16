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
    <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-3">
      <div className="flex items-center justify-between">
        <SkeletonBlock className="w-10 h-10" />
        <SkeletonBlock className="w-14 h-5 rounded-full" />
      </div>
      <SkeletonBlock className="w-20 h-8" />
      <SkeletonBlock className="w-28 h-3" />
    </div>
  )
}

function WidgetSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
      <div className="flex items-center gap-2">
        <SkeletonBlock className="w-5 h-5" />
        <SkeletonBlock className="w-32 h-4" />
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-start gap-3">
          <SkeletonBlock className="w-8 h-8 rounded-full shrink-0" />
          <div className="flex-1 space-y-1.5">
            <SkeletonBlock className="w-3/4 h-3" />
            <SkeletonBlock className="w-full h-2" />
            <SkeletonBlock className="w-16 h-2" />
          </div>
        </div>
      ))}
    </div>
  )
}

function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <SkeletonBlock className="w-full h-32 rounded-none" />
      <div className="p-3.5 space-y-2.5">
        <SkeletonBlock className="w-3/4 h-3" />
        <SkeletonBlock className="w-1/3 h-3" />
        <div className="flex items-center justify-between pt-1">
          <SkeletonBlock className="w-16 h-5" />
          <SkeletonBlock className="w-16 h-7 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading dashboard">
      <SkeletonBlock className="w-full h-40 rounded-2xl" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatSkeleton key={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WidgetSkeleton />
        <WidgetSkeleton />
      </div>

      <WidgetSkeleton />

      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="min-w-[240px] w-[240px]">
            <CardSkeleton />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
            <SkeletonBlock className="w-10 h-10 rounded-lg" />
            <SkeletonBlock className="w-20 h-3" />
          </div>
        ))}
      </div>

      <span className="sr-only">Loading dashboard...</span>
    </div>
  )
}

export default memo(DashboardSkeleton)
