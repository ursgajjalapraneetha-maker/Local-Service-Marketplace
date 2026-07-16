import { request } from './api'

const scheduleService = {
  getCalendar(params) {
    return request('/provider/schedule/calendar', { params })
  },

  getAvailability() {
    return request('/provider/availability')
  },

  updateAvailability(data) {
    return request('/provider/availability', { method: 'PUT', body: data })
  },

  getWorkingHours() {
    return request('/provider/working-hours')
  },

  updateWorkingHours(data) {
    return request('/provider/working-hours', { method: 'PUT', body: data })
  },

  getTimeSlots() {
    return request('/provider/time-slots')
  },

  updateTimeSlots(data) {
    return request('/provider/time-slots', { method: 'PUT', body: data })
  },

  getHolidays() {
    return request('/provider/holidays')
  },

  addHoliday(data) {
    return request('/provider/holidays', { method: 'POST', body: data })
  },

  removeHoliday(id) {
    return request(`/provider/holidays/${id}`, { method: 'DELETE' })
  },

  getLeaves() {
    return request('/provider/leaves')
  },

  addLeave(data) {
    return request('/provider/leaves', { method: 'POST', body: data })
  },
}

export default scheduleService
