import { memo } from 'react'

function SkeletonBlock({ className }) {
  return (
    <div
      className={`bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-lg ${className}`}
      aria-hidden="true"
    />
  )
}

function ProfileSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading profile">
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center gap-4">
          <SkeletonBlock className="w-20 h-20 rounded-full" />
          <div className="space-y-2">
            <SkeletonBlock className="w-40 h-5" />
            <SkeletonBlock className="w-56 h-3" />
            <SkeletonBlock className="w-24 h-3" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <SkeletonBlock className="w-32 h-5" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-1">
              <SkeletonBlock className="w-20 h-3" />
              <SkeletonBlock className="w-full h-4" />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <SkeletonBlock className="w-36 h-5" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="space-y-1">
              <SkeletonBlock className="w-32 h-4" />
              <SkeletonBlock className="w-48 h-3" />
            </div>
            <SkeletonBlock className="w-12 h-6 rounded-full" />
          </div>
        ))}
      </div>

      <span className="sr-only">Loading profile...</span>
    </div>
  )
}

export default memo(ProfileSkeleton)
