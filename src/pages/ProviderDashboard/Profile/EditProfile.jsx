import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import { personalInfo } from '../data/providerProfileData'
import ProfileForm from './components/ProfileForm'

const FIELDS = [
  { name: 'fullName', label: 'Full Name', type: 'text', required: true },
  { name: 'email', label: 'Email Address', type: 'email', required: true },
  { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
  { name: 'address', label: 'Address', type: 'text', required: true, fullWidth: true },
  { name: 'bio', label: 'Bio', type: 'text', multiline: true, fullWidth: true },
  { name: 'experience', label: 'Years of Experience', type: 'number' },
  { name: 'skills', label: 'Skills (comma separated)', type: 'text', fullWidth: true },
  { name: 'languages', label: 'Languages (comma separated)', type: 'text', fullWidth: true },
]

export default function EditProfile() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  const initialValues = {
    fullName: personalInfo.fullName,
    email: personalInfo.email,
    phone: personalInfo.phone,
    address: personalInfo.address,
    bio: personalInfo.bio,
    experience: personalInfo.experience,
    skills: personalInfo.skills.join(', '),
    languages: personalInfo.languages.join(', '),
  }

  const handleSave = useCallback((values) => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      toast.success('Profile updated successfully')
      navigate('/provider-dashboard/profile')
    }, 800)
  }, [navigate])

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
        <div className="h-5 w-32 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded" />
        <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-12 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-lg" />
          ))}
        </div>
        <span className="sr-only">Loading edit form...</span>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <button
        onClick={() => navigate('/provider-dashboard/profile')}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded"
      >
        <ArrowLeft size={16} />
        Back to Profile
      </button>

      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <ProfileForm
          fields={FIELDS}
          initialValues={initialValues}
          onSave={handleSave}
          loading={saving}
        />
      </div>
    </motion.div>
  )
}
