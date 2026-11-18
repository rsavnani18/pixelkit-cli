
export type PixelKitErrorCode =
  | "INVALID_PATH"
  | "FILE_NOT_FOUND"
  | "DIRECTORY_NOT_FOUND"
  | "UNSUPPORTED_FORMAT"
  | "INVALID_IMAGE"
  | "OUTPUT_EXISTS"
  | "CONVERSION_FAILED"
  | "INVALID_OPTIONS"
  | "PERMISSION_DENIED"
  | "UNKNOWN_ERROR";

export class PixelKitError extends Error {
  public readonly code: PixelKitErrorCode;

  public readonly originalError?: unknown;

  constructor(
    message: string,
    code: PixelKitErrorCode,
    originalError?: unknown
  ) {
    super(message);

    this.name = "PixelKitError";
    this.code = code;
    this.originalError = originalError;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export function isPixelKitError(
  error: unknown
): error is PixelKitError {
  return error instanceof PixelKitError;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "An unexpected error occurred.";
}

export function createError(
  message: string,
  code: PixelKitErrorCode,
  originalError?: unknown
): PixelKitError {
  return new PixelKitError(
    message,
    code,
    originalError
  );
}
