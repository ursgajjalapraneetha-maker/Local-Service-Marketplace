import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, ArrowRight, Clock } from 'lucide-react'

function WishlistEmptyState() {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
      <div className="w-16 h-16 bg-danger/5 rounded-full flex items-center justify-center mx-auto mb-4">
        <Heart size={32} className="text-danger/40" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-heading font-semibold text-secondary">Your Wishlist is Empty</h3>
      <p className="mt-1 text-sm text-gray-500 max-w-sm mx-auto">
        Save services you love by tapping the heart icon. They&apos;ll appear here for quick access.
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

export const RecentlyViewedEmptyState = memo(function RecentlyViewedEmptyState() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
        <Clock size={22} className="text-gray-300" aria-hidden="true" />
      </div>
      <p className="text-sm font-medium text-secondary">No recently viewed services</p>
      <p className="text-xs text-gray-400 mt-1">Services you view will appear here.</p>
    </div>
  )
})

export default memo(WishlistEmptyState)
