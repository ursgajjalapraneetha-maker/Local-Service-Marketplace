import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Plus, LayoutGrid, List, Wrench } from 'lucide-react'
import toast from 'react-hot-toast'
import { providerServices } from '../data/servicesData'
import PageContainer from '../components/PageContainer'
import ServiceCard from './components/ServiceCard'
import ServiceTable from './components/ServiceTable'
import ServiceFilters from './components/ServiceFilters'
import EmptyServices from './components/EmptyServices'
import { cn } from '../../../utils'

const DEFAULT_FILTERS = { search: '', category: 'all', status: 'all' }

function DeleteConfirmModal({ service, onConfirm, onCancel, loading }) {
  if (!service) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Delete confirmation">
      <div className="fixed inset-0 bg-black/40" onClick={onCancel} aria-hidden="true" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm"
      >
        <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
          <Wrench size={24} className="text-danger" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-secondary text-center mb-1">
          Delete Service
        </h3>
        <p className="text-sm text-gray-500 text-center mb-6">
          Are you sure you want to delete <span className="font-semibold text-secondary">{service.name}</span>? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(service)}
            disabled={loading}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-danger rounded-xl hover:bg-red-600 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/30 disabled:opacity-50 inline-flex items-center justify-center gap-2"
          >
            {loading && (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default function Services() {
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState([])
  const [viewMode, setViewMode] = useState('card')
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setServices(providerServices)
      setLoading(false)
    }, 400)
    return () => clearTimeout(timer)
  }, [])

  const filteredServices = useMemo(() => {
    let result = [...services]
    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter(
        (s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      )
    }
    if (filters.category !== 'all') {
      result = result.filter((s) => s.category === filters.category)
    }
    if (filters.status !== 'all') {
      result = result.filter((s) => s.status === filters.status)
    }
    return result
  }, [services, filters])

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters)
  }, [])

  const handleToggleStatus = useCallback((id) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const newStatus = s.status === 'active' ? 'inactive' : 'active'
          toast.success(`${s.name} ${newStatus === 'active' ? 'activated' : 'deactivated'}`)
          return { ...s, status: newStatus }
        }
        return s
      })
    )
  }, [])

  const handleDeleteRequest = useCallback((service) => {
    setDeleteTarget(service)
  }, [])

  const handleDeleteConfirm = useCallback((service) => {
    setDeleteLoading(true)
    setTimeout(() => {
      setServices((prev) => prev.filter((s) => s.id !== service.id))
      setDeleteLoading(false)
      setDeleteTarget(null)
      toast.success(`"${service.name}" deleted successfully`)
    }, 600)
  }, [])

  const handleDeleteCancel = useCallback(() => {
    setDeleteTarget(null)
  }, [])

  const activeCount = useMemo(() => services.filter((s) => s.status === 'active').length, [services])

  if (loading) {
    return (
      <PageContainer title="My Services" subtitle="Manage your marketplace services, pricing and availability.">
        <div className="space-y-4" role="status" aria-label="Loading services">
          <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
            <div className="h-9 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-lg w-full max-w-xs" aria-hidden="true" />
            <div className="flex gap-2">
              <div className="h-8 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-lg w-32" aria-hidden="true" />
              <div className="h-8 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-lg w-24" aria-hidden="true" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="h-40 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse" aria-hidden="true" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded w-3/4" aria-hidden="true" />
                  <div className="h-3 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded w-1/2" aria-hidden="true" />
                  <div className="h-8 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
          <span className="sr-only">Loading services...</span>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title="My Services"
      subtitle="Manage your marketplace services, pricing and availability."
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <ServiceFilters filters={filters} onFilterChange={handleFilterChange} />
          </div>
          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <div className="flex bg-gray-50 rounded-lg p-0.5" role="group" aria-label="View mode">
              <button
                onClick={() => setViewMode('card')}
                className={cn(
                  'p-2 rounded-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
                  viewMode === 'card' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-secondary'
                )}
                aria-label="Card view"
                aria-pressed={viewMode === 'card'}
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={cn(
                  'p-2 rounded-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
                  viewMode === 'table' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-secondary'
                )}
                aria-label="Table view"
                aria-pressed={viewMode === 'table'}
              >
                <List size={16} />
              </button>
            </div>
            <button
              onClick={() => navigate('/provider-dashboard/services/add')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all active:scale-[0.97] shadow-lg shadow-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            >
              <Plus size={16} />
              Add Service
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="font-semibold text-secondary">{filteredServices.length}</span> service{filteredServices.length !== 1 ? 's' : ''} found
          {services.length > 0 && (
            <>
              <span className="text-gray-200">|</span>
              <span className="text-green-600 font-medium">{activeCount} active</span>
            </>
          )}
        </div>

        {filteredServices.length === 0 ? (
          <EmptyServices hasFilters={filters.search || filters.category !== 'all' || filters.status !== 'all'} />
        ) : viewMode === 'card' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map((service, i) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={i}
                onDelete={handleDeleteRequest}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        ) : (
          <ServiceTable
            services={filteredServices}
            onDelete={handleDeleteRequest}
            onToggleStatus={handleToggleStatus}
          />
        )}
      </div>

      <DeleteConfirmModal
        service={deleteTarget}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        loading={deleteLoading}
      />
    </PageContainer>
  )
}
