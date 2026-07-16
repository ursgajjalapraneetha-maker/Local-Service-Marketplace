import { useState, useMemo } from 'react'
import { Plus, Search } from 'lucide-react'
import CategoryTable from './components/categories/CategoryTable'
import CategoryFormModal from './components/categories/CategoryFormModal'
import ConfirmModal from './components/ConfirmModal'

const DUMMY_CATEGORIES = Array.from({ length: 25 }).map((_, i) => ({
  id: `CAT-${(1001 + i).toString().padStart(4, '0')}`,
  name: `Category ${i + 1}`,
  description: `Description for category ${i + 1} detailing what services fall under this category.`,
  servicesCount: Math.floor(Math.random() * 100),
  status: i % 6 === 0 ? 'inactive' : 'active',
}))

export default function Categories() {
  const [categories, setCategories] = useState(DUMMY_CATEGORIES)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  
  // Modals state
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isActionOpen, setIsActionOpen] = useState(false)
  const [actionType, setActionType] = useState('')

  const itemsPerPage = 10

  const filteredCategories = useMemo(() => {
    return categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
  }, [categories, search])

  useMemo(() => {
    setPage(1)
  }, [search])

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage)
  const paginatedCategories = filteredCategories.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  const handleAdd = () => {
    setSelectedCategory(null)
    setIsFormOpen(true)
  }

  const handleEdit = (category) => {
    setSelectedCategory(category)
    setIsFormOpen(true)
  }

  const handleSaveForm = (formData) => {
    if (selectedCategory) {
      setCategories(categories.map(c => c.id === selectedCategory.id ? { ...c, ...formData } : c))
    } else {
      const newCategory = {
        id: `CAT-${(Math.floor(Math.random() * 10000)).toString().padStart(4, '0')}`,
        servicesCount: 0,
        ...formData
      }
      setCategories([newCategory, ...categories])
    }
    setIsFormOpen(false)
  }

  const handleDelete = (category) => {
    setSelectedCategory(category)
    setIsDeleteOpen(true)
  }

  const confirmDelete = () => {
    setCategories(categories.filter(c => c.id !== selectedCategory.id))
    setIsDeleteOpen(false)
  }

  const handleToggleStatus = (category) => {
    setSelectedCategory(category)
    setActionType(category.status === 'active' ? 'deactivate' : 'activate')
    setIsActionOpen(true)
  }

  const confirmToggleStatus = () => {
    setCategories(categories.map(c => 
      c.id === selectedCategory.id 
        ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } 
        : c
    ))
    setIsActionOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Category Management</h1>
          <p className="text-gray-500 mt-1">Manage service categories, add new ones, or update existing details.</p>
        </div>
        <button onClick={handleAdd} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
          <Plus size={20} />
          Add Category
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <CategoryTable 
          categories={paginatedCategories}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />
        
        {/* Pagination */}
        {filteredCategories.length > 0 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">{(page - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(filteredCategories.length, page * itemsPerPage)}</span> of <span className="font-medium">{filteredCategories.length}</span> results
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

      {isFormOpen && (
        <CategoryFormModal 
          category={selectedCategory} 
          onClose={() => setIsFormOpen(false)} 
          onSave={handleSaveForm}
        />
      )}

      {isDeleteOpen && (
        <ConfirmModal 
          title="Delete Category"
          message={`Are you sure you want to delete "${selectedCategory?.name}"? This action cannot be undone.`}
          confirmText="Delete"
          confirmStyle="danger"
          onConfirm={confirmDelete}
          onCancel={() => setIsDeleteOpen(false)}
        />
      )}

      {isActionOpen && (
        <ConfirmModal 
          title={`${actionType === 'activate' ? 'Activate' : 'Deactivate'} Category`}
          message={`Are you sure you want to ${actionType} "${selectedCategory?.name}"?`}
          confirmText={actionType === 'activate' ? 'Activate' : 'Deactivate'}
          confirmStyle={actionType === 'activate' ? 'success' : 'warning'}
          onConfirm={confirmToggleStatus}
          onCancel={() => setIsActionOpen(false)}
        />
      )}
    </div>
  )
}
