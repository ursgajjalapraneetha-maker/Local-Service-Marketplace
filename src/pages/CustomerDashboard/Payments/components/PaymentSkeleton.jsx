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
      <SkeletonBlock className="w-9 h-9" />
      <SkeletonBlock className="w-16 h-7" />
      <SkeletonBlock className="w-24 h-3" />
    </div>
  )
}

function RowSkeleton() {
  return (
    <tr className="border-b border-gray-50">
      {Array.from({ length: 8 }).map((_, i) => (
        <td key={i} className="px-3 py-3">
          <SkeletonBlock className="h-3 w-full" />
        </td>
      ))}
    </tr>
  )
}

function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <SkeletonBlock className="w-24 h-4" />
        <SkeletonBlock className="w-20 h-5 rounded-full" />
      </div>
      <SkeletonBlock className="w-48 h-4" />
      <SkeletonBlock className="w-32 h-3" />
      <div className="flex items-center justify-between pt-1">
        <SkeletonBlock className="w-16 h-4" />
        <SkeletonBlock className="w-20 h-7 rounded-lg" />
      </div>
    </div>
  )
}

function PaymentSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading payments">
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

      <div className="hidden sm:block bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              {Array.from({ length: 8 }).map((_, i) => (
                <th key={i} className="px-3 py-3">
                  <SkeletonBlock className="h-3 w-16" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <RowSkeleton key={i} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>

      <span className="sr-only">Loading payments...</span>
    </div>
  )
}

export default memo(PaymentSkeleton)
