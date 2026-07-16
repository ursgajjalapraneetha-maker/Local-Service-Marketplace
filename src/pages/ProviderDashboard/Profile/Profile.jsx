import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  personalInfo,
  businessInfo,
  serviceArea,
  verification,
  bankDetails,
  stats,
} from '../data/providerProfileData'
import PageContainer from '../components/PageContainer'
import ProfileHeader from './components/ProfileHeader'
import ProfileCompletion from './components/ProfileCompletion'
import BusinessInformation from './components/BusinessInformation'
import ServiceArea from './components/ServiceArea'
import KYCVerification from './components/KYCVerification'
import BankDetails from './components/BankDetails'

const profileData = { personalInfo, businessInfo, serviceArea, verification, bankDetails }

export default function Profile() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <PageContainer title="My Profile" subtitle="Manage your provider identity and business information.">
        <div className="space-y-6" role="status" aria-label="Loading profile">
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse" />
            <div className="p-5 -mt-10">
              <div className="flex items-end gap-4">
                <div className="w-28 h-28 rounded-2xl bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse border-4 border-white" />
                <div className="flex-1 space-y-2 pb-2">
                  <div className="h-5 w-40 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded" />
                  <div className="h-3 w-56 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded" />
                </div>
              </div>
            </div>
          </div>
          <span className="sr-only">Loading profile...</span>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer title="My Profile" subtitle="Manage your provider identity and business information.">
      <div className="space-y-6">
        <ProfileHeader
          personalInfo={personalInfo}
          businessInfo={businessInfo}
          verification={verification}
          stats={stats}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-gray-100 p-5"
            >
              <BusinessInformation businessInfo={businessInfo} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white rounded-xl border border-gray-100 p-5"
            >
              <ServiceArea serviceArea={serviceArea} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl border border-gray-100 p-5"
            >
              <KYCVerification verification={verification} />
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white rounded-xl border border-gray-100 p-5"
            >
              <ProfileCompletion profile={profileData} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl border border-gray-100 p-5"
            >
              <BankDetails bankDetails={bankDetails} />
            </motion.div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
