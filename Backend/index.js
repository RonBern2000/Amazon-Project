import express, { urlencoded } from 'express'
import cors from 'cors'
import {config} from 'dotenv'
import seedRouter from './routers/seedRouter.js';
import productRouter from './routers/productRouter.js'
import userRouter from './routers/userRouter.js'
import { errorHandler } from './middleware/errorHandler.js';
import notFoundHandler from './middleware/notFoundHandler.js';
import runServer from './middleware/runServer.js';

config();
const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/v1/seed",seedRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);

app.use(errorHandler);
app.use(notFoundHandler);

runServer(app,process.env.MONGO_CON, PORT);