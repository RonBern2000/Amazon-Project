import {Router} from 'express';
import { isAuth } from '../middleware/isAuth.js';
import { addOrder } from '../controllers/orderController.js';

const orderRouter = Router();

orderRouter.post('/', isAuth, addOrder);

export default orderRouter;