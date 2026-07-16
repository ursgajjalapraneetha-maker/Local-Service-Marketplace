const PREFIX = 'ls_'

export const KEYS = {
  WISHLIST: `${PREFIX}wishlist`,
  COMPARE: `${PREFIX}compare`,
  RECENTLY_VIEWED: `${PREFIX}recently_viewed`,
  VIEW_MODE: `${PREFIX}grid_view`,
  PAGE_SIZE: `${PREFIX}page_size`,
  NAV_MODE: `${PREFIX}nav_mode`,
}

export function get(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key)
    if (item === null) return defaultValue
    return JSON.parse(item)
  } catch {
    return defaultValue
  }
}

export function set(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

export function remove(key) {
  try {
    localStorage.removeItem(key)
  } catch {}
}
