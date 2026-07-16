import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreditCard, ArrowRight } from 'lucide-react'

function PaymentEmptyState() {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
      <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
        <CreditCard size={32} className="text-primary/40" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-heading font-semibold text-secondary">No Payments Found</h3>
      <p className="mt-1 text-sm text-gray-500 max-w-sm mx-auto">
        We couldn&apos;t find any payments matching your criteria. Try adjusting your search or filters.
      </p>
      <button
        onClick={() => navigate('/services')}
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        aria-label="Browse services"
      >
        Browse Services
        <ArrowRight size={15} />
      </button>
    </div>
  )
}

export default memo(PaymentEmptyState)
