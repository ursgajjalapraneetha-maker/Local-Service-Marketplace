import { useState, useMemo, useCallback } from 'react'

const SEARCH_FIELDS = ['title', 'category', 'provider', 'description']

function matchesSearchTerm(service, term) {
  if (!term) return true
  const lower = term.toLowerCase()
  return SEARCH_FIELDS.some((field) =>
    String(service[field]).toLowerCase().includes(lower)
  )
}

function matchesCategory(service, category) {
  if (!category) return true
  return service.category === category
}

function matchesLocation(service, location) {
  if (!location) return true
  return service.city === location
}

export default function useServiceSearch(services) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')

  const filteredServices = useMemo(() => {
    if (!services) return []
    return services.filter((service) => {
      const termMatch = matchesSearchTerm(service, searchTerm)
      const catMatch = matchesCategory(service, selectedCategory)
      const locMatch = matchesLocation(service, selectedLocation)
      return termMatch && catMatch && locMatch
    })
  }, [services, searchTerm, selectedCategory, selectedLocation])

  const hasActiveFilters = searchTerm || selectedCategory || selectedLocation

  const handleSearch = useCallback((e) => {
    e?.preventDefault()
  }, [])

  const handleClear = useCallback(() => {
    setSearchTerm('')
    setSelectedCategory('')
    setSelectedLocation('')
  }, [])

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedLocation,
    setSelectedLocation,
    filteredServices,
    hasActiveFilters,
    handleSearch,
    handleClear,
  }
}
