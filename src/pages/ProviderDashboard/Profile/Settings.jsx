import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  security as securityData,
  preferences as preferencesData,
} from '../data/providerProfileData'
import PageContainer from '../components/PageContainer'
import SecuritySettings from './components/SecuritySettings'
import PasswordChange from './components/PasswordChange'
import PreferenceSettings from './components/PreferenceSettings'
import AccountActions from './components/AccountActions'

export default function Settings() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <PageContainer title="Settings" subtitle="Manage your account security, preferences and more.">
        <div className="space-y-6" role="status" aria-label="Loading settings">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-48 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-xl" />
            ))}
          </div>
          <span className="sr-only">Loading settings...</span>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer title="Settings" subtitle="Manage your account security, preferences and more.">
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-100 p-5"
          >
            <SecuritySettings security={securityData} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white rounded-xl border border-gray-100 p-5"
          >
            <PasswordChange />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-gray-100 p-5"
        >
          <PreferenceSettings preferences={preferencesData} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-xl border border-gray-100 p-5"
        >
          <AccountActions />
        </motion.div>
      </div>
    </PageContainer>
  )
}
