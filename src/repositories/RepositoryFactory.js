import { DATA_SOURCE, DATA_SOURCES } from '../config/repository.config'
import { LocalServiceRepository } from './local/localServiceRepository'
import { LocalCategoryRepository } from './local/localCategoryRepository'
import { LocalProviderRepository } from './local/localProviderRepository'
import { ApiServiceRepository } from './api/apiServiceRepository'
import { ApiCategoryRepository } from './api/apiCategoryRepository'
import { ApiProviderRepository } from './api/apiProviderRepository'

class RepositoryFactory {
  static createServiceRepository() {
    return DATA_SOURCE === DATA_SOURCES.API
      ? new ApiServiceRepository()
      : new LocalServiceRepository()
  }

  static createCategoryRepository() {
    return DATA_SOURCE === DATA_SOURCES.API
      ? new ApiCategoryRepository()
      : new LocalCategoryRepository()
  }

  static createProviderRepository() {
    return DATA_SOURCE === DATA_SOURCES.API
      ? new ApiProviderRepository()
      : new LocalProviderRepository()
  }
}

export const serviceRepository = RepositoryFactory.createServiceRepository()
export const categoryRepository = RepositoryFactory.createCategoryRepository()
export const providerRepository = RepositoryFactory.createProviderRepository()
