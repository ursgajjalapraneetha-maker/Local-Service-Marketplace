import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { parseFilters } from '../utils/queryHelpers'

/**
 * Syncs search, filter, sort, pagination, and view state with URL query parameters.
 *
 * On mount: reads URL and restores all state (browser back/forward support).
 * On state change: updates URL with replace semantics (debounced for search).
 *
 * @param {Object} deps
 * @param {Object} deps.searchState     - Return value of useServiceSearch
 * @param {Object} deps.filterState     - Return value of useServiceFilters
 * @param {Object} deps.gridState       - Return value of useServicesGrid
 * @param {Object} deps.paginationState - Return value of usePagination
 */
export default function useQueryParams({
  searchState,
  filterState,
  gridState,
  paginationState,
}) {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialised = useRef(false)

  // Debounced search term for URL updates (300ms)
  const [debouncedSearch, setDebouncedSearch] = useState(searchState.searchTerm)
  const debounceTimer = useRef(null)

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    debounceTimer.current = setTimeout(() => {
      setDebouncedSearch(searchState.searchTerm)
    }, 300)
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
  }, [searchState.searchTerm])

  // ─── READ URL → RESTORE STATE (single execution on mount) ───
  useEffect(() => {
    const urlParams = parseFilters(searchParams)
    let changed = false

    if (urlParams.search && urlParams.search !== searchState.searchTerm) {
      searchState.setSearchTerm(urlParams.search)
      changed = true
    }
    if (urlParams.category && urlParams.category !== searchState.selectedCategory) {
      searchState.setSelectedCategory(urlParams.category)
      changed = true
    }
    if (urlParams.location && urlParams.location !== searchState.selectedLocation) {
      searchState.setSelectedLocation(urlParams.location)
      changed = true
    }
    if (urlParams.sort && urlParams.sort !== filterState.sortOption) {
      filterState.setSort(urlParams.sort)
      changed = true
    }
    if (urlParams.rating > 0 && urlParams.rating !== filterState.rating) {
      filterState.setRating(urlParams.rating)
      changed = true
    }
    if (urlParams.view && urlParams.view !== gridState.viewMode) {
      gridState.setViewMode(urlParams.view)
      changed = true
    }
    if (urlParams.page > 1 && urlParams.page !== paginationState.currentPage) {
      paginationState.goToPage(urlParams.page)
      changed = true
    }

    // Fire initialised after a microtask so that the first render uses defaults,
    // then the URL params restore without a visible flash.
    requestAnimationFrame(() => {
      initialised.current = true
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ─── STATE CHANGE → WRITE URL ───
  useEffect(() => {
    if (!initialised.current) return

    const params = {}

    if (debouncedSearch) params.search = debouncedSearch
    if (searchState.selectedCategory) params.category = searchState.selectedCategory
    if (searchState.selectedLocation) params.location = searchState.selectedLocation
    if (filterState.sortOption) params.sort = filterState.sortOption
    if (filterState.rating > 0) params.rating = String(filterState.rating)
    if (paginationState.currentPage > 1) params.page = String(paginationState.currentPage)
    if (gridState.viewMode !== 'grid') params.view = gridState.viewMode

    setSearchParams(params, { replace: true })
  }, [
    debouncedSearch,
    searchState.selectedCategory,
    searchState.selectedLocation,
    filterState.sortOption,
    filterState.rating,
    paginationState.currentPage,
    gridState.viewMode,
    setSearchParams,
  ])
}
