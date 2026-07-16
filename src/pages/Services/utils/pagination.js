/**
 * Pagination utilities for client-side service slicing and page number generation.
 *
 * Future backend replacement:
 *   const response = await ServicesAPI.getServices({ page, limit, filters, search, sort })
 *   Returns: { services, page, limit, totalPages, totalServices, hasNextPage, hasPreviousPage }
 */

/**
 * Slices a services array for a given page and limit.
 * @param {Array} services
 * @param {number} page - 1-indexed
 * @param {number} limit - items per page
 * @returns {{ services: Array, page: number, limit: number, totalPages: number, totalServices: number, hasNextPage: boolean, hasPreviousPage: boolean }}
 */
export function paginate(services, page, limit) {
  if (!services) {
    return {
      services: [],
      page,
      limit,
      totalPages: 0,
      totalServices: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    }
  }

  const totalServices = services.length
  const totalPages = Math.max(1, Math.ceil(totalServices / limit))
  const safePage = Math.max(1, Math.min(page, totalPages))
  const start = (safePage - 1) * limit
  const sliced = services.slice(start, start + limit)

  return {
    services: sliced,
    page: safePage,
    limit,
    totalPages,
    totalServices,
    hasNextPage: safePage < totalPages,
    hasPreviousPage: safePage > 1,
  }
}

/**
 * Generates an array of page numbers 1..totalPages.
 * @param {number} totalPages
 * @returns {number[]}
 */
export function calculatePages(totalPages) {
  return Array.from({ length: totalPages }, (_, i) => i + 1)
}

/**
 * Returns a compact page number array with ellipsis markers for large page counts.
 * Always shows first and last page. Shows sibling pages around current.
 * @param {number} currentPage
 * @param {number} totalPages
 * @returns {Array<number|string>}
 */
export function getVisiblePages(currentPage, totalPages) {
  if (totalPages <= 7) {
    return calculatePages(totalPages)
  }

  const pages = []
  const siblings = 1

  pages.push(1)

  const start = Math.max(2, currentPage - siblings)
  const end = Math.min(totalPages - 1, currentPage + siblings)

  if (start > 2) {
    pages.push('...')
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (end < totalPages - 1) {
    pages.push('...')
  }

  pages.push(totalPages)

  return pages
}
