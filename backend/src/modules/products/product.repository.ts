import { buildIncludeQuery } from "@/common/http/api-queries.js";
import { prisma } from "../../lib/prisma.js";
import {
  CreateProductData,
  GetAllProductQuery,
  GetByIdProductQuery,
  UpdateProductData,
} from "./product.types.js";
import { ProductWhereInput } from "../../../generated/prisma/models.js";

function buildWhereQuery(query: GetAllProductQuery): ProductWhereInput {
  const where: ProductWhereInput = {};
  if (query.name) {
    where.name = { contains: query.name, mode: "insensitive" };
  }

  if (query.categoryId) {
    where.categoryId = query.categoryId;
  }

  if (query.sku) {
    where.sku = query.sku;
  }

  if (query.isActive !== undefined) {
    where.isActive = query.isActive;
  }

  if (query.minPrice !== undefined || query.maxPrice !== undefined) {
    where.price = {
      ...(query.minPrice !== undefined && { gte: query.minPrice }),
      ...(query.maxPrice !== undefined && { lte: query.maxPrice }),
    };
  }

  return where;
}

export const productRepository = {
  async findMany(query: GetAllProductQuery) {
    const include = buildIncludeQuery(query.include);
    const where = buildWhereQuery(query);
    return prisma.product.findMany({ include, where });
  },

  async findById(id: number, query: GetByIdProductQuery) {
    const include = buildIncludeQuery(query.include);
    return prisma.product.findUnique({
      where: {
        id,
      },
      include,
    });
  },

  async create(data: CreateProductData) {
    return prisma.product.create({ data });
  },

  async update(id: number, data: UpdateProductData) {
    return prisma.product.update({
      where: {
        id,
      },
      data,
    });
  },

  async delete(id: number) {
    return prisma.product.delete({
      where: {
        id,
      },
    });
  },
};
