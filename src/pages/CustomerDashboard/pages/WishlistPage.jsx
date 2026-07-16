import DashboardContent from '../components/Common/DashboardContent'

export default function WishlistPage() {
  return (
    <DashboardContent title="Wishlist" subtitle="Services you've saved">
      <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
        <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </div>
        <h3 className="text-lg font-heading font-semibold text-secondary">Your wishlist is empty</h3>
        <p className="mt-1 text-sm text-gray-500 max-w-sm mx-auto">
          Save services you love by tapping the heart icon. They'll appear here for quick access.
        </p>
      </div>
    </DashboardContent>
  )
}
