import { X, Mail, Shield, Calendar, Activity } from 'lucide-react'

export default function UserDetailsModal({ user, onClose }) {
  if (!user) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">User Details</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.id}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 flex items-center gap-1.5"><Mail size={14}/> Email</label>
              <p className="text-sm text-gray-900 font-medium">{user.email}</p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 flex items-center gap-1.5"><Shield size={14}/> Role</label>
              <p className="text-sm text-gray-900 font-medium capitalize">{user.role}</p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 flex items-center gap-1.5"><Activity size={14}/> Status</label>
              <p className="text-sm text-gray-900 font-medium capitalize">{user.status}</p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 flex items-center gap-1.5"><Calendar size={14}/> Joined Date</label>
              <p className="text-sm text-gray-900 font-medium">{user.joinDate}</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            Close
          </button>
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
