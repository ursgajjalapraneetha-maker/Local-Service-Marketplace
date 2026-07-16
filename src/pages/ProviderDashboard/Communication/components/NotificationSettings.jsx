import { memo, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Mail, Bell } from 'lucide-react'
import toast from 'react-hot-toast'
import { notificationSettings as initialSettings } from '../../data/messagesData'

const TOGGLE_LABELS = {
  booking: 'Booking Alerts',
  payment: 'Payment Alerts',
  message: 'Message Alerts',
  review: 'Review Alerts',
  system: 'System Updates',
}

function ToggleRow({ label, email, push, onChange }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
      <span className="text-sm font-medium text-secondary">{label}</span>
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={email}
            onChange={() => onChange('email', !email)}
            className="w-3.5 h-3.5 rounded border-gray-300 text-primary focus:ring-primary/30 focus:outline-none focus-visible:ring-2"
          />
          <span className="text-[10px] text-gray-400">Email</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={push}
            onChange={() => onChange('push', !push)}
            className="w-3.5 h-3.5 rounded border-gray-300 text-primary focus:ring-primary/30 focus:outline-none focus-visible:ring-2"
          />
          <span className="text-[10px] text-gray-400">Push</span>
        </label>
      </div>
    </div>
  )
}

function NotificationSettings({ onUpdate }) {
  const [settings, setSettings] = useState(() => ({
    email: { ...initialSettings.email },
    push: { ...initialSettings.push },
  }))

  const handleToggle = useCallback((channel, key, value) => {
    setSettings((prev) => {
      const next = { ...prev, [channel]: { ...prev[channel], [key]: value } }
      return next
    })
  }, [])

  const handleSave = useCallback(() => {
    onUpdate?.(settings)
    toast.success('Notification settings updated')
  }, [settings, onUpdate])

  const allTypes = Object.keys(TOGGLE_LABELS)

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Bell size={16} className="text-primary" aria-hidden="true" />
        <h2 className="text-base font-heading font-semibold text-secondary">Notification Settings</h2>
      </div>

      <div className="space-y-1">
        {allTypes.map((type) => (
          <ToggleRow
            key={type}
            label={TOGGLE_LABELS[type]}
            email={settings.email[type]}
            push={settings.push[type]}
            onChange={(channel, value) => handleToggle(channel, type, value)}
          />
        ))}
      </div>

      <button
        onClick={handleSave}
        className="mt-4 w-full py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
      >
        Save Settings
      </button>
    </div>
  )
}

export default memo(NotificationSettings)
