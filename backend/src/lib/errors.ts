import { ERROR_STATUS_CODES } from "../utils/http.js";

/**
 * Base class for all domain errors.
 * Extends Error to maintain stack traces and integrate with Node.js error handling.
 */
export class DomainError extends Error {
  public readonly code: ERROR_STATUS_CODES;
  public readonly data?: Record<string, any>;

  constructor(
    message: string,
    code: ERROR_STATUS_CODES,
    data?: Record<string, any>,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.data = data;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      data: this.data,
      stack: process.env.NODE_ENV === "development" ? this.stack : undefined,
    };
  }
}

/**
 * Thrown when a requested resource is not found.
 * HTTP mapping: 404 Not Found
 */
export class ResourceNotFoundError extends DomainError {
  constructor(resource: string, query: Record<string, any>) {
    super(
      `Resource '${resource}' was not found.`,
      ERROR_STATUS_CODES.NOT_FOUND,
      { resource, query },
    );
  }
}

/**
 * Thrown when a unique constraint is violated.
 * HTTP mapping: 409 Conflict
 */
export class UniqueConstraintError extends DomainError {
  constructor(field: string, value: any) {
    super(
      `A record with ${field}='${value}' already exists.`,
      ERROR_STATUS_CODES.CONFLICT,
      { field, value },
    );
  }
}

/**
 * Thrown when a foreign key constraint is violated.
 * HTTP mapping: 400 Bad Request or 409 Conflict
 */
export class ForeignKeyConstraintError extends DomainError {
  constructor(field: string, referencedTable: string, value: any) {
    super(
      `Cannot create or update record: referenced ${referencedTable} with ${field}='${value}' does not exist.`,
      ERROR_STATUS_CODES.BAD_REQUEST,
      { field, referencedTable, value },
    );
  }
}

/**
 * Thrown when a not-null constraint is violated.
 * HTTP mapping: 400 Bad Request
 */
export class NotNullConstraintError extends DomainError {
  constructor(field: string) {
    super(`Field '${field}' cannot be null.`, ERROR_STATUS_CODES.BAD_REQUEST, {
      field,
    });
  }
}

/**
 * Thrown when a check constraint is violated.
 * HTTP mapping: 400 Bad Request
 */
export class CheckConstraintError extends DomainError {
  constructor(field: string, constraint: string, value: any) {
    super(
      `Value '${value}' for field '${field}' violates constraint: ${constraint}.`,
      ERROR_STATUS_CODES.BAD_REQUEST,
      { field, constraint, value },
    );
  }
}

/**
 * Thrown when a database operation fails due to connection issues.
 * HTTP mapping: 503 Service Unavailable
 */
export class DatabaseConnectionError extends DomainError {
  constructor(operation?: string) {
    super(
      operation
        ? `Database connection failed during operation: ${operation}.`
        : "Database connection failed.",
      ERROR_STATUS_CODES.UNAVAILABLE_SERVER,
    );
  }
}

/**
 * Thrown when a query times out.
 * HTTP mapping: 504 Gateway Timeout
 */
export class QueryTimeoutError extends DomainError {
  constructor(query?: string, timeoutMs?: number) {
    super(
      `Query execution timed out${timeoutMs ? ` after ${timeoutMs}ms` : ""}.`,
      ERROR_STATUS_CODES.GATEWAY_TIMEOUT,
      { query, timeoutMs },
    );
  }
}

/**
 * Thrown when a transaction fails to commit or rollback.
 * HTTP mapping: 500 Internal Server Error
 */
export class TransactionError extends DomainError {
  constructor(operation: string, cause?: string) {
    super(
      `Transaction failed during ${operation}${cause ? `: ${cause}` : ""}.`,
      ERROR_STATUS_CODES.INTERNAL_SERVER_ERROR,
      { operation, cause },
    );
  }
}

/**
 * Thrown when input validation fails.
 * HTTP mapping: 400 Bad Request
 */
export class ValidationError extends DomainError {
  constructor(message: string, fields?: Record<string, string[]>) {
    super(message, ERROR_STATUS_CODES.BAD_REQUEST, { fields });
  }
}

export function serializeError(error: unknown): Record<string, any> {
  if (error instanceof DomainError) {
    return error.toJSON();
  }
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    };
  }
  return { message: String(error) };
}
