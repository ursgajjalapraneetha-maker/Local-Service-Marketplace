import DashboardContent from '../components/Common/DashboardContent'

export default function Payments() {
  return (
    <DashboardContent title="Payments" subtitle="Payment history and methods">
      <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
        <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-heading font-semibold text-secondary">No payment history</h3>
        <p className="mt-1 text-sm text-gray-500 max-w-sm mx-auto">
          Your payment transactions and saved methods will appear here after your first booking.
        </p>
      </div>
    </DashboardContent>
  )
}
