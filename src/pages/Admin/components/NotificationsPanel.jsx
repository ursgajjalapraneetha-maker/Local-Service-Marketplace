import { Bell } from 'lucide-react'

const DUMMY_NOTIFICATIONS = [
  { id: 1, text: 'System maintenance scheduled for tonight at 2 AM.', time: '2 hours ago' },
  { id: 2, text: 'New admin account created: Manager1.', time: 'Yesterday' },
  { id: 3, text: 'Monthly revenue report is ready to download.', time: 'Yesterday' },
]

export default function NotificationsPanel() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="p-5 border-b border-gray-100 flex items-center gap-2">
        <Bell size={20} className="text-primary" />
        <h3 className="font-semibold text-gray-900">Notifications</h3>
      </div>
      <div className="p-5 space-y-4">
        {DUMMY_NOTIFICATIONS.map((note) => (
          <div key={note.id} className="pb-3 border-b border-gray-50 last:border-0 last:pb-0">
            <p className="text-sm text-gray-800">{note.text}</p>
            <p className="text-xs text-gray-500 mt-1">{note.time}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
