import { memo, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Building2, Globe, Users, FileText } from 'lucide-react'
import toast from 'react-hot-toast'

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
        <Icon size={14} className="text-gray-500" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-medium text-secondary">{value || 'Not provided'}</p>
      </div>
    </div>
  )
}

function BusinessInformation({ businessInfo, onUpdate }) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ ...businessInfo })

  const handleSave = useCallback(() => {
    onUpdate?.(form)
    setEditing(false)
    toast.success('Business information updated')
  }, [form, onUpdate])

  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Building2 size={16} className="text-primary" aria-hidden="true" />
            <h2 className="text-base font-heading font-semibold text-secondary">Business Information</h2>
          </div>
          <button onClick={() => setEditing(false)} className="text-xs text-gray-500 hover:text-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded px-1">Cancel</button>
        </div>
        <div className="space-y-3">
          {[
            { label: 'Business Name', name: 'businessName', required: true },
            { label: 'Category', name: 'category' },
            { label: 'Registration Number', name: 'registrationNumber' },
            { label: 'Years in Business', name: 'yearsInBusiness', type: 'number' },
            { label: 'Team Size', name: 'teamSize', type: 'number' },
            { label: 'Website', name: 'website', type: 'url' },
          ].map(({ label, name, type, required }) => (
            <div key={name}>
              <label className="block text-xs text-gray-500 mb-0.5">{label}</label>
              <input
                type={type || 'text'}
                value={form[name] || ''}
                onChange={(e) => setForm((p) => ({ ...p, [name]: e.target.value }))}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              />
            </div>
          ))}
          <div>
            <label className="block text-xs text-gray-500 mb-0.5">Description</label>
            <textarea
              value={form.description || ''}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              rows={3}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            />
          </div>
          <button onClick={handleSave} className="w-full py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30">Save</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Building2 size={16} className="text-primary" aria-hidden="true" />
          <h2 className="text-base font-heading font-semibold text-secondary">Business Information</h2>
        </div>
        <button onClick={() => setEditing(true)} className="text-xs font-medium text-primary hover:text-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded px-1">Edit</button>
      </div>
      <InfoRow icon={Building2} label="Business Name" value={businessInfo?.businessName} />
      <InfoRow icon={FileText} label="Category" value={businessInfo?.category} />
      <InfoRow icon={FileText} label="Registration No." value={businessInfo?.registrationNumber} />
      <InfoRow icon={Users} label="Team Size" value={businessInfo?.teamSize?.toString()} />
      <InfoRow icon={Globe} label="Website" value={businessInfo?.website} />
    </div>
  )
}

export default memo(BusinessInformation)
