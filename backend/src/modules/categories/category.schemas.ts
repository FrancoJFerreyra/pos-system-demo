import { createPopulateQuerySchema } from "@/common/validations/common.schemas.js";
import { z } from "zod";

const CATEGORY_POPULATE_ENTITIES = ["products"] as const

const populateQuerySchema = createPopulateQuerySchema(
  CATEGORY_POPULATE_ENTITIES
)

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be at most 100 characters"),
});

export const updateCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Name cannot be empty")
    .max(100, "Name must be at most 100 characters")
    .optional(),
});

export const getByIdCategoryQuerySchema = populateQuerySchema;

export const getAllCategoriesQuerySchema = z.object({
  name: z.string().optional(),
}).extend(populateQuerySchema.shape);
