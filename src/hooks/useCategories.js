import { useState, useEffect, useCallback } from 'react'
import { categoryService } from '../services/category.service'
import { useDataContext } from '../context/DataProvider'
import { REQUEST_STATE } from '../utils/requestState'

export default function useCategories() {
  const [categories, setCategories] = useState([])
  const [locations, setLocations] = useState([])
  const [state, setState] = useState(REQUEST_STATE.IDLE)
  const [error, setError] = useState(null)
  const { refreshKey } = useDataContext()

  const fetchData = useCallback(async () => {
    setState(REQUEST_STATE.LOADING)
    setError(null)
    try {
      const [cats, locs] = await Promise.all([
        categoryService.getAll(),
        categoryService.getLocations(),
      ])
      setCategories(cats)
      setLocations(locs)
      setState(cats.length === 0 ? REQUEST_STATE.EMPTY : REQUEST_STATE.SUCCESS)
    } catch (err) {
      setError(err)
      setState(REQUEST_STATE.ERROR)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData, refreshKey])

  const refresh = useCallback(async () => {
    categoryService.invalidateCache()
    const [cats, locs] = await Promise.all([
      categoryService.getAll({ forceRefresh: true }),
      categoryService.getLocations(),
    ])
    setCategories(cats)
    setLocations(locs)
  }, [])

  return {
    categories,
    locations,
    loading: state === REQUEST_STATE.LOADING,
    error,
    state,
    refresh,
  }
}
