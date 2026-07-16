import { useState, useMemo } from 'react'
import ServiceFilters from './components/services/ServiceFilters'
import ServiceTable from './components/services/ServiceTable'
import ServiceDetailsModal from './components/services/ServiceDetailsModal'
import ConfirmModal from './components/ConfirmModal'
import { FileText } from 'lucide-react'

const CATEGORIES = ['Cleaning', 'Plumbing', 'Electrical', 'HVAC']
const STATUSES = ['pending', 'approved', 'rejected']

const DUMMY_SERVICES = Array.from({ length: 40 }).map((_, i) => ({
  id: `SRV-${(1001 + i).toString().padStart(4, '0')}`,
  title: `Service ${i + 1} Professional`,
  provider: `Provider ${Math.floor(i / 3) + 1}`,
  category: CATEGORIES[i % CATEGORIES.length],
  price: `$${((i % 10) + 1) * 15}.00`,
  status: STATUSES[i % STATUSES.length],
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
}))

export default function Services() {
  const [services, setServices] = useState(DUMMY_SERVICES)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  
  // Modals state
  const [selectedService, setSelectedService] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isActionOpen, setIsActionOpen] = useState(false)
  const [actionType, setActionType] = useState('') // 'approve' or 'reject'

  const itemsPerPage = 10

  const filteredServices = useMemo(() => {
    return services.filter(s => {
      const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) || 
                            s.provider.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = categoryFilter === 'all' || s.category === categoryFilter
      const matchesStatus = statusFilter === 'all' || s.status === statusFilter
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [services, search, categoryFilter, statusFilter])

  useMemo(() => {
    setPage(1)
  }, [search, categoryFilter, statusFilter])

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage)
  const paginatedServices = filteredServices.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  const handleView = (service) => {
    setSelectedService(service)
    setIsDetailsOpen(true)
  }

  const handleDelete = (service) => {
    setSelectedService(service)
    setIsDeleteOpen(true)
  }

  const confirmDelete = () => {
    setServices(services.filter(s => s.id !== selectedService.id))
    setIsDeleteOpen(false)
  }

  const handleApprove = (service) => {
    setSelectedService(service)
    setActionType('approve')
    setIsActionOpen(true)
  }

  const handleReject = (service) => {
    setSelectedService(service)
    setActionType('reject')
    setIsActionOpen(true)
  }

  const confirmAction = () => {
    setServices(services.map(s => 
      s.id === selectedService.id 
        ? { ...s, status: actionType === 'approve' ? 'approved' : 'rejected' } 
        : s
    ))
    setIsActionOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service Management</h1>
          <p className="text-gray-500 mt-1">Review, approve, and manage services offered by providers.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-lg font-medium">
          <FileText size={20} />
          Export Report
        </button>
      </div>

      <ServiceFilters 
        search={search}
        setSearch={setSearch}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <ServiceTable 
          services={paginatedServices}
          onView={handleView}
          onApprove={handleApprove}
          onReject={handleReject}
          onDelete={handleDelete}
        />
        
        {/* Pagination */}
        {filteredServices.length > 0 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">{(page - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(filteredServices.length, page * itemsPerPage)}</span> of <span className="font-medium">{filteredServices.length}</span> results
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
        <ServiceDetailsModal 
          service={selectedService} 
          onClose={() => setIsDetailsOpen(false)} 
        />
      )}

      {isDeleteOpen && (
        <ConfirmModal 
          title="Delete Service"
          message={`Are you sure you want to delete "${selectedService?.title}"? This action cannot be undone.`}
          confirmText="Delete"
          confirmStyle="danger"
          onConfirm={confirmDelete}
          onCancel={() => setIsDeleteOpen(false)}
        />
      )}

      {isActionOpen && (
        <ConfirmModal 
          title={`${actionType === 'approve' ? 'Approve' : 'Reject'} Service`}
          message={`Are you sure you want to ${actionType} "${selectedService?.title}"?`}
          confirmText={actionType === 'approve' ? 'Approve' : 'Reject'}
          confirmStyle={actionType === 'approve' ? 'success' : 'danger'}
          onConfirm={confirmAction}
          onCancel={() => setIsActionOpen(false)}
        />
      )}
    </div>
  )
}
