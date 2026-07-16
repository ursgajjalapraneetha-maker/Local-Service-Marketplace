import DashboardContent from '../components/Common/DashboardContent'

export default function Reviews() {
  return (
    <DashboardContent title="Reviews" subtitle="Reviews you've written">
      <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
        <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-heading font-semibold text-secondary">No reviews yet</h3>
        <p className="mt-1 text-sm text-gray-500 max-w-sm mx-auto">
          Share your experience after a service. Your reviews help other customers make informed choices.
        </p>
      </div>
    </DashboardContent>
  )
}
