import type { RequestHandler } from "express";
import { z } from "zod";
import { ValidationError } from "@/lib/errors.js";

export function validateBody(schema: z.ZodType): RequestHandler {
  return (req, _res, next) => {
    const validationResult = schema.safeParse(req.body);

    if (!validationResult.success) {
      return next(
        new ValidationError(
          "Invalid request body",
          z.flattenError(validationResult.error).fieldErrors,
        ),
      );
    }

    req.body.data = validationResult.data;

    return next();
  };
}
