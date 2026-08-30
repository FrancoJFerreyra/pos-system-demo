import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "./product.controller.js";
import { validateBody } from "@/middlewares/validate-body.js";
import {
  createProductSchema,
  getAllProductQuerySchema,
  getByIdProductQuerySchema,
  updateProductSchema,
} from "./product.schemas.js";
import { validateQuery } from "@/middlewares/validate-query.js";

const router = Router();

router.get("/:id", validateQuery(getAllProductQuerySchema), getProductById);
router.get("/", validateQuery(getByIdProductQuerySchema), getAllProducts);
router.post("/", validateBody(createProductSchema), createProduct);
router.patch("/:id", validateBody(updateProductSchema), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
