import DashboardContent from '../components/Common/DashboardContent'

export default function Addresses() {
  return (
    <DashboardContent title="Addresses" subtitle="Manage your saved addresses">
      <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
        <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-heading font-semibold text-secondary">No addresses saved</h3>
        <p className="mt-1 text-sm text-gray-500 max-w-sm mx-auto">
          Add your home or office addresses for quick booking. They'll be saved here for future use.
        </p>
      </div>
    </DashboardContent>
  )
}
