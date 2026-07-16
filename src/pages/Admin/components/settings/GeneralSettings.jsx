export default function GeneralSettings() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-lg font-bold text-gray-900">General Settings</h2>
      
      <div className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
          <input type="text" defaultValue="Local Services Marketplace" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
          <input type="email" defaultValue="support@example.com" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
          <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-white">
            <option>UTC (Coordinated Universal Time)</option>
            <option>EST (Eastern Standard Time)</option>
            <option>PST (Pacific Standard Time)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Theme Preference</label>
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input type="radio" name="theme" defaultChecked className="text-primary focus:ring-primary" /> Light
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input type="radio" name="theme" className="text-primary focus:ring-primary" /> Dark
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input type="radio" name="theme" className="text-primary focus:ring-primary" /> System Default
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
