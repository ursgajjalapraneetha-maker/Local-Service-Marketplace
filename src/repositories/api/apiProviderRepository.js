import api from '../../services/api'

export class ApiProviderRepository {
  async getAll() {
    const response = await api.get('/providers')
    return response.data
  }

  async getById(id) {
    const response = await api.get(`/providers/${id}`)
    return response.data
  }

  async getByServiceCategory(category) {
    const response = await api.get('/providers', { params: { category } })
    return response.data
  }
}
