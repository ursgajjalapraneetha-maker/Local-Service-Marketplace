import { useState, useMemo } from 'react'
import ProviderFilters from './components/providers/ProviderFilters'
import ProviderTable from './components/providers/ProviderTable'
import ProviderDetailsModal from './components/providers/ProviderDetailsModal'
import ConfirmModal from './components/ConfirmModal'
import { Plus } from 'lucide-react'

const SERVICES = ['Plumbing', 'Electrical', 'Cleaning', 'HVAC']
const VERIFICATIONS = ['pending', 'verified', 'rejected']

const DUMMY_PROVIDERS = Array.from({ length: 35 }).map((_, i) => ({
  id: `PRV-${1000 + i}`,
  name: `Provider ${i + 1}`,
  email: `provider${i + 1}@example.com`,
  service: SERVICES[i % SERVICES.length],
  rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
  verification: VERIFICATIONS[i % VERIFICATIONS.length],
  status: i % 8 === 0 ? 'inactive' : 'active',
  joinDate: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
  phone: `+1 (555) ${(100 + i).toString().padStart(3, '0')}-${(1000 + i).toString().padStart(4, '0')}`,
}))

export default function Providers() {
  const [providers, setProviders] = useState(DUMMY_PROVIDERS)
  const [search, setSearch] = useState('')
  const [serviceFilter, setServiceFilter] = useState('all')
  const [verificationFilter, setVerificationFilter] = useState('all')
  const [page, setPage] = useState(1)
  
  // Modals state
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isActionOpen, setIsActionOpen] = useState(false)
  const [actionType, setActionType] = useState('') // 'approve' or 'reject'

  const itemsPerPage = 10

  // Filter logic
  const filteredProviders = useMemo(() => {
    return providers.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                            p.email.toLowerCase().includes(search.toLowerCase())
      const matchesService = serviceFilter === 'all' || p.service === serviceFilter
      const matchesVerif = verificationFilter === 'all' || p.verification === verificationFilter
      return matchesSearch && matchesService && matchesVerif
    })
  }, [providers, search, serviceFilter, verificationFilter])

  useMemo(() => {
    setPage(1)
  }, [search, serviceFilter, verificationFilter])

  const totalPages = Math.ceil(filteredProviders.length / itemsPerPage)
  const paginatedProviders = filteredProviders.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  const handleView = (provider) => {
    setSelectedProvider(provider)
    setIsDetailsOpen(true)
  }

  const handleDelete = (provider) => {
    setSelectedProvider(provider)
    setIsDeleteOpen(true)
  }

  const confirmDelete = () => {
    setProviders(providers.filter(p => p.id !== selectedProvider.id))
    setIsDeleteOpen(false)
  }

  const handleApprove = (provider) => {
    setSelectedProvider(provider)
    setActionType('approve')
    setIsActionOpen(true)
  }

  const handleReject = (provider) => {
    setSelectedProvider(provider)
    setActionType('reject')
    setIsActionOpen(true)
  }

  const confirmAction = () => {
    setProviders(providers.map(p => 
      p.id === selectedProvider.id 
        ? { ...p, verification: actionType === 'approve' ? 'verified' : 'rejected' } 
        : p
    ))
    setIsActionOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Provider Management</h1>
          <p className="text-gray-500 mt-1">Manage service providers, verifications, and performance.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
          <Plus size={20} />
          Add Provider
        </button>
      </div>

      <ProviderFilters 
        search={search}
        setSearch={setSearch}
        serviceFilter={serviceFilter}
        setServiceFilter={setServiceFilter}
        verificationFilter={verificationFilter}
        setVerificationFilter={setVerificationFilter}
      />

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <ProviderTable 
          providers={paginatedProviders}
          onView={handleView}
          onApprove={handleApprove}
          onReject={handleReject}
          onDelete={handleDelete}
        />
        
        {/* Pagination */}
        {filteredProviders.length > 0 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">{(page - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(filteredProviders.length, page * itemsPerPage)}</span> of <span className="font-medium">{filteredProviders.length}</span> results
            </p>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded border border-gray-200 text-sm disabled:opacity-50"
              >
                Previous
              </button>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || totalPages === 0}
                className="px-3 py-1 rounded border border-gray-200 text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {isDetailsOpen && (
        <ProviderDetailsModal 
          provider={selectedProvider} 
          onClose={() => setIsDetailsOpen(false)} 
        />
      )}

      {isDeleteOpen && (
        <ConfirmModal 
          title="Delete Provider"
          message={`Are you sure you want to delete ${selectedProvider?.name}? This action cannot be undone.`}
          confirmText="Delete"
          confirmStyle="danger"
          onConfirm={confirmDelete}
          onCancel={() => setIsDeleteOpen(false)}
        />
      )}

      {isActionOpen && (
        <ConfirmModal 
          title={`${actionType === 'approve' ? 'Approve' : 'Reject'} Provider`}
          message={`Are you sure you want to ${actionType} ${selectedProvider?.name}'s verification request?`}
          confirmText={actionType === 'approve' ? 'Approve' : 'Reject'}
          confirmStyle={actionType === 'approve' ? 'success' : 'danger'}
          onConfirm={confirmAction}
          onCancel={() => setIsActionOpen(false)}
        />
      )}
    </div>
  )
}
