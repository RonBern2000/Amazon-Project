import { Router } from "express";
import { isAuth } from "../utils.js";
import { addOrder, getOrderById } from "../controllers/orderController.js";

const orderRouter = Router();

orderRouter.get('/:id', isAuth, getOrderById);
orderRouter.post('/', isAuth, addOrder);

export default orderRouter;