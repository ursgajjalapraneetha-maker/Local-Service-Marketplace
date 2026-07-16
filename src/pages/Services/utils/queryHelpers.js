/**
 * Query parameter helpers for URL serialization and parsing.
 *
 * These mirror the future API contract so that switching to
 *   const res = await ServicesAPI.getServices({ page, limit, filters, search, sort })
 * requires zero UI changes.
 */

const PAGE_SIZE_KEY = 'ls_page_size'

/**
 * Serialises current filter/search/page state into a URL query string.
 * @param {{ search?: string, category?: string, location?: string, sort?: string, rating?: number, page?: number, view?: string }}
 * @returns {string}
 */
export function serializeFilters({
  search,
  category,
  location,
  sort,
  rating,
  page,
  view,
} = {}) {
  const params = new URLSearchParams()
  if (search) params.set('search', search)
  if (category) params.set('category', category)
  if (location) params.set('location', location)
  if (sort) params.set('sort', sort)
  if (rating && rating > 0) params.set('rating', String(rating))
  if (page && page > 1) params.set('page', String(page))
  if (view && view !== 'grid') params.set('view', view)
  return params.toString()
}

/**
 * Parses URLSearchParams into a plain filter object.
 * @param {URLSearchParams} searchParams
 * @returns {{ search: string, category: string, location: string, sort: string, rating: number, page: number, view: string }}
 */
export function parseFilters(searchParams) {
  return {
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    location: searchParams.get('location') || '',
    sort: searchParams.get('sort') || '',
    rating: searchParams.get('rating') ? parseFloat(searchParams.get('rating')) : 0,
    page: searchParams.get('page') ? parseInt(searchParams.get('page'), 10) : 1,
    view: searchParams.get('view') || 'grid',
  }
}

/**
 * Returns a new URLSearchParams with the given updates merged.
 * Null / empty values remove the key.
 * @param {URLSearchParams} searchParams
 * @param {Record<string, string|number|null|undefined>} updates
 * @returns {URLSearchParams}
 */
export function updateQuery(searchParams, updates) {
  const next = new URLSearchParams(searchParams)
  Object.entries(updates).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '' || value === false) {
      next.delete(key)
    } else {
      next.set(key, String(value))
    }
  })
  return next
}

/**
 * Reads persisted page size from localStorage or returns default.
 * @param {number} [defaultSize=12]
 * @returns {number}
 */
export function getPersistedPageSize(defaultSize = 12) {
  try {
    const saved = localStorage.getItem(PAGE_SIZE_KEY)
    const parsed = parseInt(saved, 10)
    if ([12, 18, 24, 36].includes(parsed)) return parsed
  } catch {}
  return defaultSize
}

/**
 * Persists page size to localStorage.
 * @param {number} size
 */
export function setPersistedPageSize(size) {
  try {
    localStorage.setItem(PAGE_SIZE_KEY, String(size))
  } catch {}
}
