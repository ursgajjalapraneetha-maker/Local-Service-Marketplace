import { memo } from 'react'
import { motion } from 'framer-motion'

function SkeletonBlock({ className = '' }) {
  return (
    <div className={`animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700 ${className}`} />
  )
}

function SkeletonCard({ children }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
      {children}
    </div>
  )
}

function BookingDetailSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading booking details">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <SkeletonCard>
          <div className="flex items-start gap-4">
            <SkeletonBlock className="w-10 h-10" />
            <div className="flex-1 space-y-3">
              <SkeletonBlock className="h-6 w-64" />
              <SkeletonBlock className="h-4 w-48" />
              <div className="flex gap-4">
                <SkeletonBlock className="h-4 w-24" />
                <SkeletonBlock className="h-4 w-32" />
                <SkeletonBlock className="h-4 w-28" />
              </div>
            </div>
            <SkeletonBlock className="h-8 w-32 rounded-lg" />
          </div>
        </SkeletonCard>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <SkeletonCard>
              <SkeletonBlock className="h-5 w-36 mb-4" />
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gray-200 dark:bg-gray-700" />
                <div className="flex-1 space-y-2">
                  <SkeletonBlock className="h-5 w-48" />
                  <SkeletonBlock className="h-3 w-32" />
                  <SkeletonBlock className="h-4 w-full" />
                  <SkeletonBlock className="h-4 w-3/4" />
                </div>
              </div>
            </SkeletonCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <SkeletonCard>
              <SkeletonBlock className="h-5 w-32 mb-4" />
              <div className="space-y-4">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3">
                    <SkeletonBlock className="w-10 h-10 rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-1">
                      <SkeletonBlock className="h-4 w-40" />
                      <SkeletonBlock className="h-3 w-56" />
                    </div>
                  </div>
                ))}
              </div>
            </SkeletonCard>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <SkeletonCard>
              <SkeletonBlock className="h-5 w-36 mb-4" />
              <div className="flex items-center gap-3 mb-4">
                <SkeletonBlock className="w-12 h-12 rounded-full" />
                <div className="space-y-2">
                  <SkeletonBlock className="h-4 w-28" />
                  <SkeletonBlock className="h-3 w-20" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <SkeletonBlock className="h-10 rounded-xl" />
                <SkeletonBlock className="h-10 rounded-xl" />
              </div>
            </SkeletonCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <SkeletonCard>
              <SkeletonBlock className="h-5 w-32 mb-4" />
              <div className="space-y-2">
                <SkeletonBlock className="h-10 rounded-lg" />
                <SkeletonBlock className="h-10 rounded-lg" />
                <SkeletonBlock className="h-10 rounded-lg" />
              </div>
            </SkeletonCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <SkeletonCard>
              <SkeletonBlock className="h-5 w-28 mb-4" />
              <div className="space-y-2">
                <SkeletonBlock className="h-4 w-40" />
                <SkeletonBlock className="h-4 w-48" />
              </div>
            </SkeletonCard>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default memo(BookingDetailSkeleton)
