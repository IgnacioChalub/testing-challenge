import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiError extends HttpException {
  constructor(public readonly code: number, public readonly message: string) {
    super(message, code);
  }
}

export class InvalidModelError extends ApiError {
  constructor(model: string) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, `Invalid Model Error: model ${model} is invalid`);
  }
}

export class ValidationError extends ApiError {
  constructor(model: string, field: string, message: string) {
    super(HttpStatus.BAD_REQUEST, `Validation Error: model ${model} field ${field} ${message}`);
  }
}

export class NotFoundError extends ApiError {
  constructor(model: string) {
    super(HttpStatus.NOT_FOUND, `Not Found Error: ${model} not found`);
  }
}

export class NotAuthorizedError extends ApiError {
  constructor() {
    super(HttpStatus.NOT_FOUND, `User not authorized`);
  }
}

export class FollowersLimitError extends ApiError {
  constructor() {
    super(HttpStatus.BAD_REQUEST, `User already reached max followers`);
  }
}

export class InvalidPostError extends ApiError {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}

export class ResourceAlreadyExistsError extends ApiError {
  constructor(model: string) {
    super(HttpStatus.CONFLICT, `${model} already exists`);
  }
}