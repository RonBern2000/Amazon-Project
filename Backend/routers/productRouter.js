import {Router} from 'express'
import { getProducts, getProductById, getProductByToken } from '../controllers/productController.js';

const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.get("/:id", getProductById); // may switch the route to "/item/:id"
productsRouter.get("/token/:token", getProductByToken);

export default productsRouter;