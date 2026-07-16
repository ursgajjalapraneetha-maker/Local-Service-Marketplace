import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import WishlistHeader from './components/WishlistHeader'
import WishlistSummary from './components/WishlistSummary'
import WishlistToolbar from './components/WishlistToolbar'
import WishlistGrid from './components/WishlistGrid'
import RecentlyViewed from './components/RecentlyViewed'
import WishlistSkeleton from './components/WishlistSkeleton'
import WISHLIST_DATA, { RECENTLY_VIEWED_DATA } from './components/wishlistData'

const LS_WISHLIST_KEY = 'local_marketplace_wishlist'
const LS_RECENTLY_KEY = 'local_marketplace_recently_viewed'

function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {}
  return fallback
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch {}
}

function getWishlistIds(items) {
  return items.map((item) => item.id)
}

function computeSummary(items) {
  const total = items.length
  const available = items.filter((item) => item.availability === 'Today' || item.availability === 'Tomorrow').length
  const discounted = items.filter((item) => item.discount > 0).length
  const avgRating = total > 0
    ? (items.reduce((sum, item) => sum + item.rating, 0) / total).toFixed(1)
    : '0.0'
  return { total, available, discounted, avgRating }
}

export default function Wishlist() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [availabilityFilter, setAvailabilityFilter] = useState('')
  const [priceFilter, setPriceFilter] = useState('')
  const [sortValue, setSortValue] = useState('newest')
  const [wishlist, setWishlist] = useState([])
  const [recentlyViewed, setRecentlyViewed] = useState([])
  const initialized = useRef(false)

  useEffect(() => {
    const wishlistData = loadFromStorage(LS_WISHLIST_KEY, WISHLIST_DATA)
    const recentData = loadFromStorage(LS_RECENTLY_KEY, RECENTLY_VIEWED_DATA)
    setWishlist(wishlistData)
    setRecentlyViewed(recentData)
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (initialized.current) {
      saveToStorage(LS_WISHLIST_KEY, wishlist)
    }
  }, [wishlist])

  useEffect(() => {
    if (initialized.current) {
      saveToStorage(LS_RECENTLY_KEY, recentlyViewed)
    }
  }, [recentlyViewed])

  useEffect(() => {
    initialized.current = true
  }, [])

  const filteredWishlist = useMemo(() => {
    let result = [...wishlist]

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (item) =>
          item.serviceName.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.provider.toLowerCase().includes(q)
      )
    }

    if (categoryFilter) {
      result = result.filter((item) => item.category === categoryFilter)
    }

    if (availabilityFilter) {
      result = result.filter((item) => item.availability === availabilityFilter)
    }

    if (priceFilter) {
      result = result.filter((item) => {
        switch (priceFilter) {
          case 'under500': return item.price < 500
          case '500to2000': return item.price >= 500 && item.price <= 2000
          case '2000to5000': return item.price > 2000 && item.price <= 5000
          case 'above5000': return item.price > 5000
          default: return true
        }
      })
    }

    result.sort((a, b) => {
      switch (sortValue) {
        case 'oldest': return new Date(a.createdAt) - new Date(b.createdAt)
        case 'rating': return b.rating - a.rating
        case 'price_low': return a.price - b.price
        case 'price_high': return b.price - a.price
        case 'popular': return b.reviews - a.reviews
        default: return new Date(b.createdAt) - new Date(a.createdAt)
      }
    })

    return result
  }, [wishlist, searchQuery, categoryFilter, availabilityFilter, priceFilter, sortValue])

  const summary = useMemo(() => computeSummary(filteredWishlist), [filteredWishlist])

  const handleRemove = useCallback((itemId) => {
    setWishlist((prev) => {
      const item = prev.find((i) => i.id === itemId)
      if (item) toast.success(`Removed "${item.serviceName}" from wishlist`)
      return prev.filter((i) => i.id !== itemId)
    })
  }, [])

  const handleBook = useCallback((item) => {
    navigate(`/services/${item.id}`)
  }, [navigate])

  const handleAddWishlist = useCallback((item) => {
    setWishlist((prev) => {
      if (prev.some((i) => i.id === item.id)) {
        toast.error(`${item.serviceName} is already in your wishlist`)
        return prev
      }
      toast.success(`Added "${item.serviceName}" to wishlist`)
      return [{ ...item, createdAt: new Date().toISOString() }, ...prev]
    })
  }, [])

  const handleRemoveRecent = useCallback((itemId) => {
    setRecentlyViewed((prev) => prev.filter((i) => i.id !== itemId))
  }, [])

  const handleClearRecent = useCallback(() => {
    setRecentlyViewed([])
    toast.success('Recently viewed cleared')
  }, [])

  const handleResetFilters = useCallback(() => {
    setSearchQuery('')
    setCategoryFilter('')
    setAvailabilityFilter('')
    setPriceFilter('')
    setSortValue('newest')
  }, [])

  const wishlistIds = useMemo(() => getWishlistIds(wishlist), [wishlist])

  if (loading) return <WishlistSkeleton />

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <WishlistHeader />

      <WishlistSummary summary={summary} />

      <WishlistToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categoryFilter={categoryFilter}
        availabilityFilter={availabilityFilter}
        priceFilter={priceFilter}
        onCategoryChange={setCategoryFilter}
        onAvailabilityChange={setAvailabilityFilter}
        onPriceChange={setPriceFilter}
        onResetFilters={handleResetFilters}
        sortValue={sortValue}
        onSortChange={setSortValue}
        resultsCount={filteredWishlist.length}
      />

      <WishlistGrid
        wishlist={filteredWishlist}
        onRemove={handleRemove}
        onBook={handleBook}
      />

      <RecentlyViewed
        items={recentlyViewed}
        onRemove={handleRemoveRecent}
        onAddWishlist={handleAddWishlist}
        onClear={handleClearRecent}
        wishlistIds={wishlistIds}
      />
    </motion.div>
  )
}
