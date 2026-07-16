const DEFAULT_MAX_RETRIES = 3
const BASE_DELAY_MS = 1000

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function withRetry(fn, { maxRetries = DEFAULT_MAX_RETRIES, baseDelay = BASE_DELAY_MS, onRetry } = {}) {
  let lastError

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      if (attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt)
        const jitter = Math.random() * 200
        if (onRetry) onRetry(attempt + 1, maxRetries, delay)
        await sleep(delay + jitter)
      }
    }
  }

  throw lastError
}

export function createRetryable(fn, defaultOptions = {}) {
  return (...args) => withRetry(() => fn(...args), defaultOptions)
}
