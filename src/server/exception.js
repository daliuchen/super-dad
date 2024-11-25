
class BaseError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BaseError';
    }
}

class BadRequestError extends BaseError {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
  }
}

class UnauthorizedError extends BaseError {
    constructor(message) {
        super(message);
        this.name = 'UnauthorizedError';
    }
}

class ForbiddenError extends BaseError {
    constructor(message) {
        super(message);
        this.name = 'ForbiddenError';
    }
}

class NotFoundError extends BaseError {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
}

export {
    BaseError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError
}
