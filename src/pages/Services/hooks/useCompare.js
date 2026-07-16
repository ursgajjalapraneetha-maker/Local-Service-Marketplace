import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { KEYS, get, set } from '../services/localStorageService'

const MAX_COMPARE = 4

export default function useCompare() {
  const [items, setItems] = useState(() => get(KEYS.COMPARE, []))

  const toggle = useCallback((id) => {
    setItems((prev) => {
      if (prev.includes(id)) {
        const next = prev.filter((sid) => sid !== id)
        set(KEYS.COMPARE, next)
        toast.success('Removed from Compare')
        return next
      }
      if (prev.length >= MAX_COMPARE) {
        toast.error(`Maximum ${MAX_COMPARE} services can be compared`)
        return prev
      }
      const next = [...prev, id]
      set(KEYS.COMPARE, next)
      toast.success('Added to Compare')
      return next
    })
  }, [])

  const remove = useCallback((id) => {
    setItems((prev) => {
      const next = prev.filter((sid) => sid !== id)
      set(KEYS.COMPARE, next)
      return next
    })
  }, [])

  const clear = useCallback(() => {
    setItems([])
    set(KEYS.COMPARE, [])
  }, [])

  const exists = useCallback((id) => items.includes(id), [items])
  const count = items.length

  return { items, toggle, remove, clear, exists, count, MAX_COMPARE }
}
