import {Router} from 'express'
import { getProducts } from '../controllers/productController.js';

const productsRouter = Router();

productsRouter.get("/", getProducts);

export default productsRouter;