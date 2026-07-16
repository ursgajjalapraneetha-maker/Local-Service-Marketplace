const IS_DEV = import.meta.env.DEV

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
}

const currentLevel = IS_DEV ? LOG_LEVELS.DEBUG : LOG_LEVELS.ERROR

function formatMessage(level, message) {
  const timestamp = new Date().toISOString()
  return `[${timestamp}] [${level}] ${message}`
}

const logger = {
  debug(message, data) {
    if (currentLevel <= LOG_LEVELS.DEBUG) {
      console.debug(formatMessage('DEBUG', message), data || '')
    }
  },

  info(message, data) {
    if (currentLevel <= LOG_LEVELS.INFO) {
      console.info(formatMessage('INFO', message), data || '')
    }
  },

  warn(message, data) {
    if (currentLevel <= LOG_LEVELS.WARN) {
      console.warn(formatMessage('WARN', message), data || '')
    }
  },

  error(message, data) {
    if (currentLevel <= LOG_LEVELS.ERROR) {
      console.error(formatMessage('ERROR', message), data || '')
    }
  },
}

export default logger
