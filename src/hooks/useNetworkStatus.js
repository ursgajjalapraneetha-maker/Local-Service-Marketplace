import { useState, useEffect, useCallback } from 'react'

export default function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(() => {
    if (typeof navigator === 'undefined') return true
    return navigator.onLine
  })

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const checkConnection = useCallback(async () => {
    try {
      const response = await fetch('/favicon.ico', { method: 'HEAD', cache: 'no-cache' })
      setIsOnline(response.ok)
    } catch {
      setIsOnline(false)
    }
  }, [])

  return isOnline
}
