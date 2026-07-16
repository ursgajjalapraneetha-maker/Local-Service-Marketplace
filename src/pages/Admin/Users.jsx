import { useState, useMemo } from 'react'
import UserFilters from './components/users/UserFilters'
import UserTable from './components/users/UserTable'
import UserDetailsModal from './components/users/UserDetailsModal'
import ConfirmModal from './components/ConfirmModal'
import { Plus } from 'lucide-react'

// Dummy data
const DUMMY_USERS = Array.from({ length: 45 }).map((_, i) => ({
  id: `USR-${1000 + i}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 5 === 0 ? 'admin' : (i % 3 === 0 ? 'provider' : 'customer'),
  status: i % 7 === 0 ? 'inactive' : 'active',
  joinDate: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
}))

export default function Users() {
  const [users, setUsers] = useState(DUMMY_USERS)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  
  // Modals state
  const [selectedUser, setSelectedUser] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isActionOpen, setIsActionOpen] = useState(false)
  const [actionType, setActionType] = useState('') // activate or deactivate

  const itemsPerPage = 10

  // Filter logic
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) || 
                            user.email.toLowerCase().includes(search.toLowerCase())
      const matchesRole = roleFilter === 'all' || user.role === roleFilter
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter
      return matchesSearch && matchesRole && matchesStatus
    })
  }, [users, search, roleFilter, statusFilter])

  // Reset page to 1 when filters change
  useMemo(() => {
    setPage(1)
  }, [search, roleFilter, statusFilter])

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const paginatedUsers = filteredUsers.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  const handleView = (user) => {
    setSelectedUser(user)
    setIsDetailsOpen(true)
  }

  const handleEdit = (user) => {
    setSelectedUser(user)
    setIsDetailsOpen(true) 
  }

  const handleDelete = (user) => {
    setSelectedUser(user)
    setIsDeleteOpen(true)
  }

  const confirmDelete = () => {
    setUsers(users.filter(u => u.id !== selectedUser.id))
    setIsDeleteOpen(false)
  }

  const handleToggleStatus = (user) => {
    setSelectedUser(user)
    setActionType(user.status === 'active' ? 'deactivate' : 'activate')
    setIsActionOpen(true)
  }

  const confirmToggleStatus = () => {
    setUsers(users.map(u => 
      u.id === selectedUser.id 
        ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } 
        : u
    ))
    setIsActionOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-500 mt-1">Manage all platform users, roles, and statuses.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
          <Plus size={20} />
          Add User
        </button>
      </div>

      <UserFilters 
        search={search}
        setSearch={setSearch}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <UserTable 
          users={paginatedUsers}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />
        
        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">{(page - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(filteredUsers.length, page * itemsPerPage)}</span> of <span className="font-medium">{filteredUsers.length}</span> results
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
        <UserDetailsModal 
          user={selectedUser} 
          onClose={() => setIsDetailsOpen(false)} 
        />
      )}

      {isDeleteOpen && (
        <ConfirmModal 
          title="Delete User"
          message={`Are you sure you want to delete ${selectedUser?.name}? This action cannot be undone.`}
          confirmText="Delete"
          confirmStyle="danger"
          onConfirm={confirmDelete}
          onCancel={() => setIsDeleteOpen(false)}
        />
      )}

      {isActionOpen && (
        <ConfirmModal 
          title={`${actionType === 'activate' ? 'Activate' : 'Deactivate'} User`}
          message={`Are you sure you want to ${actionType} ${selectedUser?.name}?`}
          confirmText={actionType === 'activate' ? 'Activate' : 'Deactivate'}
          confirmStyle={actionType === 'activate' ? 'success' : 'warning'}
          onConfirm={confirmToggleStatus}
          onCancel={() => setIsActionOpen(false)}
        />
      )}
    </div>
  )
}
