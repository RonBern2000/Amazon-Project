import { generateCustomError } from "../middleware/errorHandler.js";
import Product from "../models/Product.js"

export const getProducts = async(req,res) => {
    const products = await Product.find({});
    res.send(products);
}

export const getProductById = async(req,res,next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(generateCustomError(404, "Product not found"));
        }

        return res.send(product);
    } catch (error) {
        next(generateCustomError(404, "Invalid Product ID"));
    }
}

export const getProductByToken = async(req,res,next) => {
    try {
        const product = await Product.findOne({token: req.params.token});

        if (!product) {
            return next(generateCustomError(404, "Product not found"));
        }

        return res.send(product);
    } catch (error) {
        next(generateCustomError(500, `Server Error: ${error.message}`));
    }
}

export const getProductCategories = async(req,res,next) => {
    const categories = await Product.find().distinct('category');

    if (!categories) {
        return next(generateCustomError(404, "Categories not found"));
    }

    res.send(categories);
}

export const getProductsByQuery = async(req,res) => {
    const {query} = req;
    const pageSize = 10;

    const page = query.page || 1;
    const category = query.category || '';
    const price = query.price || '';
    const rating = query.rating || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const queryFilter = searchQuery && searchQuery !== 'all' ? {title: {$regex: searchQuery, $options: 'i'}} : {};

    const categoryFilter = category && category !== 'all' ? {category} : {};

    const ratingFilter = rating && rating !== 'all' ? {'rating.rate': {$gte: Number(rating)}} : {};

    //"50-200"
    const priceFilter = price && price !== 'all' ? {price: {$gte: Number(price.split('-')[0]), $lte: Number(price.split('-')[1])}} : {};

    //1 - ascending / -1 descending
    const sortOrder = order === 'lowest' ? {price: 1} : order === 'highest' ? {price: -1} : order === 'topRated' ? {rating: -1} : {_id: -1};

    const products = await Product.find({...queryFilter, ...categoryFilter, ...ratingFilter, ...priceFilter}).sort(sortOrder).skip(pageSize * (page - 1)).limit(pageSize);

    const countProducts = await Product.countDocuments({...queryFilter, ...categoryFilter, ...ratingFilter, ...priceFilter});

    res.send({products, countProducts, page, pages: Math.ceil(countProducts / pageSize)});
}