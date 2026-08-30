import { RequestHandler } from "express";
import { productService } from "./product.service.js";
import { SUCCESS_STATUS_CODES } from "../../utils/http.js";
import {
  CreateProductData,
  GetAllProductQuery,
  GetByIdProductQuery,
  UpdateProductData,
} from "./product.types.js";
import {
  GetAllHandler,
  GetByIdHandler,
  PatchHandler,
  PostHandler,
} from "@/common/http/route-handler-types.js";
import { ApiDefaultParams } from "@/common/http/api-types.js";

const getAllProducts: GetAllHandler<GetAllProductQuery> = async (req, res) => {
  const products = await productService.getAll(
    req.validatedQuery as GetAllProductQuery,
  );
  res.status(SUCCESS_STATUS_CODES.GET).json({
    data: products,
  });
};

const getProductById: GetByIdHandler = async (req, res) => {
  const { id } = req.params;
  const query = req.validatedQuery as GetByIdProductQuery;
  const product = await productService.getById(Number(id), query);
  res.status(SUCCESS_STATUS_CODES.GET).json({
    data: product,
  });
};

const createProduct: PostHandler<CreateProductData> = async (
  req,
  res,
  next,
) => {
  const { data } = req.body;
  try {
    const product = await productService.create(data);
    res.status(SUCCESS_STATUS_CODES.GET).json({
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct: PatchHandler<ApiDefaultParams, UpdateProductData> = async (
  req,
  res,
  next,
) => {
  const { id } = req.params;
  const { data } = req.body;
  try {
    const product = await productService.update(Number(id), data);
    res.status(SUCCESS_STATUS_CODES.UPDATE).json({
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await productService.delete(Number(id));
    res.status(SUCCESS_STATUS_CODES.DELETE).json({
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
