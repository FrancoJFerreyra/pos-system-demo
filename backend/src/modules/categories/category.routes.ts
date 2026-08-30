import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "./category.controller.js";
import { validateBody } from "@/middlewares/validate-body.js";
import {
  createCategorySchema,
  getByIdCategoryQuerySchema,
  getAllCategoriesQuerySchema,
  updateCategorySchema,
} from "./category.schemas.js";
import { validateQuery } from "@/middlewares/validate-query.js";

const router = Router();

router.get("/:id", validateQuery(getByIdCategoryQuerySchema), getCategoryById);
router.get("/", validateQuery(getAllCategoriesQuerySchema), getAllCategories);
router.post("/", validateBody(createCategorySchema), createCategory);
router.patch("/:id", validateBody(updateCategorySchema), updateCategory);
router.delete("/:id", deleteCategory);

export default router;
