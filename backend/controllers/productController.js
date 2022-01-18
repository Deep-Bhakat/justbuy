const Product = require('../models/product');

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
        console.log(err);
    }
};

exports.getProducts = async (req,res,next) =>{
    try{
        const products = await Product.find();
        res.status(200).json({
            success:true,
            products,
            count:products.length,
            message:"Fetched all products successfully"
        })
    }catch(err){
        console.log(err);
    }
};

exports.getProduct = async (req,res,next) =>{
    try{
        const { prodId } = req.params;
        const product = await Product.findById(prodId);
        if(!product){
            res.status(404).json({
                success:false,
                message: 'No product found'
            })
        }
        res.status(200).json({
            success:true,
            product
        })
    }catch(err){
        console.log(err);
    }
};

exports.updateProduct = async (req,res,next) =>{
        const {prodId} = req.params;
    try{
    let product = await Product.findById(prodId);
    if(!product){
        res.status(404).json({
            success:false,
            message: 'Product not found'
        });
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
        console.log(err);
    }
};

exports.deleteProduct = async (req,res,next) =>{
    const {prodId} = req.params;
    try{
        const product = Product.findById(prodId);
        if(!product){
            res.status(404).json({
                success:false,
                message: 'Product not found'
            });
        }

        await Product.findByIdAndRemove(prodId);

        res.status(200).json({
            success:true,
            message:'Product deleted successfully'
        });
    }catch(err){
        console.log(err);
    }
};