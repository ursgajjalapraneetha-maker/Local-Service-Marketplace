import { memo } from 'react'

function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
      <div className="aspect-[16/10] bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse" />
      <div className="p-5 space-y-4">
        <div className="h-4 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-lg w-3/4" />
        <div className="h-3 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-lg w-full" />
        <div className="h-3 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-lg w-2/3" />
        <div className="flex gap-2">
          <div className="h-6 w-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-full" />
          <div className="h-3 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-lg w-24" />
        </div>
        <div className="flex gap-3">
          <div className="h-3 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-lg w-16" />
          <div className="h-3 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-lg w-16" />
          <div className="h-3 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-lg w-16" />
        </div>
        <div className="flex gap-2">
          <div className="h-5 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-full w-16" />
          <div className="h-5 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-full w-20" />
        </div>
        <div className="pt-4 border-t border-gray-50 space-y-3">
          <div className="h-7 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-lg w-24" />
          <div className="flex gap-2">
            <div className="h-10 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-xl flex-1" />
            <div className="h-10 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-xl flex-1" />
            <div className="h-10 w-10 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-xl" />
            <div className="h-10 w-10 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}

function LoadingGrid() {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      aria-label="Loading services"
      role="status"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
      <span className="sr-only">Loading services...</span>
    </div>
  )
}

export default memo(LoadingGrid)
