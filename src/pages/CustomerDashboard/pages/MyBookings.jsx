import DashboardContent from '../components/Common/DashboardContent'

export default function MyBookings() {
  return (
    <DashboardContent title="My Bookings" subtitle="Manage your service bookings">
      <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
        <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-heading font-semibold text-secondary">No bookings yet</h3>
        <p className="mt-1 text-sm text-gray-500 max-w-sm mx-auto">
          When you book a service, it will appear here. You can track status, reschedule, or cancel.
        </p>
      </div>
    </DashboardContent>
  )
}
