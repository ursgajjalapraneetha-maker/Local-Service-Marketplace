import { request } from './api'

const providerService = {
  getProfile() {
    return request('/provider/profile')
  },

  updateProfile(data) {
    return request('/provider/profile', { method: 'PUT', body: data })
  },

  getStats() {
    return request('/provider/dashboard/stats')
  },

  getServices() {
    return request('/provider/services')
  },

  getService(id) {
    return request(`/provider/services/${id}`)
  },

  createService(data) {
    return request('/provider/services', { method: 'POST', body: data })
  },

  updateService(id, data) {
    return request(`/provider/services/${id}`, { method: 'PUT', body: data })
  },

  deleteService(id) {
    return request(`/provider/services/${id}`, { method: 'DELETE' })
  },
}

export default providerService
