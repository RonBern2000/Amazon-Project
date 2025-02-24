import Product from "../models/product"
import User from "../models/User"
import data from "../data";
import { generateCustomError } from "../middleware/errorHandler";

export const seedData = async (req, res, next)=>{
    try {
        await Promise.all([Product.deleteMany({}), User.deleteMany({})]);
        await Promise.all([Product.insertMany(data.products), User.insertMany(data.users)]);
        res.send("Products were added successfully!");
    } catch (error) {
        console.log(error);
        next(generateCustomError(500, 'Failed to seed'));
    }
}