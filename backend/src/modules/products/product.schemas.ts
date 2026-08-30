import { populateQuerySchema } from "@/common/validations/common.schemas.js";
import { z } from "zod";

const nameSchema = z.string().trim().min(1).max(120);
const skuSchema = z.string().trim().min(1).max(64);
const descriptionSchema = z.string().trim().max(600);
const priceSchema = z.coerce.number().positive();
const categoryIdSchema = z.coerce.number().int().positive();

const categoryIdQuerySchema = z.string().optional();

export const createProductSchema = z.object({
  categoryId: categoryIdSchema.optional(),
  description: descriptionSchema.optional(),
  name: nameSchema,
  price: priceSchema,
  sku: skuSchema,
});

export const updateProductSchema = z.object({
  categoryId: categoryIdSchema.optional(),
  description: descriptionSchema.optional(),
  name: nameSchema.optional(),
  price: priceSchema.optional(),
  sku: skuSchema.optional(),
});

export const getAllProductQuerySchema = z
  .object({
    ...populateQuerySchema,
    categoryId: categoryIdQuerySchema,
    isActive: z.coerce.boolean().optional(),
    maxPrice: priceSchema.optional(),
    minPrice: priceSchema.optional(),
    name: z.string().optional(),
    sku: z.string().optional(),
  })
  .refine(
    (data) =>
      !data.minPrice || !data.maxPrice || data.maxPrice >= data.minPrice,
    {
      message: "maxPrice must be greater or equal to minPrice",
      path: ["maxPrice"],
    },
  );

export const getByIdProductQuerySchema = populateQuerySchema;
