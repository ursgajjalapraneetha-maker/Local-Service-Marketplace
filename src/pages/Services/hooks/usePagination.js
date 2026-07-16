import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { paginate } from '../utils/pagination'
import { getPersistedPageSize, setPersistedPageSize } from '../utils/queryHelpers'

const PAGE_SIZES = [12, 18, 24, 36]

/**
 * Manages pagination state for a services array.
 *
 * Automatically resets to page 1 when the services reference changes (search/filter applied).
 * Persists page size preference in localStorage.
 *
 * Future backend replacement:
 *   const response = await ServicesAPI.getServices({ page, limit, filters, search, sort })
 *   // response shape: { services, page, limit, totalPages, totalServices, hasNextPage, hasPreviousPage }
 *
 * @param {Array} services - The full filtered services array
 * @param {Object} [options]
 * @param {number} [options.pageSize=12]
 * @returns {{
 *   currentPage: number,
 *   pageSize: number,
 *   totalPages: number,
 *   totalServices: number,
 *   paginatedServices: Array,
 *   nextPage: () => void,
 *   previousPage: () => void,
 *   goToPage: (page: number) => void,
 *   changePageSize: (size: number) => void,
 *   hasNextPage: boolean,
 *   hasPreviousPage: boolean,
 *   startIndex: number,
 *   endIndex: number,
 *   PAGE_SIZES: number[],
 * }}
 */
export default function usePagination(services, options = {}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSizeState] = useState(
    () => options.pageSize || getPersistedPageSize()
  )

  const totalServices = services?.length || 0
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalServices / pageSize)),
    [totalServices, pageSize]
  )

  // Reset to page 1 when the filtered services set changes
  const prevKey = useRef()
  useEffect(() => {
    const key = totalServices
    if (prevKey.current !== undefined && prevKey.current !== key) {
      setCurrentPage(1)
    }
    prevKey.current = key
  }, [totalServices])

  // Clamp current page when total pages shrinks
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const paginatedResult = useMemo(
    () => paginate(services, currentPage, pageSize),
    [services, currentPage, pageSize]
  )

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }, [totalPages])

  const previousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }, [])

  const goToPage = useCallback(
    (page) => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    },
    [totalPages]
  )

  const changePageSize = useCallback((size) => {
    setPageSizeState(size)
    setCurrentPage(1)
    setPersistedPageSize(size)
  }, [])

  const startIndex = totalServices === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const endIndex = Math.min(currentPage * pageSize, totalServices)

  return {
    currentPage,
    pageSize,
    totalPages,
    totalServices,
    paginatedServices: paginatedResult.services,
    nextPage,
    previousPage,
    goToPage,
    changePageSize,
    hasNextPage: paginatedResult.hasNextPage,
    hasPreviousPage: paginatedResult.hasPreviousPage,
    startIndex,
    endIndex,
    PAGE_SIZES,
  }
}
