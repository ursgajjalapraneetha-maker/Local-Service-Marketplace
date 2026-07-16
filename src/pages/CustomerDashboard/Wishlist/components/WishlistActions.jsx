import { memo, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, ShoppingCart, Trash2, Share2, Copy, Check } from 'lucide-react'
import toast from 'react-hot-toast'

function WishlistActions({ wishlistItem, onRemove, onBook }) {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)

  const handleViewDetails = useCallback(() => {
    navigate(`/services/${wishlistItem.id}`)
  }, [navigate, wishlistItem.id])

  const handleRemove = useCallback(() => {
    onRemove?.(wishlistItem.id)
  }, [onRemove, wishlistItem.id])

  const handleBook = useCallback(() => {
    onBook?.(wishlistItem)
    toast.success(`Booking ${wishlistItem.serviceName}`)
  }, [onBook, wishlistItem])

  const handleShare = useCallback(async () => {
    const shareData = {
      title: wishlistItem.serviceName,
      text: `Check out ${wishlistItem.serviceName} on LocalServices`,
      url: `${window.location.origin}/services/${wishlistItem.id}`,
    }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(shareData.url)
        setCopied(true)
        toast.success('Link copied to clipboard')
        setTimeout(() => setCopied(false), 2000)
      }
    } catch {
      toast.error('Could not share this service')
    }
  }, [wishlistItem])

  const handleCompare = useCallback(() => {
    toast.success(`${wishlistItem.serviceName} added to compare`)
  }, [wishlistItem.serviceName])

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <button
        onClick={handleViewDetails}
        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold rounded-lg bg-primary text-white hover:bg-primary-dark transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        aria-label={`View details for ${wishlistItem.serviceName}`}
      >
        <Eye size={12} />
        <span className="hidden sm:inline">View Details</span>
      </button>
      <button
        onClick={handleBook}
        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold rounded-lg bg-success/10 text-success hover:bg-success/20 transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-success/30"
        aria-label={`Book ${wishlistItem.serviceName}`}
      >
        <ShoppingCart size={12} />
        <span className="hidden sm:inline">Book Now</span>
      </button>
      <button
        onClick={handleRemove}
        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold rounded-lg bg-danger/10 text-danger hover:bg-danger/20 transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-danger/30"
        aria-label={`Remove ${wishlistItem.serviceName} from wishlist`}
      >
        <Trash2 size={12} />
        <span className="hidden sm:inline">Remove</span>
      </button>
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        aria-label={`Share ${wishlistItem.serviceName}`}
      >
        {copied ? <Check size={12} /> : <Share2 size={12} />}
        <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
      </button>
      <button
        onClick={handleCompare}
        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        aria-label={`Add ${wishlistItem.serviceName} to compare`}
      >
        <Copy size={12} />
        <span className="hidden sm:inline">Compare</span>
      </button>
    </div>
  )
}

export default memo(WishlistActions)
