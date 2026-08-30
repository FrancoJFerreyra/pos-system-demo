import { ApiRelationQuery } from "@/common/http/api-types.js";

export type CreateProductData = {
  categoryId?: number;
  isActive?: boolean;
  name: string;
  price: number;
  sku: string;
};

export type UpdateProductData = {
  categoryId?: number;
  isActive?: boolean;
  name?: string;
  price?: number;
  sku?: string;
};

export type GetAllProductQuery = {
  categoryId?: number;
  isActive?: boolean;
  name?: string;
  sku?: string;
  minPrice?: number;
  maxPrice?: number;
} & ApiRelationQuery;

export type GetByIdProductQuery = ApiRelationQuery;
