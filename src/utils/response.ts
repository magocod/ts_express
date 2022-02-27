import { ValidationError, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export interface SuccessResponse {
  message: string;
  data: unknown;
}

export interface ErrorResponse {
  message: string;
  error: string;
  errors?: ValidationError[]; // 422
  code?: string;
}

/**
 *
 * @param message
 * @param data
 */
export function successResponse(
  message: string,
  data: unknown
): SuccessResponse {
  return {
    message,
    data,
  };
}

/**
 *
 * @param message
 * @param error
 * @param code
 * @param errors
 */
export function errorResponse(
  message: string,
  error: string,
  errors: ValidationError[] | undefined = undefined,
  code: string | undefined = undefined
): ErrorResponse {
  return {
    message,
    error,
    errors,
    code,
  };
}

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export type ValidateRequest = void | Response<any, Record<string, any>>;

export function validateRequest(
  req: Request,
  res: Response,
  next: NextFunction
): ValidateRequest {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res.status(422).json({ errors: errors.array() });
    return res
      .status(422)
      .json(
        errorResponse("validation error", "validation error", errors.array())
      );
  }

  return next();
}
