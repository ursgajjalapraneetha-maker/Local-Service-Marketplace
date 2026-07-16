import { categoryRepository } from '../repositories/RepositoryFactory'
import { categoryCache } from '../utils/cache'
import { NotFoundError, RepositoryError } from '../utils/errors'

class CategoryService {
  async getAll({ forceRefresh = false } = {}) {
    if (!forceRefresh) {
      const cached = categoryCache.get('categories:all')
      if (cached) return cached
    }

    try {
      const categories = await categoryRepository.getAll()
      if (!Array.isArray(categories)) {
        throw new RepositoryError('Invalid response from repository')
      }
      categoryCache.set('categories:all', categories)
      return categories
    } catch (error) {
      if (error instanceof RepositoryError) throw error
      throw new RepositoryError('Failed to fetch categories', 'FETCH_ERROR')
    }
  }

  async getById(id) {
    const cacheKey = `categories:${id}`
    const cached = categoryCache.get(cacheKey)
    if (cached) return cached

    try {
      const category = await categoryRepository.getById(id)
      if (!category) throw new NotFoundError(`Category with id ${id} not found`)
      categoryCache.set(cacheKey, category)
      return category
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof RepositoryError) throw error
      throw new RepositoryError(`Failed to fetch category ${id}`)
    }
  }

  async getLocations() {
    try {
      const locations = await categoryRepository.getLocations()
      return Array.isArray(locations) ? locations : []
    } catch {
      throw new RepositoryError('Failed to fetch locations')
    }
  }

  invalidateCache() {
    categoryCache.invalidate('categories')
  }
}

export const categoryService = new CategoryService()
