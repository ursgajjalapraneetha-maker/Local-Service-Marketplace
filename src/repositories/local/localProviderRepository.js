import { popularServices } from '../../pages/Services/data/services'

const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms))

function deriveProviders() {
  const seen = new Map()
  for (const s of popularServices) {
    if (!seen.has(s.provider)) {
      seen.set(s.provider, {
        id: s.id,
        name: s.provider,
        category: s.category,
        city: s.city,
        experience: s.experience,
        rating: s.rating,
        reviews: s.reviews,
        completedJobs: Math.round(s.reviews * 1.8),
        verified: s.providerType?.includes('Verified') ?? false,
        topRated: s.providerType?.includes('Top Rated') ?? false,
        instantBooking: s.providerType?.includes('Instant Booking') ?? false,
        image: `https://ui-avatars.com/api/?name=${encodeURIComponent(s.provider)}&background=2563EB&color=fff`,
      })
    }
  }
  return Array.from(seen.values())
}

const providers = deriveProviders()

export class LocalProviderRepository {
  async getAll() {
    await delay()
    return [...providers]
  }

  async getById(id) {
    await delay()
    const provider = providers.find((p) => p.id === id)
    if (!provider) return null
    return { ...provider }
  }

  async getByServiceCategory(category) {
    await delay()
    return providers.filter((p) => p.category === category)
  }
}
