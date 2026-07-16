import { Zap, UserCheck, Users, Wrench, Tags } from 'lucide-react'
import { Link } from 'react-router-dom'

const ACTIONS = [
  { id: 1, label: 'Approve Providers', icon: UserCheck, color: 'text-blue-600', bg: 'bg-blue-100', path: '/admin-dashboard/providers' },
  { id: 2, label: 'View Users', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100', path: '/admin-dashboard/users' },
  { id: 3, label: 'Manage Services', icon: Wrench, color: 'text-orange-600', bg: 'bg-orange-100', path: '/admin-dashboard/services' },
  { id: 4, label: 'Manage Categories', icon: Tags, color: 'text-green-600', bg: 'bg-green-100', path: '/admin-dashboard/categories' },
]

export default function QuickActions() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="p-5 border-b border-gray-100 flex items-center gap-2">
        <Zap size={20} className="text-primary" />
        <h3 className="font-semibold text-gray-900">Quick Actions</h3>
      </div>
      <div className="p-5 grid grid-cols-2 gap-4">
        {ACTIONS.map((action) => (
          <Link 
            key={action.id} 
            to={action.path}
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-all text-center gap-2"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${action.bg} ${action.color}`}>
              <action.icon size={20} />
            </div>
            <span className="text-xs font-medium text-gray-700">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
