import { buildIncludeQuery } from "@/common/http/api-queries.js";
import { CategoryWhereInput } from "@/generated/prisma/models.js";
import { prisma } from "../../lib/prisma.js";
import {
  GetAllCategoryQuery,
  CreateCategoryData,
  UpdateCategoryData,
  GetByIdCategoryQuery,
} from "./category.types.js";

const buildWhereQuery = (
  query: GetAllCategoryQuery,
): CategoryWhereInput | {} =>
  query?.name
    ? {
      where: {
        name: {
          contains: query.name,
          mode: "insensitive",
        },
      },
    }
    : {};

export const categoryRepository = {
  async findMany(query: GetAllCategoryQuery) {
    const where = buildWhereQuery(query);
    const include = buildIncludeQuery(query?.include);
    return prisma.category.findMany({ where, include });
  },

  async findById(id: number, query: GetByIdCategoryQuery) {
    const include = buildIncludeQuery(query?.include);
    return prisma.category.findUnique({
      where: {
        id,
      },
      include,
    });
  },

  async create(data: CreateCategoryData) {
    return prisma.category.create({ data });
  },

  async update(id: number, data: UpdateCategoryData) {
    return prisma.category.update({
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
