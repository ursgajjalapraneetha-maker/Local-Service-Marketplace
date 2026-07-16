import { request } from './api'

const customerService = {
  getAll(params) {
    return request('/provider/customers', { params })
  },

  getById(id) {
    return request(`/provider/customers/${id}`)
  },

  getBookingHistory(id, params) {
    return request(`/provider/customers/${id}/bookings`, { params })
  },
}

export default customerService
