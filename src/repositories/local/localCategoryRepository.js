import { serviceCategories, locations } from '../../pages/Services/data/services'

const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms))

export class LocalCategoryRepository {
  async getAll() {
    await delay()
    return [...serviceCategories]
  }

  async getById(id) {
    await delay()
    const category = serviceCategories.find((c) => c.id === id)
    if (!category) return null
    return { ...category }
  }

  async getLocations() {
    await delay()
    return [...locations]
  }
}
