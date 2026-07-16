import { memo, useCallback, useRef } from 'react'
import { Camera } from 'lucide-react'
import toast from 'react-hot-toast'

function ProfileAvatar({ avatar, name, onAvatarChange }) {
  const inputRef = useRef(null)

  const handleClick = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be under 2MB')
      return
    }
    const reader = new FileReader()
    reader.onload = (event) => {
      onAvatarChange?.(event.target.result)
      toast.success('Profile picture updated')
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }, [onAvatarChange])

  const initials = name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="relative group">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden ring-2 ring-primary/20">
        {avatar ? (
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-xl font-heading font-bold text-primary">{initials || '?'}</span>
        )}
      </div>
      <button
        onClick={handleClick}
        className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none"
        aria-label="Change profile picture"
      >
        <Camera size={18} className="text-white" />
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
      />
    </div>
  )
}

export default memo(ProfileAvatar)
