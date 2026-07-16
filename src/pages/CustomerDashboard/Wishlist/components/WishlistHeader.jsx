import { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Heart } from 'lucide-react'

function WishlistHeader() {
  const navigate = useNavigate()

  const handleBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const handleBrowse = useCallback(() => {
    navigate('/services')
  }, [navigate])

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <button
          onClick={handleBack}
          className="p-2 -ml-2 rounded-lg text-gray-400 hover:text-secondary hover:bg-gray-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <Heart size={20} className="text-danger" aria-hidden="true" />
            <h1 className="text-xl lg:text-2xl font-heading font-bold text-secondary">My Wishlist</h1>
          </div>
          <p className="text-sm text-gray-500 mt-0.5">Services you've saved for later</p>
        </div>
      </div>
      <button
        onClick={handleBrowse}
        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        aria-label="Browse services"
      >
        <Heart size={15} />
        Browse Services
      </button>
    </div>
  )
}

export default memo(WishlistHeader)
