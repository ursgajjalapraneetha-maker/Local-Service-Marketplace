export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-secondary">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Platform overview and management</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Users', value: '12,450', color: 'bg-primary/10 text-primary' },
          { label: 'Service Providers', value: '5,230', color: 'bg-success/10 text-success' },
          { label: 'Total Bookings', value: '48,900', color: 'bg-warning/10 text-warning' },
          { label: 'Revenue', value: '₹1.2Cr', color: 'bg-primary/10 text-primary' },
        ].map((stat) => (
          <div key={stat.label} className="p-5 bg-white rounded-xl border border-gray-100">
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${stat.color}`}>{stat.label}</span>
            <p className="mt-2 text-2xl font-heading font-bold text-secondary">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
          <h2 className="text-lg font-heading font-semibold text-secondary">Recent Users</h2>
          <p className="mt-2 text-gray-500">New users will appear here.</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
          <h2 className="text-lg font-heading font-semibold text-secondary">Platform Activity</h2>
          <p className="mt-2 text-gray-500">Activity logs will appear here.</p>
        </div>
      </div>
    </div>
  )
}
