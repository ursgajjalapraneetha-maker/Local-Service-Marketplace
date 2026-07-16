import { memo } from 'react'
import { Star, Briefcase, MapPin, BadgeCheck } from 'lucide-react'

function ProviderMiniCard({ provider, avatar, rating, reviews, experience, city, verified }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
      <img
        src={avatar}
        alt={provider}
        className="w-12 h-12 rounded-full shrink-0 bg-primary/10 object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-secondary truncate">
            {provider}
          </span>
          {verified && (
            <BadgeCheck size={14} className="text-primary shrink-0" />
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5 text-xs text-gray-500">
          <span className="inline-flex items-center gap-1">
            <Star size={11} className="text-warning fill-current" />
            {rating}
          </span>
          <span className="inline-flex items-center gap-1">
            <Briefcase size={11} />
            {experience}+ yrs
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin size={11} />
            {city}
          </span>
        </div>
      </div>
    </div>
  )
}

export default memo(ProviderMiniCard)
