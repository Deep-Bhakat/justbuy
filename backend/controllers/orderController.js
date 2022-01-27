const Order = require('../models/order');
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');

exports.createOrder = async (req,res,next) =>{
    const {
        shippingInfo,
        orderItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        paymentInfo
    } = req.body;
    try{
        const order = await Order.create({
            shippingInfo,
            orderItems,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
            paymentInfo,
            paidAt: Date.now(),
            user: req.user._id
        });

        res.status(201).json({
            success: true,
            order,
            message: 'Order created succesfully.'
        });
    }catch(err){
        return next(new ErrorHandler(err.message,500));
    }
};

exports.getOrder = async(req,res,next) =>{
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate('user','name email');

    if(!order){
        return next(new ErrorHandler('Order not found for this id',404));
    }

    res.status(200).json({
        success:true,
        order,
        message:'Order fetched successfully.'
    });
};

exports.myOrders = async (req,res,next) => {
    const userId = req.user._id;

    const orders = await Order.find({user:userId});

    if(!orders){
        return next(new ErrorHandler('Order not found for this user',404));      
    }

    res.status(200).json({
        success:true,
        orders,
        message:'Orders fetched'
    })

}