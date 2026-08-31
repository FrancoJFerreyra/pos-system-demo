import { ValidationError } from "@/lib/errors.js";
import { z } from "zod";

export function createPopulateQuerySchema<T extends readonly [string, ...string[]]>(
  allowedEntities: T
) {
  const allowedSet = new Set(allowedEntities)

  return z.object({
    include: z
      .string()
      .optional()
      .transform((val) => {
        if (!val) return [] as string[]
        return val.split(",").map((s) => s.trim()).filter(Boolean)
      })
      .pipe(
        z.array(z.string()).refine(
          (items) => {
            const invalid = items.filter((item) => !allowedSet.has(item))
            if (invalid.length === 0) return true
            throw new ValidationError(
              `Invalid populate entities: ${invalid.join(", ")}. Allowed: ${[
                ...allowedSet,
              ].join(", ")}`
            )
          },
          { message: "Invalid populate entities" }
        )
      ),
  })
}