export default function EmailSettings() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-lg font-bold text-gray-900">Email Settings</h2>
      
      <div className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Server</label>
          <input type="text" defaultValue="smtp.example.com" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Port</label>
          <input type="text" defaultValue="587" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sender Email</label>
          <input type="email" defaultValue="noreply@example.com" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm" />
        </div>

        <div className="pt-6 mt-6 border-t border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Email Notifications</h3>
          
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer w-fit">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" />
              <span className="text-sm text-gray-700">New User Registrations</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer w-fit">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" />
              <span className="text-sm text-gray-700">Provider Verifications</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer w-fit">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" />
              <span className="text-sm text-gray-700">Daily Booking Summary</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
