import { ShieldCheck, Star, Zap, Award } from 'lucide-react'

const badgeConfig = {
  verified: { icon: ShieldCheck, label: 'Verified', color: 'text-success bg-success/10' },
  'top-rated': { icon: Star, label: 'Top Rated', color: 'text-warning bg-warning/10' },
  'fast-response': { icon: Zap, label: 'Fast Response', color: 'text-primary bg-primary/10' },
  experience: { icon: Award, label: '5+ Years', color: 'text-purple-600 bg-purple-50' },
}

export default function ProviderBadge({ type }) {
  const config = badgeConfig[type]
  if (!config) return null

  const Icon = config.icon

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full ${config.color}`}
    >
      <Icon size={10} />
      {config.label}
    </span>
  )
}
