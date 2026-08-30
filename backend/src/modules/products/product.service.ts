import { ResourceNotFoundError } from "@/lib/errors.js";
import { productRepository } from "./product.repository.js";
import {
  CreateProductData,
  GetAllProductQuery,
  GetByIdProductQuery,
  UpdateProductData,
} from "./product.types.js";

export const productService = {
  async getAll(query: GetAllProductQuery) {
    return productRepository.findMany(query);
  },

  async getById(id: number, query: GetByIdProductQuery) {
    const product = await productRepository.findById(id, query);
    if (!product) {
      throw new ResourceNotFoundError("Product", { id });
    }
    return product;
  },

  async create(data: CreateProductData) {
    return productRepository.create(data);
  },

  async update(id: number, data: UpdateProductData) {
    return productRepository.update(id, data);
  },

  async delete(id: number) {
    return productRepository.delete(id);
  },
};
