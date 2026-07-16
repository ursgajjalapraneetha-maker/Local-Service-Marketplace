import { useState } from 'react'
import { Settings as SettingsIcon, Globe, Mail, Shield, User, Save } from 'lucide-react'
import GeneralSettings from './components/settings/GeneralSettings'
import PlatformSettings from './components/settings/PlatformSettings'
import EmailSettings from './components/settings/EmailSettings'
import SecuritySettings from './components/settings/SecuritySettings'
import ProfileSettings from './components/settings/ProfileSettings'

const TABS = [
  { id: 'general', label: 'General', icon: SettingsIcon, component: GeneralSettings },
  { id: 'platform', label: 'Platform', icon: Globe, component: PlatformSettings },
  { id: 'email', label: 'Email', icon: Mail, component: EmailSettings },
  { id: 'security', label: 'Security', icon: Shield, component: SecuritySettings },
  { id: 'profile', label: 'Profile', icon: User, component: ProfileSettings },
]

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general')
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      // Since there's no backend, simulate successful save
      alert('Settings saved successfully!')
    }, 800)
  }

  const ActiveComponent = TABS.find(t => t.id === activeTab)?.component

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 mt-1">Manage your platform preferences and configurations.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <Save size={20} />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 shrink-0 bg-white rounded-xl border border-gray-100 p-2 shadow-sm h-fit">
          <nav className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-1 scrollbar-hide">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap
                  ${activeTab === tab.id 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                <tab.icon size={18} className={activeTab === tab.id ? 'text-primary' : 'text-gray-400'} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-6 lg:p-8 min-h-[500px]">
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </div>
  )
}
