import { serviceRepository } from '../repositories/RepositoryFactory'
import { serviceCache } from '../utils/cache'
import { NotFoundError, RepositoryError } from '../utils/errors'

class ServiceService {
  async getAll({ forceRefresh = false } = {}) {
    if (!forceRefresh) {
      const cached = serviceCache.get('services:all')
      if (cached) return cached
    }

    try {
      const services = await serviceRepository.getAll()
      if (!Array.isArray(services)) {
        throw new RepositoryError('Invalid response from repository')
      }
      serviceCache.set('services:all', services)
      return services
    } catch (error) {
      if (error instanceof RepositoryError) throw error
      throw new RepositoryError('Failed to fetch services', 'FETCH_ERROR')
    }
  }

  async getById(id) {
    const cacheKey = `services:${id}`
    const cached = serviceCache.get(cacheKey)
    if (cached) return cached

    try {
      const service = await serviceRepository.getById(id)
      if (!service) throw new NotFoundError(`Service with id ${id} not found`)
      serviceCache.set(cacheKey, service)
      return service
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof RepositoryError) throw error
      throw new RepositoryError(`Failed to fetch service ${id}`)
    }
  }

  async getByCategory(category) {
    try {
      const services = await serviceRepository.getByCategory(category)
      return Array.isArray(services) ? services : []
    } catch {
      throw new RepositoryError(`Failed to fetch services for category ${category}`)
    }
  }

  invalidateCache() {
    serviceCache.invalidate('services')
  }
}

export const serviceService = new ServiceService()
