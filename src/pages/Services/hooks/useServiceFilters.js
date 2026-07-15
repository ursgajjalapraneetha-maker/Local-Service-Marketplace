import { useState, useMemo, useCallback } from 'react'

const RATING_OPTIONS = [4, 4.5, 5]
const EXPERIENCE_OPTIONS = ['1+', '3+', '5+', '10+']
const AVAILABILITY_OPTIONS = ['Today', 'Tomorrow', 'This Week', 'Weekend']
const PROVIDER_TYPE_OPTIONS = ['Verified', 'Top Rated', 'Instant Booking']
const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price_low', label: 'Lowest Price' },
  { value: 'price_high', label: 'Highest Price' },
  { value: 'newest', label: 'Newest' },
]

function toggleSet(set, value) {
  const next = new Set(set)
  if (next.has(value)) {
    next.delete(value)
  } else {
    next.add(value)
  }
  return next
}

function matchesExperience(expFilter, serviceYears) {
  if (!expFilter || expFilter.size === 0) return true
  for (const range of expFilter) {
    const min = parseInt(range)
    if (serviceYears >= min) return true
  }
  return false
}

function sortServices(services, option) {
  const sorted = [...services]
  switch (option) {
    case 'rating':
      sorted.sort((a, b) => b.rating - a.rating)
      break
    case 'price_low':
      sorted.sort((a, b) => a.price - b.price)
      break
    case 'price_high':
      sorted.sort((a, b) => b.price - a.price)
      break
    case 'popular':
      sorted.sort((a, b) => b.reviews - a.reviews)
      break
    default:
      break
  }
  return sorted
}

export default function useServiceFilters(services) {
  const [selectedCategories, setSelectedCategories] = useState(new Set())
  const [priceRange, setPriceRange] = useState([0, 20000])
  const [rating, setRating] = useState(0)
  const [experience, setExperience] = useState(new Set())
  const [availability, setAvailability] = useState(new Set())
  const [providerType, setProviderType] = useState(new Set())
  const [sortOption, setSortOption] = useState('')

  const filteredServices = useMemo(() => {
    if (!services) return []
    let result = services

    if (selectedCategories.size > 0) {
      result = result.filter((s) => selectedCategories.has(s.category))
    }

    result = result.filter((s) => s.price >= priceRange[0] && s.price <= priceRange[1])

    if (rating > 0) {
      result = result.filter((s) => s.rating >= rating)
    }

    if (experience.size > 0) {
      result = result.filter((s) => matchesExperience(experience, s.experience))
    }

    if (availability.size > 0) {
      result = result.filter((s) => availability.has(s.availability))
    }

    if (providerType.size > 0) {
      result = result.filter((s) =>
        s.providerType?.some((type) => providerType.has(type))
      )
    }

    if (sortOption) {
      result = sortServices(result, sortOption)
    }

    return result
  }, [services, selectedCategories, priceRange, rating, experience, availability, providerType, sortOption])

  const activeFilters = useMemo(() => {
    const filters = []

    selectedCategories.forEach((cat) => {
      filters.push({
        key: `cat-${cat}`,
        label: cat,
        type: 'category',
        onRemove: () => setSelectedCategories((prev) => toggleSet(prev, cat)),
      })
    })

    if (priceRange[0] > 0 || priceRange[1] < 20000) {
      filters.push({
        key: 'price',
        label: `₹${priceRange[0]} - ₹${priceRange[1]}`,
        type: 'price',
        onRemove: () => setPriceRange([0, 20000]),
      })
    }

    if (rating > 0) {
      filters.push({
        key: 'rating',
        label: `${rating}+ Stars`,
        type: 'rating',
        onRemove: () => setRating(0),
      })
    }

    experience.forEach((exp) => {
      filters.push({
        key: `exp-${exp}`,
        label: `${exp} Years`,
        type: 'experience',
        onRemove: () => setExperience((prev) => toggleSet(prev, exp)),
      })
    })

    availability.forEach((avail) => {
      filters.push({
        key: `avail-${avail}`,
        label: avail,
        type: 'availability',
        onRemove: () => setAvailability((prev) => toggleSet(prev, avail)),
      })
    })

    providerType.forEach((pt) => {
      filters.push({
        key: `pt-${pt}`,
        label: pt,
        type: 'providerType',
        onRemove: () => setProviderType((prev) => toggleSet(prev, pt)),
      })
    })

    return filters
  }, [selectedCategories, priceRange, rating, experience, availability, providerType])

  const hasActiveFilters = activeFilters.length > 0

  const setCategory = useCallback((cat) => {
    setSelectedCategories((prev) => toggleSet(prev, cat))
  }, [])

  const setPrice = useCallback((range) => {
    setPriceRange(range)
  }, [])

  const setRatingValue = useCallback((val) => {
    setRating((prev) => (prev === val ? 0 : val))
  }, [])

  const setExperienceValue = useCallback((val) => {
    setExperience((prev) => toggleSet(prev, val))
  }, [])

  const setAvailabilityValue = useCallback((val) => {
    setAvailability((prev) => toggleSet(prev, val))
  }, [])

  const setProviderTypeValue = useCallback((val) => {
    setProviderType((prev) => toggleSet(prev, val))
  }, [])

  const setSort = useCallback((option) => {
    setSortOption(option)
  }, [])

  const clearFilters = useCallback(() => {
    setSelectedCategories(new Set())
    setPriceRange([0, 20000])
    setRating(0)
    setExperience(new Set())
    setAvailability(new Set())
    setProviderType(new Set())
    setSortOption('')
  }, [])

  return {
    selectedCategories,
    priceRange,
    rating,
    experience,
    availability,
    providerType,
    sortOption,
    filteredServices,
    activeFilters,
    hasActiveFilters,
    setCategory,
    setPrice,
    setRating: setRatingValue,
    setExperience: setExperienceValue,
    setAvailability: setAvailabilityValue,
    setProviderType: setProviderTypeValue,
    setSort,
    clearFilters,
    RATING_OPTIONS,
    EXPERIENCE_OPTIONS,
    AVAILABILITY_OPTIONS,
    PROVIDER_TYPE_OPTIONS,
    SORT_OPTIONS,
  }
}
