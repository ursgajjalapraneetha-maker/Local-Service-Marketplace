export default function PlatformSettings() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-lg font-bold text-gray-900">Platform Settings</h2>
      
      <div className="space-y-6 max-w-2xl">
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div className="pr-4">
            <h3 className="text-sm font-medium text-gray-900">Allow New Provider Registrations</h3>
            <p className="text-sm text-gray-500">Enable or disable new service providers from joining.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div className="pr-4">
            <h3 className="text-sm font-medium text-gray-900">Auto-Approve Bookings</h3>
            <p className="text-sm text-gray-500">Automatically confirm bookings that match provider availability.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Platform Commission Rate (%)</label>
          <input type="number" defaultValue="15" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm" />
        </div>
      </div>
    </div>
  )
}
