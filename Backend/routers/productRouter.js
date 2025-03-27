import { Router } from "express";
import { getProducts, getProductById, getProductByToken,getProductCategories,getProductsByQuery } from "../controllers/productController.js";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/categories", getProductCategories);
productRouter.get("/token/:token", getProductByToken);
productRouter.get("/search", getProductsByQuery);
productRouter.get("/:id", getProductById);

export default productRouter;