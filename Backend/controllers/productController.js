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

export const getProductCategories = async(req, res, next) => {
    const categories = await Product.find().distinct('category');

    if(!categories){
        return next(generateCustomError(404, "Categories not found"));
    }
    res.send(categories);
}

export const getProductsByQuery = async(req, res) => {
    const {query} = req;
    const pageSize = 10;

    const page = query.page || 1;
    const category = query.category || "";
    const price = query.price || "";
    const rating = query.rating || "";
    const order = query.order || "";
    const searchQuery = query.query || "";

    const queryFilter = searchQuery && searchQuery !== 'all' ? {title: {$regex: searchQuery, $options: 'i'}}: {};

    const categoryFilter = category && category !== 'all' ? {category} : {};

    const ratingFilter = rating && rating !== 'all' ? {'rating.rate': {$gte: Number(rating)}} : {};

    const prices = price.split('-');
    const priceFilter = price && price !== 'all' ? {price: {$gte: Number(prices[0]), $lte: Number(prices[1])}} : {};

    // 1 = asceding, -1 = descending
    const sortOrder = order === 'lowest' ? {price: 1} : order  === 'highest' ? {price: -1} : order === 'topRated' ? {rating: -1} : {_id: -1};

    const products = await Product.find({...queryFilter, ...categoryFilter, ...ratingFilter, ...priceFilter}).sort(sortOrder).skip(pageSize * (page - 1)).limit(pageSize);

    const countProduct = await Product.countDocuments({...queryFilter, ...categoryFilter, ...ratingFilter, ...priceFilter});

    res.send({products, countProduct, page, pages: Math.ceil(countProduct / pageSize)});
}