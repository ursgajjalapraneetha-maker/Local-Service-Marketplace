import { memo, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Bell, Globe, Palette, Mail, Smartphone, MessageSquare } from 'lucide-react'
import toast from 'react-hot-toast'

const LANGUAGES = ['English', 'Hindi', 'Kannada', 'Tamil', 'Telugu']
const THEMES = [
  { key: 'system', label: 'System', desc: 'Follow device theme' },
  { key: 'light', label: 'Light', desc: 'Always light mode' },
  { key: 'dark', label: 'Dark', desc: 'Always dark mode' },
]

function ToggleRow({ icon: Icon, label, desc, checked, onChange }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
      <div className="flex items-center gap-2.5 min-w-0">
        <Icon size={15} className="text-gray-400 shrink-0" aria-hidden="true" />
        <div className="min-w-0">
          <p className="text-sm font-medium text-secondary">{label}</p>
          {desc && <p className="text-[10px] text-gray-400">{desc}</p>}
        </div>
      </div>
      <button
        onClick={onChange}
        className={`relative w-10 h-5 rounded-full transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${checked ? 'bg-primary' : 'bg-gray-300'}`}
        role="switch"
        aria-checked={checked}
        aria-label={label}
      >
        <motion.span
          animate={{ x: checked ? 20 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"
        />
      </button>
    </div>
  )
}

function PreferenceSettings({ preferences, onUpdate }) {
  const [form, setForm] = useState({ ...preferences })
  const [saving, setSaving] = useState(false)

  const handleToggle = useCallback((key) => {
    setForm((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const handleSave = useCallback(() => {
    setSaving(true)
    setTimeout(() => {
      onUpdate?.(form)
      setSaving(false)
      toast.success('Preferences updated')
    }, 400)
  }, [form, onUpdate])

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Bell size={16} className="text-primary" aria-hidden="true" />
        <h2 className="text-base font-heading font-semibold text-secondary">Preferences</h2>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Globe size={14} className="text-gray-400" aria-hidden="true" />
          <span className="text-xs font-medium text-gray-500">Language</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => setForm((prev) => ({ ...prev, language: lang }))}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
                form.language === lang
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-gray-100 text-gray-500 hover:border-gray-200'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Palette size={14} className="text-gray-400" aria-hidden="true" />
          <span className="text-xs font-medium text-gray-500">Theme</span>
        </div>
        <div className="flex gap-1.5">
          {THEMES.map((t) => (
            <button
              key={t.key}
              onClick={() => setForm((prev) => ({ ...prev, theme: t.key }))}
              className={`flex-1 px-3 py-2 text-xs font-semibold rounded-lg border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
                form.theme === t.key
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-gray-100 text-gray-500 hover:border-gray-200'
              }`}
            >
              {t.label}
              <span className="block text-[9px] font-normal text-gray-400 mt-0.5">{t.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Notifications</div>
      <ToggleRow icon={Mail} label="Email Notifications" desc="Receive updates via email" checked={form.emailNotifications} onChange={() => handleToggle('emailNotifications')} />
      <ToggleRow icon={Smartphone} label="Push Notifications" desc="Receive push notifications" checked={form.pushNotifications} onChange={() => handleToggle('pushNotifications')} />
      <ToggleRow icon={MessageSquare} label="SMS Notifications" desc="Receive SMS alerts" checked={form.smsNotifications} onChange={() => handleToggle('smsNotifications')} />

      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-3 mb-1">Alerts</div>
      <ToggleRow icon={Bell} label="Booking Reminders" desc="Get reminded about upcoming bookings" checked={form.bookingReminders} onChange={() => handleToggle('bookingReminders')} />
      <ToggleRow icon={Bell} label="Payment Alerts" desc="Get notified about payments" checked={form.paymentAlerts} onChange={() => handleToggle('paymentAlerts')} />
      <ToggleRow icon={Mail} label="Weekly Digest" desc="Receive weekly summary" checked={form.weeklyDigest} onChange={() => handleToggle('weeklyDigest')} />
      <ToggleRow icon={Mail} label="Marketing Emails" desc="Receive offers and promotions" checked={form.marketingEmails} onChange={() => handleToggle('marketingEmails')} />

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-4 w-full py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
      >
        {saving ? 'Saving...' : 'Save Preferences'}
      </button>
    </div>
  )
}

export default memo(PreferenceSettings)
