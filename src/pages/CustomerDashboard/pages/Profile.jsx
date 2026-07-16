import DashboardContent from '../components/Common/DashboardContent'

export default function Profile() {
  return (
    <DashboardContent title="Profile" subtitle="Manage your personal information">
      <div className="bg-white rounded-xl border border-gray-100 p-8">
        <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-xl font-heading font-bold text-primary">RK</span>
          </div>
          <div>
            <h2 className="text-lg font-heading font-semibold text-secondary">Rahul Kumar</h2>
            <p className="text-sm text-gray-500">rahul@example.com</p>
            <p className="text-xs text-gray-400">+91 98765 43210</p>
          </div>
        </div>
        <div className="mt-6 grid sm:grid-cols-2 gap-6">
          {[
            { label: 'Full Name', value: 'Rahul Kumar' },
            { label: 'Email', value: 'rahul@example.com' },
            { label: 'Phone', value: '+91 98765 43210' },
            { label: 'Location', value: 'Mumbai, India' },
            { label: 'Member Since', value: 'January 2025' },
            { label: 'Total Bookings', value: '27' },
          ].map((field) => (
            <div key={field.label}>
              <p className="text-xs text-gray-400 uppercase tracking-wider">{field.label}</p>
              <p className="mt-1 text-sm font-medium text-secondary">{field.value}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardContent>
  )
}
