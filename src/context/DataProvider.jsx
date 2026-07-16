import { createContext, useContext, useCallback, useState } from 'react'
import { DATA_SOURCE } from '../config/repository.config'

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [refreshKey, setRefreshKey] = useState(0)

  const refreshAll = useCallback(() => {
    setRefreshKey((k) => k + 1)
  }, [])

  return (
    <DataContext.Provider
      value={{ dataSource: DATA_SOURCE, refreshAll, refreshKey }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useDataContext() {
  const ctx = useContext(DataContext)
  if (!ctx) {
    throw new Error('useDataContext must be used within <DataProvider>')
  }
  return ctx
}
