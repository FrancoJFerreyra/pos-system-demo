import { z } from "zod";

export const populateQuerySchema = z.object({
  include: z
    .string()
    .transform((val) => val?.split(",").map((s) => s.trim()))
    .optional(),
});
