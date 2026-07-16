import DashboardContent from '../components/Common/DashboardContent'

export default function Settings() {
  return (
    <DashboardContent title="Settings" subtitle="Manage your preferences">
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="text-sm font-heading font-semibold text-secondary mb-4">Notifications</h3>
          <div className="space-y-3">
            {['Email notifications', 'SMS alerts', 'Push notifications', 'Marketing emails'].map((setting) => (
              <div key={setting} className="flex items-center justify-between">
                <label className="text-sm text-gray-600" htmlFor={setting}>{setting}</label>
                <div className="relative">
                  <input type="checkbox" id={setting} defaultChecked className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200 rounded-full peer-checked:bg-primary transition-colors cursor-pointer after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-sm after:transition-all peer-checked:after:translate-x-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="text-sm font-heading font-semibold text-secondary mb-4">Preferences</h3>
          <div className="space-y-3">
            {['Language', 'Currency'].map((pref) => (
              <div key={pref} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{pref}</span>
                <select className="text-sm text-secondary bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30" aria-label={pref}>
                  <option>{pref === 'Language' ? 'English' : 'INR (₹)'}</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardContent>
  )
}
