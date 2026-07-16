import { memo, useState, useCallback, useMemo, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import DashboardContent from '../components/Common/DashboardContent'
import ProfileHeader from './components/ProfileHeader'
import ProfileAvatar from './components/ProfileAvatar'
import ProfileCard from './components/ProfileCard'
import EditProfileForm from './components/EditProfileForm'
import AccountInformation from './components/AccountInformation'
import AddressManager from './components/AddressManager'
import ChangePassword from './components/ChangePassword'
import NotificationSettings from './components/NotificationSettings'
import PrivacySettings from './components/PrivacySettings'
import AppearanceSettings from './components/AppearanceSettings'
import LogoutSection from './components/LogoutSection'
import DeleteAccountCard from './components/DeleteAccountCard'
import ProfileSkeleton from './components/ProfileSkeleton'
import {
  DEFAULT_PROFILE,
  DEFAULT_ADDRESSES,
  DEFAULT_PREFERENCES,
} from './components/profileData'

const STORAGE_KEY = 'profile_data'

const TABS = [
  { key: 'profile', label: 'Profile' },
  { key: 'addresses', label: 'Addresses' },
  { key: 'password', label: 'Password' },
  { key: 'notifications', label: 'Notifications' },
  { key: 'privacy', label: 'Privacy' },
  { key: 'appearance', label: 'Appearance' },
  { key: 'account', label: 'Account' },
]

function loadFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  return null
}

function Profile({ defaultTab }) {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(defaultTab || 'profile')
  const [editing, setEditing] = useState(false)
  const [profile, setProfile] = useState(() => loadFromStorage()?.profile || DEFAULT_PROFILE)
  const [addresses, setAddresses] = useState(() => loadFromStorage()?.addresses || DEFAULT_ADDRESSES)
  const [preferences, setPreferences] = useState(() => {
    const saved = loadFromStorage()
    return saved?.preferences || DEFAULT_PREFERENCES
  })

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ profile, addresses, preferences }))
  }, [profile, addresses, preferences])

  const handleProfileSave = useCallback((data) => {
    setProfile((prev) => ({ ...prev, ...data }))
    setEditing(false)
  }, [])

  const handleAvatarChange = useCallback((avatar) => {
    setProfile((prev) => ({ ...prev, avatar }))
  }, [])

  const handleAddressesChange = useCallback((updated) => {
    setAddresses(updated)
  }, [])

  const handleNotificationToggle = useCallback((group, key) => {
    setPreferences((prev) => ({
      ...prev,
      [group]: { ...prev[group], [key]: !prev[group]?.[key] },
    }))
  }, [])

  const handlePrivacyToggle = useCallback((key) => {
    setPreferences((prev) => ({
      ...prev,
      privacy: { ...prev.privacy, [key]: !prev.privacy?.[key] },
    }))
  }, [])

  const handleAppearanceChange = useCallback((key, value) => {
    setPreferences((prev) => ({
      ...prev,
      appearance: { ...prev.appearance, [key]: value },
    }))
  }, [])

  const tabContent = useMemo(() => {
    if (loading) return <ProfileSkeleton />

    switch (activeTab) {
      case 'profile':
        return (
          <>
            <div className="flex items-center gap-4 mb-6">
              <ProfileAvatar
                avatar={profile.avatar}
                name={profile.name}
                onAvatarChange={handleAvatarChange}
              />
              <div>
                <h2 className="text-lg font-heading font-bold text-secondary">{profile.name}</h2>
                <p className="text-sm text-gray-500">{profile.email}</p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {editing ? (
                <EditProfileForm
                  key="edit"
                  profile={profile}
                  onSave={handleProfileSave}
                  onCancel={() => setEditing(false)}
                />
              ) : (
                <ProfileCard
                  key="view"
                  profile={profile}
                  onEdit={() => setEditing(true)}
                />
              )}
            </AnimatePresence>

            <AccountInformation profile={profile} />
          </>
        )
      case 'addresses':
        return (
          <AddressManager
            addresses={addresses}
            onAddressesChange={handleAddressesChange}
          />
        )
      case 'password':
        return <ChangePassword />
      case 'notifications':
        return (
          <NotificationSettings
            preferences={preferences}
            onPreferenceChange={handleNotificationToggle}
          />
        )
      case 'privacy':
        return (
          <PrivacySettings
            preferences={preferences?.privacy}
            onPrivacyChange={handlePrivacyToggle}
          />
        )
      case 'appearance':
        return (
          <AppearanceSettings
            preferences={preferences?.appearance}
            onPreferenceChange={handleAppearanceChange}
          />
        )
      case 'account':
        return (
          <div className="space-y-6">
            <LogoutSection />
            <DeleteAccountCard />
          </div>
        )
      default:
        return null
    }
  }, [
    loading,
    activeTab,
    profile,
    editing,
    addresses,
    preferences,
    handleProfileSave,
    handleAvatarChange,
    handleAddressesChange,
    handleNotificationToggle,
    handlePrivacyToggle,
    handleAppearanceChange,
  ])

  return (
    <DashboardContent>
      <div className="space-y-6">
        <ProfileHeader title="Profile & Settings" description="Manage your account, preferences, and personal information" />

        <div className="flex gap-1 overflow-x-auto pb-1 -mx-1 px-1">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => { setActiveTab(key); setEditing(false) }}
              className={`whitespace-nowrap px-3.5 py-2 text-xs font-semibold rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
                activeTab === key
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-500 bg-white border border-gray-100 hover:bg-gray-50 hover:text-secondary'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tabContent}
      </div>
    </DashboardContent>
  )
}

export default memo(Profile)
