import Product from "../models/Product.js";

export const getProducts = async(req,res) => {
    const products = await Product.find({}); // lean() = when we want only to read data (no resetting props)
    res.send(products);
}