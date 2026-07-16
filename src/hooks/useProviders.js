import { useState, useEffect, useCallback } from 'react'
import { providerService } from '../services/provider.service'
import { useDataContext } from '../context/DataProvider'
import { REQUEST_STATE } from '../utils/requestState'

export default function useProviders() {
  const [providers, setProviders] = useState([])
  const [state, setState] = useState(REQUEST_STATE.IDLE)
  const [error, setError] = useState(null)
  const { refreshKey } = useDataContext()

  const fetchProviders = useCallback(async () => {
    setState(REQUEST_STATE.LOADING)
    setError(null)
    try {
      const data = await providerService.getAll()
      setProviders(data)
      setState(data.length === 0 ? REQUEST_STATE.EMPTY : REQUEST_STATE.SUCCESS)
    } catch (err) {
      setError(err)
      setState(REQUEST_STATE.ERROR)
    }
  }, [])

  useEffect(() => {
    fetchProviders()
  }, [fetchProviders, refreshKey])

  const refresh = useCallback(async () => {
    providerService.invalidateCache()
    const data = await providerService.getAll({ forceRefresh: true })
    setProviders(data)
  }, [])

  return {
    providers,
    loading: state === REQUEST_STATE.LOADING,
    error,
    state,
    refresh,
  }
}
