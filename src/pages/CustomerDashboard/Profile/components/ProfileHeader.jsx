import { memo } from 'react'
import { User } from 'lucide-react'

function ProfileHeader({ title, description }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <User size={20} className="text-primary" aria-hidden="true" />
      </div>
      <div>
        <h1 className="text-xl lg:text-2xl font-heading font-bold text-secondary">{title}</h1>
        <p className="text-sm text-gray-500 mt-0.5">{description}</p>
      </div>
    </div>
  )
}

export default memo(ProfileHeader)
