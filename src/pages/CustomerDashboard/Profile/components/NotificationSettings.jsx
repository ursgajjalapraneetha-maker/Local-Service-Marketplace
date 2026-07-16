import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Bell, Mail, Smartphone } from 'lucide-react'

const NOTIFICATION_GROUPS = [
  {
    key: 'email',
    label: 'Email Notifications',
    icon: Mail,
    items: [
      { key: 'marketing', label: 'Marketing & Promotions', description: 'Receive marketing emails' },
      { key: 'reminders', label: 'Booking Reminders', description: 'Get reminded about upcoming bookings' },
      { key: 'updates', label: 'Service Updates', description: 'Stay informed about service changes' },
      { key: 'newsletter', label: 'Newsletter', description: 'Receive our monthly newsletter' },
    ],
  },
  {
    key: 'push',
    label: 'Push Notifications',
    icon: Smartphone,
    items: [
      { key: 'messages', label: 'New Messages', description: 'Get notified when you receive a message' },
      { key: 'bookings', label: 'Booking Updates', description: 'Updates on your booking status' },
      { key: 'promotions', label: 'Promotional Offers', description: 'Special deals and offers' },
      { key: 'reminders', label: 'Reminders', description: 'Appointment and task reminders' },
    ],
  },
]

function ToggleSwitch({ checked, onChange, id }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      id={id}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
        checked ? 'bg-primary' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transform transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

function NotificationSettings({ preferences, onPreferenceChange }) {
  const handleToggle = useCallback(
    (group, key) => {
      onPreferenceChange(group, key)
    },
    [onPreferenceChange],
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-100 p-6"
    >
      <div className="flex items-center gap-2 mb-5">
        <Bell size={18} className="text-primary" aria-hidden="true" />
        <h2 className="text-base font-heading font-semibold text-secondary">Notification Preferences</h2>
      </div>

      <div className="space-y-6">
        {NOTIFICATION_GROUPS.map(({ key: groupKey, label, icon: Icon, items }) => (
          <div key={groupKey}>
            <div className="flex items-center gap-2 mb-3">
              <Icon size={16} className="text-gray-400" aria-hidden="true" />
              <h3 className="text-sm font-semibold text-secondary">{label}</h3>
            </div>
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-secondary">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                  <ToggleSwitch
                    checked={preferences?.[groupKey]?.[item.key] ?? false}
                    onChange={() => handleToggle(groupKey, item.key)}
                    id={`${groupKey}-${item.key}`}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default memo(NotificationSettings)
