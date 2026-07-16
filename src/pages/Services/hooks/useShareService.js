import { useCallback } from 'react'
import toast from 'react-hot-toast'

export default function useShareService() {
  const share = useCallback(async (service) => {
    if (!service) return
    const url = `${window.location.origin}/service/${service.slug}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: service.title,
          text: service.description,
          url,
        })
        toast.success('Shared successfully')
      } catch {
        // User cancelled share dialog
      }
    } else {
      try {
        await navigator.clipboard.writeText(url)
        toast.success('Link copied to clipboard!')
      } catch {
        toast.error('Failed to copy link')
      }
    }
  }, [])

  return { share }
}
