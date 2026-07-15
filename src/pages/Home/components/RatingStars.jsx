import { Star } from 'lucide-react'

export default function RatingStars({ rating, reviews, size = 14 }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={
              i < Math.round(rating)
                ? 'text-warning fill-current'
                : 'text-gray-200 fill-current'
            }
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-secondary">{rating}</span>
      {reviews !== undefined && (
        <span className="text-xs text-gray-400">({reviews.toLocaleString()})</span>
      )}
    </div>
  )
}
