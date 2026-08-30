import dotenv from "dotenv";
import express from "express";
import errorHandler from "@/middlewares/error-handler.js";
import productRouter from "@/modules/products/product.routes.js";
import categoryRouter from "@/modules/categories/category.routes.js";

dotenv.config();
const port = process.env.PORT;
const app = express();

app.use(express.json());

//routes
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);

//middlewares
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
