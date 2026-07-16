export default function ProfileSettings() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-lg font-bold text-gray-900">Admin Profile</h2>
      
      <div className="space-y-6 max-w-2xl">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold border-4 border-white shadow-sm shrink-0">
            AD
          </div>
          <div>
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
              Upload Avatar
            </button>
            <p className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. Max size of 800K</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input type="text" defaultValue="Admin" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input type="text" defaultValue="User" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" defaultValue="admin@example.com" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-gray-50" readOnly />
            <p className="text-xs text-gray-500 mt-1">To change your email address, please contact super admin.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input type="text" defaultValue="Administrator" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-gray-50" readOnly />
          </div>
        </div>
      </div>
    </div>
  )
}
