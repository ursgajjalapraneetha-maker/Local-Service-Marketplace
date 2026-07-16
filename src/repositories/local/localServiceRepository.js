import { popularServices } from '../../pages/Services/data/services'

const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms))

export class LocalServiceRepository {
  async getAll() {
    await delay()
    return [...popularServices]
  }

  async getById(id) {
    await delay()
    const service = popularServices.find((s) => s.id === id)
    if (!service) return null
    return { ...service }
  }

  async getByCategory(category) {
    await delay()
    return popularServices.filter((s) => s.category === category)
  }

  async getByProvider(providerName) {
    await delay()
    return popularServices.filter(
      (s) => s.provider.toLowerCase() === providerName.toLowerCase()
    )
  }
}
