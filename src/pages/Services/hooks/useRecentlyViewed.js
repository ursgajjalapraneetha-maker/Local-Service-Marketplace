import { useState, useCallback } from 'react'
import { KEYS, get, set } from '../services/localStorageService'

const MAX_RECENT = 10

export default function useRecentlyViewed() {
  const [items, setItems] = useState(() => get(KEYS.RECENTLY_VIEWED, []))

  const add = useCallback((service) => {
    if (!service || !service.id) return
    setItems((prev) => {
      const filtered = prev.filter((s) => s.id !== service.id)
      const next = [service, ...filtered].slice(0, MAX_RECENT)
      set(KEYS.RECENTLY_VIEWED, next)
      return next
    })
  }, [])

  const remove = useCallback((id) => {
    setItems((prev) => {
      const next = prev.filter((s) => s.id !== id)
      set(KEYS.RECENTLY_VIEWED, next)
      return next
    })
  }, [])

  const clear = useCallback(() => {
    setItems([])
    set(KEYS.RECENTLY_VIEWED, [])
  }, [])

  return { items, add, remove, clear }
}
