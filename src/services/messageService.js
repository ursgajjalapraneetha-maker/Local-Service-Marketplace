import { request } from './api'

const messageService = {
  getConversations() {
    return request('/provider/conversations')
  },

  getMessages(conversationId, params) {
    return request(`/provider/messages/${conversationId}`, { params })
  },

  sendMessage(conversationId, data) {
    return request(`/provider/messages/${conversationId}`, { method: 'POST', body: data })
  },

  markAsRead(conversationId) {
    return request(`/provider/conversations/${conversationId}/read`, { method: 'PATCH' })
  },

  getNotifications(params) {
    return request('/provider/notifications', { params })
  },

  markNotificationRead(id) {
    return request(`/provider/notifications/${id}/read`, { method: 'PATCH' })
  },

  markAllNotificationsRead() {
    return request('/provider/notifications/read-all', { method: 'PATCH' })
  },

  getNotificationSettings() {
    return request('/provider/notification-settings')
  },

  updateNotificationSettings(data) {
    return request('/provider/notification-settings', { method: 'PUT', body: data })
  },
}

export default messageService
