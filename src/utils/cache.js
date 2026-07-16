class MemoryCache {
  constructor(ttl = 300000) {
    this.cache = new Map()
    this.ttl = ttl
  }

  get(key) {
    const entry = this.cache.get(key)
    if (!entry) return null
    if (Date.now() > entry.expiry) {
      this.cache.delete(key)
      return null
    }
    return entry.data
  }

  set(key, data, ttl) {
    this.cache.set(key, {
      data,
      expiry: Date.now() + (ttl || this.ttl),
    })
  }

  remove(key) {
    this.cache.delete(key)
  }

  clear() {
    this.cache.clear()
  }

  invalidate(pattern) {
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) this.cache.delete(key)
    }
  }
}

export const serviceCache = new MemoryCache()
export const categoryCache = new MemoryCache()
export const providerCache = new MemoryCache()
