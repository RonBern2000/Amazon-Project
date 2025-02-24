import Product from "../models/product"

export const getProducts = async(req,res)=>{
    const products = await Product.find({});
    res.send(products);
}