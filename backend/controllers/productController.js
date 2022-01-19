const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
exports.createProduct = async (req,res,next) =>{
    console.log(req.body);

    try{
    const product = await Product.create(req.body);
    res.status(200).json({
            success:true,
            product,
            message:'Product Successfully Added'
    });
    }catch(err){
       return next(new ErrorHandler(err.message,500));
    }
};

exports.getProducts = async (req,res,next) =>{
    try{
        //implementing the search functionality
        const searchFeature = new APIFeatures(Product.find(), req.query)
                               .search(); 

        const products = await searchFeature.query;
        res.status(200).json({
            success:true,
            products,
            count:products.length,
            message:"Fetched all products successfully"
        })
    }catch(err){
        return next(new ErrorHandler(err.message,500));
    }
};

exports.getProduct = async (req,res,next) =>{
    try{
        const { prodId } = req.params;
        const product = await Product.findById(prodId);
        if(!product){
            next(new ErrorHandler('Product Not Found',404));
        }
        res.status(200).json({
            success:true,
            product
        })
    }catch(err){
        return next(new ErrorHandler(err.message,500));
    }
};

exports.updateProduct = async (req,res,next) =>{
        const {prodId} = req.params;
    try{
    let product = await Product.findById(prodId);
    if(!product){
        next(new ErrorHandler('Product Not Found',404));
    }
    product = await Product.findByIdAndUpdate(prodId,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(201).json({
        success:true,
        product,
        message:'Product Successfully Updated'
    })

    }catch(err){
        return next(new ErrorHandler(err.message,500));
    }
};

exports.deleteProduct = async (req,res,next) =>{
    const {prodId} = req.params;
    try{
        const product = Product.findById(prodId);
        if(!product){
            next(new ErrorHandler('Product Not Found',404));
        }

        await Product.findByIdAndRemove(prodId);

        res.status(200).json({
            success:true,
            message:'Product deleted successfully'
        });
    }catch(err){
        return next(new ErrorHandler(err.message,500));
    }
};