import { request } from './api'

const bookingService = {
  getAll(params) {
    return request('/provider/bookings', { params })
  },

  getById(id) {
    return request(`/provider/bookings/${id}`)
  },

  updateStatus(id, status, data = {}) {
    return request(`/provider/bookings/${id}/status`, { method: 'PATCH', body: { status, ...data } })
  },

  accept(id) {
    return this.updateStatus(id, 'accepted')
  },

  reject(id, reason) {
    return this.updateStatus(id, 'rejected', { reason })
  },

  start(id) {
    return this.updateStatus(id, 'in-progress')
  },

  complete(id) {
    return this.updateStatus(id, 'completed')
  },

  cancel(id, reason) {
    return this.updateStatus(id, 'cancelled', { reason })
  },
}

export default bookingService
