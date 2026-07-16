import { useState, useEffect, useCallback } from 'react'
import { serviceService } from '../services/service.service'
import { useDataContext } from '../context/DataProvider'
import { REQUEST_STATE } from '../utils/requestState'

export default function useServices() {
  const [services, setServices] = useState([])
  const [state, setState] = useState(REQUEST_STATE.IDLE)
  const [error, setError] = useState(null)
  const { refreshKey } = useDataContext()

  const fetchServices = useCallback(async () => {
    setState(REQUEST_STATE.LOADING)
    setError(null)
    try {
      const data = await serviceService.getAll({ forceRefresh: false })
      setServices(data)
      setState(data.length === 0 ? REQUEST_STATE.EMPTY : REQUEST_STATE.SUCCESS)
    } catch (err) {
      setError(err)
      setState(REQUEST_STATE.ERROR)
    }
  }, [])

  useEffect(() => {
    fetchServices()
  }, [fetchServices, refreshKey])

  const refresh = useCallback(async () => {
    serviceService.invalidateCache()
    setState(REQUEST_STATE.LOADING)
    setError(null)
    try {
      const data = await serviceService.getAll({ forceRefresh: true })
      setServices(data)
      setState(data.length === 0 ? REQUEST_STATE.EMPTY : REQUEST_STATE.SUCCESS)
    } catch (err) {
      setError(err)
      setState(REQUEST_STATE.ERROR)
    }
  }, [])

  return {
    services,
    loading: state === REQUEST_STATE.LOADING,
    error,
    state,
    refresh,
  }
}
