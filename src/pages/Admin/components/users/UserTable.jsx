import { Eye, Edit, Trash2, Power, PowerOff } from 'lucide-react'

export default function UserTable({ users, onView, onEdit, onDelete, onToggleStatus }) {
  if (users.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No users found matching your criteria.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
            <th className="p-4 font-medium whitespace-nowrap">User ID</th>
            <th className="p-4 font-medium whitespace-nowrap">Name</th>
            <th className="p-4 font-medium whitespace-nowrap">Email</th>
            <th className="p-4 font-medium whitespace-nowrap">Role</th>
            <th className="p-4 font-medium whitespace-nowrap">Status</th>
            <th className="p-4 font-medium whitespace-nowrap">Joined</th>
            <th className="p-4 font-medium text-right whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map(user => (
            <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="p-4 text-sm font-medium text-gray-900 whitespace-nowrap">{user.id}</td>
              <td className="p-4 text-sm text-gray-800 whitespace-nowrap">{user.name}</td>
              <td className="p-4 text-sm text-gray-500 whitespace-nowrap">{user.email}</td>
              <td className="p-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize
                  ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 
                    user.role === 'provider' ? 'bg-blue-100 text-blue-700' : 
                    'bg-gray-100 text-gray-700'}`}>
                  {user.role}
                </span>
              </td>
              <td className="p-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize
                  ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {user.status}
                </span>
              </td>
              <td className="p-4 text-sm text-gray-500 whitespace-nowrap">{user.joinDate}</td>
              <td className="p-4 text-right space-x-2 whitespace-nowrap">
                <button onClick={() => onView(user)} className="p-1.5 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/10" title="View/Edit">
                  <Eye size={18} />
                </button>
                <button onClick={() => onEdit(user)} className="p-1.5 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/10" title="Edit">
                  <Edit size={18} />
                </button>
                <button onClick={() => onToggleStatus(user)} className={`p-1.5 transition-colors rounded-lg ${user.status === 'active' ? 'text-gray-400 hover:text-orange-500 hover:bg-orange-50' : 'text-gray-400 hover:text-green-500 hover:bg-green-50'}`} title={user.status === 'active' ? 'Deactivate' : 'Activate'}>
                  {user.status === 'active' ? <PowerOff size={18} /> : <Power size={18} />}
                </button>
                <button onClick={() => onDelete(user)} className="p-1.5 text-gray-400 hover:text-danger transition-colors rounded-lg hover:bg-danger/10" title="Delete">
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
