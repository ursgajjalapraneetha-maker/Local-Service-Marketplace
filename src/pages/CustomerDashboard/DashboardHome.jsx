import DashboardContent from './components/Common/DashboardContent'

export default function DashboardHome() {
  return (
    <DashboardContent title="Dashboard" subtitle="Overview of your account">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active Bookings', value: '3', color: 'bg-primary/10 text-primary' },
          { label: 'Completed', value: '24', color: 'bg-success/10 text-success' },
          { label: 'Total Spent', value: '₹12,450', color: 'bg-warning/10 text-warning' },
          { label: 'Reviews', value: '18', color: 'bg-blue-100 text-blue-600' },
        ].map((stat) => (
          <div key={stat.label} className="p-5 bg-white rounded-xl border border-gray-100">
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${stat.color}`}>
              {stat.label}
            </span>
            <p className="mt-2 text-2xl font-heading font-bold text-secondary">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
        <h2 className="text-lg font-heading font-semibold text-secondary">Your Bookings</h2>
        <p className="mt-2 text-gray-500">No bookings yet. Start by exploring services.</p>
      </div>
    </DashboardContent>
  )
}
