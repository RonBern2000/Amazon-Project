import {Router} from 'express'

const seedRouter = Router();

seedRouter.get("/", seedData);

export default seedRouter