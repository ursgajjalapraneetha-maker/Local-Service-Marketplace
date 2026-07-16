import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { KEYS, get, set } from '../services/localStorageService'

export default function useWishlist() {
  const [items, setItems] = useState(() => get(KEYS.WISHLIST, []))

  const add = useCallback((id) => {
    setItems((prev) => {
      if (prev.includes(id)) return prev
      const next = [...prev, id]
      set(KEYS.WISHLIST, next)
      toast.success('Added to Wishlist', { icon: '♡' })
      return next
    })
  }, [])

  const remove = useCallback((id) => {
    setItems((prev) => {
      const next = prev.filter((sid) => sid !== id)
      set(KEYS.WISHLIST, next)
      toast.success('Removed from Wishlist', { icon: '♡' })
      return next
    })
  }, [])

  const toggle = useCallback(
    (id) => {
      if (items.includes(id)) {
        remove(id)
      } else {
        add(id)
      }
    },
    [items, add, remove]
  )

  const exists = useCallback((id) => items.includes(id), [items])

  const clear = useCallback(() => {
    setItems([])
    set(KEYS.WISHLIST, [])
  }, [])

  return { items, add, remove, toggle, exists, clear }
}
