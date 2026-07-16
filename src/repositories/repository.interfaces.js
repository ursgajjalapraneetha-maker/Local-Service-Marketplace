export class ServiceRepository {
  async getAll() { throw new Error('Method not implemented') }
  async getById(id) { throw new Error('Method not implemented') }
  async getByCategory(category) { throw new Error('Method not implemented') }
  async getByProvider(providerId) { throw new Error('Method not implemented') }
}

export class CategoryRepository {
  async getAll() { throw new Error('Method not implemented') }
  async getById(id) { throw new Error('Method not implemented') }
}

export class ProviderRepository {
  async getAll() { throw new Error('Method not implemented') }
  async getById(id) { throw new Error('Method not implemented') }
  async getByServiceCategory(category) { throw new Error('Method not implemented') }
}
