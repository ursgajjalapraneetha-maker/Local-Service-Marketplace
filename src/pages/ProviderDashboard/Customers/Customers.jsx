import { useState, useEffect, useMemo, useCallback } from 'react'
import { providerCustomers, customerStatsData } from '../data/customersData'
import PageContainer from '../components/PageContainer'
import CustomerStats from './components/CustomerStats'
import CustomerCard from './components/CustomerCard'
import CustomerTable from './components/CustomerTable'
import CustomerFilters from './components/CustomerFilters'
import EmptyCustomers from './components/EmptyCustomers'

const DEFAULT_FILTERS = { search: '', sort: 'name', status: 'all' }

export default function Customers() {
  const [loading, setLoading] = useState(true)
  const [customers, setCustomers] = useState([])
  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  useEffect(() => {
    const timer = setTimeout(() => {
      setCustomers(providerCustomers)
      setLoading(false)
    }, 400)
    return () => clearTimeout(timer)
  }, [])

  const filteredCustomers = useMemo(() => {
    let result = [...customers]

    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.phone.includes(q) ||
          c.location.toLowerCase().includes(q)
      )
    }

    if (filters.status !== 'all') {
      result = result.filter((c) => c.status === filters.status)
    }

    switch (filters.sort) {
      case 'newest':
        result.sort((a, b) => new Date(b.customerSince) - new Date(a.customerSince))
        break
      case 'bookings':
        result.sort((a, b) => b.totalBookings - a.totalBookings)
        break
      case 'spent':
        result.sort((a, b) => b.totalSpent - a.totalSpent)
        break
      default:
        result.sort((a, b) => a.name.localeCompare(b.name))
    }

    return result
  }, [customers, filters])

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters)
  }, [])

  if (loading) {
    return (
      <PageContainer title="My Customers" subtitle="Manage your customer relationships and service history.">
        <div className="space-y-4" role="status" aria-label="Loading customers">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 space-y-3">
                <div className="h-10 w-10 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-lg" aria-hidden="true" />
                <div className="h-8 w-16 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded" aria-hidden="true" />
                <div className="h-3 w-20 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded" aria-hidden="true" />
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="h-10 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-lg w-full max-w-xs mb-3" aria-hidden="true" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-14 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded mb-2" aria-hidden="true" />
            ))}
          </div>
          <span className="sr-only">Loading customers...</span>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title="My Customers"
      subtitle="Manage your customer relationships and service history."
    >
      <div className="space-y-6">
        <CustomerStats stats={customerStatsData} />
        <CustomerFilters filters={filters} onFilterChange={handleFilterChange} />

        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="font-semibold text-secondary">{filteredCustomers.length}</span>
          customer{filteredCustomers.length !== 1 ? 's' : ''} found
        </div>

        {filteredCustomers.length === 0 ? (
          <EmptyCustomers hasFilters={filters.search || filters.status !== 'all'} />
        ) : (
          <>
            <div className="hidden sm:block">
              <CustomerTable customers={filteredCustomers} />
            </div>
            <div className="sm:hidden space-y-3">
              {filteredCustomers.map((customer, i) => (
                <CustomerCard key={customer.id} customer={customer} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </PageContainer>
  )
}
