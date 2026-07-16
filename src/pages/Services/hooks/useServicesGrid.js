import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const DURATION_MAP = {
  'Home Cleaning': '2-4 hours',
  Plumbing: '1-2 hours',
  Electrical: '1-3 hours',
  Painting: '4-8 hours',
  Moving: '6-12 hours',
  'Beauty & Spa': '1-2 hours',
}

const DISCOUNT_MAP = {
  1: 20,
  2: 0,
  3: 15,
  4: 0,
  5: 25,
  6: 10,
  7: 0,
  8: 30,
  9: 15,
  10: 20,
}

const AVATAR_BASE = 'https://ui-avatars.com/api/?background=2563EB&color=fff&bold=true&font-size=0.33&name='

function generateGallery(imageUrl) {
  if (!imageUrl) return []
  return [
    imageUrl,
    imageUrl.replace('w=400', 'w=800'),
    imageUrl.replace('w=400', 'w=600&fit=crop'),
    imageUrl.replace('w=400', 'w=400&q=75'),
  ]
}

function enrichService(service) {
  const discountPercent = DISCOUNT_MAP[service.id] || 0
  const hasDiscount = discountPercent > 0
  const oldPrice = hasDiscount
    ? Math.round(service.price / (1 - discountPercent / 100))
    : service.price

  const tags = []
  if (service.availability === 'Today' || service.availability === 'Tomorrow') {
    tags.push('Fast Response')
  }
  if (service.providerType?.includes('Instant Booking')) {
    tags.push('Instant Booking')
  }
  if (service.experience >= 5) {
    tags.push('Expert')
  }
  tags.push('Doorstep Service')

  return {
    ...service,
    slug: service.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, ''),
    oldPrice,
    discount: hasDiscount ? discountPercent : null,
    duration: DURATION_MAP[service.category] || '2-3 hours',
    tags,
    providerAvatar: `${AVATAR_BASE}${encodeURIComponent(service.provider)}`,
    completedJobs: Math.round(service.reviews * 1.8),
    distance: ((service.id * 7) % 15 + 1) + ' km away',
    gallery: generateGallery(service.image),
    isPopular: service.reviews > 1000,
    isBestOffer: (DISCOUNT_MAP[service.id] || 0) > 20,
    isNewProvider: service.experience < 2,
  }
}

export default function useServicesGrid(services) {
  const navigate = useNavigate()

  const [viewMode, setViewModeState] = useState(() => {
    try {
      return localStorage.getItem('ls_grid_view') || 'grid'
    } catch {
      return 'grid'
    }
  })

  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ls_wishlist') || '[]')
    } catch {
      return []
    }
  })

  const enrichedServices = useMemo(() => {
    if (!services || services.length === 0) return []
    return services.map(enrichService)
  }, [services])

  const setViewMode = useCallback((mode) => {
    setViewModeState(mode)
    try {
      localStorage.setItem('ls_grid_view', mode)
    } catch {}
  }, [])

  const toggleWishlist = useCallback((id) => {
    setWishlist((prev) => {
      const next = prev.includes(id)
        ? prev.filter((sid) => sid !== id)
        : [...prev, id]
      try {
        localStorage.setItem('ls_wishlist', JSON.stringify(next))
      } catch {}
      return next
    })
  }, [])

  const isWishlisted = useCallback((id) => wishlist.includes(id), [wishlist])

  const handleBookNow = useCallback(
    (slug) => {
      navigate(`/service/${slug}`)
    },
    [navigate]
  )

  const handleViewDetails = useCallback(
    (slug) => {
      navigate(`/service/${slug}`)
    },
    [navigate]
  )

  const handleShare = useCallback(
    async (service) => {
      const url = `${window.location.origin}/service/${service.slug}`
      if (navigator.share) {
        try {
          await navigator.share({
            title: service.title,
            text: service.description,
            url,
          })
        } catch {}
      } else {
        try {
          await navigator.clipboard.writeText(url)
          toast.success('Link copied to clipboard!')
        } catch {
          toast.error('Failed to copy link')
        }
      }
    },
    []
  )

  return {
    viewMode,
    setViewMode,
    wishlist,
    toggleWishlist,
    isWishlisted,
    enrichedServices,
    handleBookNow,
    handleViewDetails,
    handleShare,
  }
}
