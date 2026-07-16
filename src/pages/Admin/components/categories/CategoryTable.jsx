import { Edit, Trash2, Power, PowerOff } from 'lucide-react'

export default function CategoryTable({ categories, onEdit, onDelete, onToggleStatus }) {
  if (categories.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No categories found matching your criteria.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
            <th className="p-4 font-medium whitespace-nowrap">ID</th>
            <th className="p-4 font-medium whitespace-nowrap">Name</th>
            <th className="p-4 font-medium whitespace-nowrap">Description</th>
            <th className="p-4 font-medium whitespace-nowrap">Services</th>
            <th className="p-4 font-medium whitespace-nowrap">Status</th>
            <th className="p-4 font-medium text-right whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {categories.map(category => (
            <tr key={category.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="p-4 text-sm font-medium text-gray-900 whitespace-nowrap">{category.id}</td>
              <td className="p-4 text-sm font-medium text-gray-900 whitespace-nowrap">{category.name}</td>
              <td className="p-4 text-sm text-gray-500 max-w-xs truncate">{category.description}</td>
              <td className="p-4 text-sm text-gray-500 whitespace-nowrap">{category.servicesCount} listings</td>
              <td className="p-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize
                  ${category.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {category.status}
                </span>
              </td>
              <td className="p-4 text-right space-x-2 whitespace-nowrap flex items-center justify-end">
                <button onClick={() => onEdit(category)} className="p-1.5 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/10" title="Edit">
                  <Edit size={18} />
                </button>
                <button onClick={() => onToggleStatus(category)} className={`p-1.5 transition-colors rounded-lg ${category.status === 'active' ? 'text-gray-400 hover:text-orange-500 hover:bg-orange-50' : 'text-gray-400 hover:text-green-500 hover:bg-green-50'}`} title={category.status === 'active' ? 'Deactivate' : 'Activate'}>
                  {category.status === 'active' ? <PowerOff size={18} /> : <Power size={18} />}
                </button>
                <button onClick={() => onDelete(category)} className="p-1.5 text-gray-400 hover:text-danger transition-colors rounded-lg hover:bg-danger/10" title="Delete">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
