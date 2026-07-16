const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const TOKEN_KEY = 'auth_token'

function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

async function request(endpoint, options = {}) {
  const { method = 'GET', body, params, headers: customHeaders } = options

  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders,
  }

  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`

  let url = `${API_BASE_URL}${endpoint}`
  if (params) {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
    ).toString()
    if (qs) url += `?${qs}`
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }))
      throw new ApiError(error.message || 'Request failed', response.status, error)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof ApiError) throw error
    throw new ApiError('Network error. Please check your connection.', 0)
  }
}

class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

export { request, ApiError, API_BASE_URL }
export default { request, ApiError }
