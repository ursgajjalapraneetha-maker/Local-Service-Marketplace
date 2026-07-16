import { request } from './api'

const profileService = {
  getProfile() {
    return request('/provider/profile')
  },

  updateProfile(data) {
    return request('/provider/profile', { method: 'PUT', body: data })
  },

  updateBusinessInfo(data) {
    return request('/provider/business', { method: 'PUT', body: data })
  },

  updateServiceArea(data) {
    return request('/provider/service-area', { method: 'PUT', body: data })
  },

  uploadDocument(formData) {
    return request('/provider/verification/documents', {
      method: 'POST',
      body: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  getVerificationStatus() {
    return request('/provider/verification/status')
  },

  updateBankDetails(data) {
    return request('/provider/bank-details', { method: 'PUT', body: data })
  },

  changePassword(data) {
    return request('/provider/password', { method: 'PUT', body: data })
  },

  updatePreferences(data) {
    return request('/provider/preferences', { method: 'PUT', body: data })
  },

  deactivateAccount() {
    return request('/provider/account/deactivate', { method: 'POST' })
  },

  deleteAccount() {
    return request('/provider/account/delete', { method: 'DELETE' })
  },
}

export default profileService
