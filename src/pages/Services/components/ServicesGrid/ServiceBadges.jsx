import { memo, useMemo } from 'react'
import { BadgeCheck, Zap, Timer, TrendingUp, Star, Users, Sparkles, Award } from 'lucide-react'

const badgeConfig = {
  Verified: {
    icon: BadgeCheck,
    classes: 'bg-primary/10 text-primary',
    label: 'Verified',
  },
  'Top Rated': {
    icon: TrendingUp,
    classes: 'bg-warning/10 text-warning',
    label: 'Top Rated',
  },
  'Instant Booking': {
    icon: Zap,
    classes: 'bg-success/10 text-success',
    label: 'Instant',
  },
}

function ServiceBadges({ providerType, discount, availability, rating, reviews, experience }) {
  const dynamicBadges = useMemo(() => {
    const badges = []

    if (rating && rating >= 4.8) {
      badges.push({
        icon: Star,
        classes: 'bg-amber-50 text-amber-600',
        label: 'Top Rated',
        key: 'dynamic-top-rated',
      })
    }

    if (reviews && reviews > 1000) {
      badges.push({
        icon: Users,
        classes: 'bg-violet-50 text-violet-600',
        label: 'Popular',
        key: 'dynamic-popular',
      })
    }

    if (discount && discount > 20) {
      badges.push({
        icon: Sparkles,
        classes: 'bg-rose-50 text-rose-600',
        label: 'Best Offer',
        key: 'dynamic-best-offer',
      })
    }

    if (experience && experience < 2) {
      badges.push({
        icon: Award,
        classes: 'bg-teal-50 text-teal-600',
        label: 'New Provider',
        key: 'dynamic-new',
      })
    }

    return badges
  }, [rating, reviews, discount, experience])

  const isToday = availability === 'Today'
  const hasDiscount = discount && discount > 0

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {providerType?.map((type) => {
        const cfg = badgeConfig[type]
        if (!cfg) return null
        const Icon = cfg.icon
        return (
          <span
            key={type}
            className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-md ${cfg.classes}`}
          >
            <Icon size={10} />
            {cfg.label}
          </span>
        )
      })}
      {dynamicBadges.map((badge) => {
        const Icon = badge.icon
        return (
          <span
            key={badge.key}
            className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-md ${badge.classes}`}
          >
            <Icon size={10} />
            {badge.label}
          </span>
        )
      })}
      {isToday && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold text-success bg-success/10 rounded-md">
          <Timer size={10} />
          Same Day
        </span>
      )}
      {hasDiscount && !dynamicBadges.some((b) => b.key === 'dynamic-best-offer') && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold text-danger bg-danger/10 rounded-md">
          {discount}% OFF
        </span>
      )}
    </div>
  )
}

export default memo(ServiceBadges)
