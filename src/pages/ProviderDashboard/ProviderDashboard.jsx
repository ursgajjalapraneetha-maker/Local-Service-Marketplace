export default function ProviderDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-secondary">Provider Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage your services and appointments</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active Jobs', value: '5', color: 'bg-success/10 text-success' },
          { label: 'Pending Requests', value: '12', color: 'bg-warning/10 text-warning' },
          { label: 'Total Earnings', value: '₹45,200', color: 'bg-primary/10 text-primary' },
          { label: 'Rating', value: '4.8', color: 'bg-warning/10 text-warning' },
        ].map((stat) => (
          <div key={stat.label} className="p-5 bg-white rounded-xl border border-gray-100">
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${stat.color}`}>{stat.label}</span>
            <p className="mt-2 text-2xl font-heading font-bold text-secondary">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
        <h2 className="text-lg font-heading font-semibold text-secondary">Recent Appointments</h2>
        <p className="mt-2 text-gray-500">No appointments scheduled.</p>
      </div>
    </div>
  )
}
