export const DATA_SOURCES = {
  LOCAL: 'LOCAL',
  API: 'API',
}

export const DATA_SOURCE = import.meta.env.VITE_DATA_SOURCE || DATA_SOURCES.LOCAL
