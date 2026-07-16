import { memo } from 'react'
import { Star, Briefcase, MapPin, Clock, CalendarCheck } from 'lucide-react'

function ServiceMeta({
  rating,
  reviews,
  experience,
  distance,
  availability,
  duration,
}) {
  const metaItems = [
    {
      icon: Star,
      value: rating,
      suffix: `(${reviews?.toLocaleString()})`,
      color: 'text-warning',
      label: `Rating: ${rating} out of 5`,
    },
    {
      icon: Briefcase,
      value: `${experience}+ yrs`,
      label: `${experience} years experience`,
    },
    {
      icon: MapPin,
      value: distance,
      label: `Distance: ${distance}`,
    },
    {
      icon: CalendarCheck,
      value: availability,
      label: `Available: ${availability}`,
    },
    {
      icon: Clock,
      value: duration,
      label: `Duration: ${duration}`,
    },
  ]

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-gray-500">
      {metaItems.map((item) => {
        const Icon = item.icon
        return (
          <span
            key={item.label}
            className="inline-flex items-center gap-1"
            title={item.label}
          >
            <Icon
              size={12}
              className={`shrink-0 ${item.color || 'text-gray-400'}`}
            />
            <span>
              {item.value}
              {item.suffix && (
                <span className="text-gray-400 ml-0.5">{item.suffix}</span>
              )}
            </span>
          </span>
        )
      })}
    </div>
  )
}

export default memo(ServiceMeta)
