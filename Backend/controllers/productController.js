import Product from "../models/Product.js";
import generateCustomError from "../middleware/errorHandler.js"

export const getProducts = async(req,res) => {
    const products = await Product.find({}); // lean() = when we want only to read data (no resetting props)
    res.send(products);
}

export const getProductById = async(req, res, next) => {
    try {
        const product = await Product.findById(req.params.id); // it can crash because finbyId expects a specific format

        if(!product){
            return next(generateCustomError(404, "Product was not found"));
        }
        return res.send(product);
    } catch (error) {
        next(generateCustomError(404, "Invalid Product Id"));
    }
}

export const getProductByToken = async(req, res, next) => {
    try {
        const product = await Product.findOne({token: req.params.token});

        if(!product){
            return next(generateCustomError(404, "Product was not found"));
        }
        return res.send(product);
    } catch (error) {
        next(generateCustomError(500, `Server error: ${error.message}`));
    }
}
