import { ResourceNotFoundError } from "@/lib/errors.js";
import { categoryRepository } from "./category.repository.js";
import {
  GetAllCategoryQuery,
  CreateCategoryData,
  UpdateCategoryData,
  GetByIdCategoryQuery,
} from "./category.types.js";

export const categoryService = {
  async getAll(query: GetAllCategoryQuery) {
    return categoryRepository.findMany(query);
  },

  async getById(id: number, query: GetByIdCategoryQuery) {
    const category = await categoryRepository.findById(id, query);
    if (!category) {
      throw new ResourceNotFoundError("Category", { id });
    }
    return category;
  },

  async create(data: CreateCategoryData) {
    return categoryRepository.create(data);
  },

  async update(id: number, data: UpdateCategoryData) {
    return categoryRepository.update(id, data);
  },

  async delete(id: number) {
    return categoryRepository.delete(id);
  },
};
