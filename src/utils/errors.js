class AppError extends Error {
  constructor(message, code = 'UNKNOWN') {
    super(message)
    this.name = this.constructor.name
    this.code = code
  }
}

export class RepositoryError extends AppError {
  constructor(message, code = 'REPOSITORY_ERROR') {
    super(message, code)
  }
}

export class ValidationError extends AppError {
  constructor(message, code = 'VALIDATION_ERROR') {
    super(message, code)
  }
}

export class NetworkError extends AppError {
  constructor(message, code = 'NETWORK_ERROR') {
    super(message, code)
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found', code = 'NOT_FOUND') {
    super(message, code)
  }
}

export class TimeoutError extends AppError {
  constructor(message = 'Request timed out', code = 'TIMEOUT') {
    super(message, code)
  }
}
