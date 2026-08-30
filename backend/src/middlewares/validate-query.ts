import type { RequestHandler } from "express";
import { z } from "zod";
import { ValidationError } from "@/lib/errors.js";

declare global {
  namespace Express {
    interface Request {
      validatedQuery?: unknown;
    }
  }
}

export function validateQuery<T extends z.ZodType>(
  schema: T,
): RequestHandler<Record<string, string>, unknown, unknown, z.output<T>> {
  return (req, _res, next) => {
    const validationResult = schema.safeParse(req.query);

    if (!validationResult.success) {
      return next(
        new ValidationError(
          "Invalid request query",
          z.flattenError(validationResult.error).fieldErrors as Record<
            string,
            string[]
          >,
        ),
      );
    }

    req.validatedQuery = validationResult.data;

    return next();
  };
}
