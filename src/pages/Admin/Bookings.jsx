import { useState, useMemo } from 'react'
import BookingFilters from './components/bookings/BookingFilters'
import BookingTable from './components/bookings/BookingTable'
import BookingDetailsModal from './components/bookings/BookingDetailsModal'
import AssignProviderModal from './components/bookings/AssignProviderModal'
import ConfirmModal from './components/ConfirmModal'
import { Download } from 'lucide-react'

const STATUSES = ['pending', 'confirmed', 'completed', 'cancelled']
const SERVICES = ['Full House Deep Cleaning', 'AC Maintenance', 'Plumbing Repair', 'Electrical Fix']

const DUMMY_BOOKINGS = Array.from({ length: 40 }).map((_, i) => ({
  id: `BKG-${(1001 + i).toString().padStart(4, '0')}`,
  customer: `Customer ${i + 1}`,
  service: SERVICES[i % SERVICES.length],
  provider: i % 4 === 0 ? 'Unassigned' : `Provider ${Math.floor(i / 2) + 1}`,
  date: new Date(Date.now() + Math.random() * 10000000000).toLocaleDateString(),
  time: `${(i % 12) + 1}:00 ${i % 2 === 0 ? 'AM' : 'PM'}`,
  amount: `$${((i % 5) + 1) * 45}.00`,
  status: STATUSES[i % STATUSES.length],
}))

export default function Bookings() {
  const [bookings, setBookings] = useState(DUMMY_BOOKINGS)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  
  // Modals state
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isAssignOpen, setIsAssignOpen] = useState(false)
  const [isCancelOpen, setIsCancelOpen] = useState(false)

  const itemsPerPage = 10

  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const matchesSearch = b.id.toLowerCase().includes(search.toLowerCase()) || 
                            b.customer.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'all' || b.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [bookings, search, statusFilter])

  useMemo(() => {
    setPage(1)
  }, [search, statusFilter])

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage)
  const paginatedBookings = filteredBookings.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  const handleView = (booking) => {
    setSelectedBooking(booking)
    setIsDetailsOpen(true)
  }

  const handleAssignClick = (booking) => {
    setSelectedBooking(booking)
    setIsAssignOpen(true)
  }

  const confirmAssign = (bookingId, providerName) => {
    setBookings(bookings.map(b => 
      b.id === bookingId 
        ? { ...b, provider: providerName, status: b.status === 'pending' ? 'confirmed' : b.status } 
        : b
    ))
    setIsAssignOpen(false)
  }

  const handleCancelClick = (booking) => {
    setSelectedBooking(booking)
    setIsCancelOpen(true)
  }

  const confirmCancel = () => {
    setBookings(bookings.map(b => 
      b.id === selectedBooking.id 
        ? { ...b, status: 'cancelled' } 
        : b
    ))
    setIsCancelOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Booking Management</h1>
          <p className="text-gray-500 mt-1">Track all service appointments, assignments, and statuses.</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
          <Download size={20} />
          Export Data
        </button>
      </div>

      <BookingFilters 
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <BookingTable 
          bookings={paginatedBookings}
          onView={handleView}
          onAssign={handleAssignClick}
          onCancel={handleCancelClick}
        />
        
        {/* Pagination */}
        {filteredBookings.length > 0 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">{(page - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(filteredBookings.length, page * itemsPerPage)}</span> of <span className="font-medium">{filteredBookings.length}</span> results
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
        <BookingDetailsModal 
          booking={selectedBooking} 
          onClose={() => setIsDetailsOpen(false)} 
        />
      )}

      {isAssignOpen && (
        <AssignProviderModal 
          booking={selectedBooking} 
          onClose={() => setIsAssignOpen(false)}
          onAssign={confirmAssign}
        />
      )}

      {isCancelOpen && (
        <ConfirmModal 
          title="Cancel Booking"
          message={`Are you sure you want to cancel booking ${selectedBooking?.id}? This action cannot be undone.`}
          confirmText="Yes, Cancel Booking"
          confirmStyle="danger"
          onConfirm={confirmCancel}
          onCancel={() => setIsCancelOpen(false)}
        />
      )}
    </div>
  )
}
