import { ValidationError } from "class-validator";

export function extractErrors(errors: ValidationError[]): string[] {
  const errorMessages: string[] = [];

  for (const error of errors) {
    if (error.constraints) {
      errorMessages.push(...Object.values(error.constraints));
    }
    if (error.children && error.children.length > 0) {
      errorMessages.push(...extractErrors(error.children));
    }
  }

  return errorMessages;
}

export class BaseError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
export class WrongPasswordError extends BaseError {
  constructor() {
    super("Client error - wrong password", 403);
  }
}
export class FaceNotRecognizedError extends BaseError {
  constructor() {
    super("Client error - Face not recognized", 403);
  }
}

export class UserExistsError extends BaseError {
  constructor() {
    super("User already exists", 403);
  }
}
export class UserNotFoundError extends BaseError {
  constructor() {
    super("User not found", 404);
  }
}
export class GoodsExistsError extends BaseError {
  constructor() {
    super("Goods already exists", 403);
  }
}
export class OrderNotFoundError extends BaseError {
  constructor() {
    super("Order not found", 404);
  }
}
export class GoodsNotFoundError extends BaseError {
  constructor() {
    super("Goods not found", 404);
  }
}
export class NoTokenError extends BaseError {
  constructor() {
    super("Client error - No token provided", 401);
  }
}

export class WrongTokenError extends BaseError {
  constructor() {
    super("Client error - Invalid token", 403);
  }
}
export class InputEmptyError extends BaseError {
  constructor() {
    super("Client error - Input field should not be empty", 400);
  }
}

export class InvalidInputError extends BaseError {
  constructor(message: string) {
    super(`Client error - Invalid input: ${message}`, 400);
  }
}
export class ManagerNotFoundError extends BaseError {
  constructor() {
    super("phone not signed up", 403);
  }
}
export class PhoneFormatError extends BaseError {
  constructor() {
    super("phone format not correct", 403);
  }
}

export class DatabaseError extends BaseError {
  constructor() {
    super("Database Error", 500);
  }
}
