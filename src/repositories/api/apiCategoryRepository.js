import api from '../../services/api'

export class ApiCategoryRepository {
  async getAll() {
    const response = await api.get('/categories')
    return response.data
  }

  async getById(id) {
    const response = await api.get(`/categories/${id}`)
    return response.data
  }

  async getLocations() {
    const response = await api.get('/locations')
    return response.data
  }
}
