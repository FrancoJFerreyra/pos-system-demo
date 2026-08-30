import { categoryService } from "./category.service.js";
import { SUCCESS_STATUS_CODES } from "../../utils/http.js";
import {
  CreateCategoryData,
  UpdateCategoryData,
  GetAllCategoryQuery,
  GetByIdCategoryQuery,
} from "./category.types.js";
import {
  DeleteHandler,
  GetByIdHandler,
  GetAllHandler,
  PatchHandler,
  PostHandler,
} from "@/common/http/route-handler-types.js";
import { ApiDefaultParams } from "@/common/http/api-types.js";

const getAllCategories: GetAllHandler<GetAllCategoryQuery> = async (
  req,
  res,
) => {
  const categories = await categoryService.getAll(
    req.validatedQuery as GetAllCategoryQuery,
  );
  res.status(SUCCESS_STATUS_CODES.GET).json({
    data: categories,
  });
};

const getCategoryById: GetByIdHandler<
  ApiDefaultParams,
  GetByIdCategoryQuery
> = async (req, res) => {
  const { id } = req.params;
  const product = await categoryService.getById(
    Number(id),
    req.query as GetByIdCategoryQuery,
  );
  res.status(SUCCESS_STATUS_CODES.GET).json({
    data: product,
  });
};

const createCategory: PostHandler<CreateCategoryData> = async (
  req,
  res,
  next,
) => {
  const { data } = req.body;
  try {
    const product = await categoryService.create(data);
    res.status(SUCCESS_STATUS_CODES.GET).json({
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory: PatchHandler<
  ApiDefaultParams,
  UpdateCategoryData
> = async (req, res, next) => {
  const { id } = req.params;
  const { data } = req.body;
  try {
    const product = await categoryService.update(Number(id), data);
    res.status(SUCCESS_STATUS_CODES.UPDATE).json({
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory: DeleteHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await categoryService.delete(Number(id));
    res.status(SUCCESS_STATUS_CODES.DELETE).json({
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
