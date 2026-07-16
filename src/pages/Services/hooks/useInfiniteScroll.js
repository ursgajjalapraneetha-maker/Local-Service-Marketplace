import { useRef, useEffect, useState, useCallback } from 'react'

/**
 * IntersectionObserver-based infinite scroll hook.
 *
 * Calls onLoadMore when the sentinel element becomes visible.
 * Uses a loading guard to prevent duplicate requests.
 * Automatically disconnects when hasMore is false or infinite scroll is disabled.
 *
 * @param {Object} params
 * @param {boolean} params.hasMore - Whether more pages are available
 * @param {() => void} params.onLoadMore - Callback to load the next page
 * @param {boolean} params.enabled - Whether infinite scroll is active
 * @returns {{ sentinelRef: React.RefObject, isFetching: boolean }}
 */
export default function useInfiniteScroll({ hasMore, onLoadMore, enabled }) {
  const sentinelRef = useRef(null)
  const [isFetching, setIsFetching] = useState(false)
  const loadingGuard = useRef(false)

  const stableLoadMore = useCallback(() => {
    if (loadingGuard.current) return
    loadingGuard.current = true
    setIsFetching(true)

    // Simulate network delay for future backend compatibility
    setTimeout(() => {
      onLoadMore()
      loadingGuard.current = false
      setIsFetching(false)
    }, 350)
  }, [onLoadMore])

  useEffect(() => {
    if (!enabled || !hasMore || isFetching) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loadingGuard.current) {
          stableLoadMore()
        }
      },
      { rootMargin: '150px' }
    )

    const el = sentinelRef.current
    if (el) observer.observe(el)

    return () => observer.disconnect()
  }, [enabled, hasMore, isFetching, stableLoadMore])

  // Reset guard when deps change
  useEffect(() => {
    if (!enabled || !hasMore) {
      loadingGuard.current = false
      setIsFetching(false)
    }
  }, [enabled, hasMore])

  return { sentinelRef, isFetching }
}
