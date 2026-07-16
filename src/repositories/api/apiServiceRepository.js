import api from '../../services/api'

export class ApiServiceRepository {
  async getAll() {
    const response = await api.get('/services')
    return response.data
  }

  async getById(id) {
    const response = await api.get(`/services/${id}`)
    return response.data
  }

  async getByCategory(category) {
    const response = await api.get('/services', { params: { category } })
    return response.data
  }

  async getByProvider(providerName) {
    const response = await api.get('/services', { params: { provider: providerName } })
    return response.data
  }
}
