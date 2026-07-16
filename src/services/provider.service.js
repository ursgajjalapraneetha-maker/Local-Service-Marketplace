import { providerRepository } from '../repositories/RepositoryFactory'
import { providerCache } from '../utils/cache'
import { NotFoundError, RepositoryError } from '../utils/errors'

class ProviderService {
  async getAll({ forceRefresh = false } = {}) {
    if (!forceRefresh) {
      const cached = providerCache.get('providers:all')
      if (cached) return cached
    }

    try {
      const providers = await providerRepository.getAll()
      if (!Array.isArray(providers)) {
        throw new RepositoryError('Invalid response from repository')
      }
      providerCache.set('providers:all', providers)
      return providers
    } catch (error) {
      if (error instanceof RepositoryError) throw error
      throw new RepositoryError('Failed to fetch providers', 'FETCH_ERROR')
    }
  }

  async getById(id) {
    const cacheKey = `providers:${id}`
    const cached = providerCache.get(cacheKey)
    if (cached) return cached

    try {
      const provider = await providerRepository.getById(id)
      if (!provider) throw new NotFoundError(`Provider with id ${id} not found`)
      providerCache.set(cacheKey, provider)
      return provider
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof RepositoryError) throw error
      throw new RepositoryError(`Failed to fetch provider ${id}`)
    }
  }

  async getByServiceCategory(category) {
    try {
      const providers = await providerRepository.getByServiceCategory(category)
      return Array.isArray(providers) ? providers : []
    } catch {
      throw new RepositoryError(`Failed to fetch providers for category ${category}`)
    }
  }

  invalidateCache() {
    providerCache.invalidate('providers')
  }
}

export const providerService = new ProviderService()
