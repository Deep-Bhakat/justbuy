const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
exports.createProduct = async (req,res,next) =>{
    req.body.user=req.user;
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
        //implementing pagination
        const resultsPerPage = 4;
        const productCount = await Product.countDocuments();
        //implementing the search and filter functionality
        const searchFeature = new APIFeatures(Product.find(), req.query)
                               .search()
                               .filter()
                               .pagination(resultsPerPage); 


        const products = await searchFeature.query;
        res.status(200).json({
            success:true,
            products,
            count:products.length,
            productCount,
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
            return next(new ErrorHandler('Product Not Found',404));
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
       return next(new ErrorHandler('Product Not Found',404));
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
          return next(new ErrorHandler('Product Not Found',404));
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

//Review functions

exports.createProductReview = async (req,res,next) =>{
    const {
        rating,
        comment,
        productId
    } = req.body;

    const review = {
        user : req.user._id,
        name : req.user.name,
        rating : Number(rating),
        comment
    };

    const product = await Product.findById(productId);

    if(!product){
        return next(new ErrorHandler('Product Not Found',404));
    }
    try{
        const isReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());

        if(isReviewed){
            product.reviews.find(r =>{
                if(r.user.toString() === req.user._id.toString()){
                    r.comment = comment;
                    r.rating = rating;
                }
            });
        }else{
            product.reviews.push(review);
            product.noOfReviews = product.reviews.length;
        }
        
        //update overall rating of product

        product.rating = product.reviews.reduce((acc,item) => item.rating + acc,0) / product.reviews.length;

        await product.save({validateBeforeSave: false});
        res.status(200).json({
            success: true,
            message: 'Product reviewed successfully.'
        })
    }catch(err){
        return next(new ErrorHandler(err.message,500));
    }
};

exports.getProductReviews = async (req,res,next) =>{
    const { productId } = req.query;

    const product = await Product.findById(productId);

    if(!product){
        return next(new ErrorHandler('Product Not Found',404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
        message: 'Product reviews fetched'
    });
};

exports.deleteProductReview = async (req,res,next) =>{
    const { productId,reviewId } = req.query;

    const product = await Product.findById(productId);

    if(!product){
        return next(new ErrorHandler('Product Not Found',404));
    }

    try{
        const reviews = product.reviews.filter(review => review._id.toString() !== reviewId.toString());


        const rating = (reviews.reduce((acc,item) => item.rating + acc,0) / reviews.length) || 0;
        const noOfReviews = reviews.length;
        await Product.findByIdAndUpdate(productId,{
            reviews,
            rating,
            noOfReviews
        },{
            new:true,
            runValidators:true,
            useFindAndModify:false
        });

        res.status(200).json({
            success:true,
            message: 'Review deleted successfully'
        })
    }catch(err){
        return next(new ErrorHandler(err.message,500));   
    }
};