import {Router} from 'express'
import { getProducts, getProductById, getProductByToken, getProductCategories, getProductsByQuery } from '../controllers/productController.js';

const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.get("/categories", getProductCategories);
productsRouter.get("/token/:token", getProductByToken);
productsRouter.get("/search", getProductsByQuery);
productsRouter.get("/:id", getProductById); // may switch the route to "/item/:id"


export default productsRouter;