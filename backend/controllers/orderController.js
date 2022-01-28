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

};

exports.allOrders = async(req,res,next) =>{
    const orders = await Order.find();

    if(!orders){
        return next(new ErrorHandler('Orders not found',500));      
    }

    let totalAmount = 0;
    orders.forEach(order =>{
        totalAmount+= order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
        message:'Orders fetched successfully.'
    });
};

exports.updateOrder = async(req,res,next) =>{
    const order = await Order.findById(req.params.orderId);

    if(!order){
        return next(new ErrorHandler('Order not found',500));      
    }
    if(order.orderStatus === 'Delivered'){
        return next(new ErrorHandler('You have already delivered the order!',400));       
    }

    order.orderItems.forEach(async item =>{
        await updateStock(item.product,item.quantity);
    });
    
    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();

    await order.save();

    res.status(200).json({
        success: true,   
        message:'Order status updated successfully.'
    });
};

exports.deleteOrder = async (req,res,next) =>{

    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if(!order){
        return next(new ErrorHandler('Order not found',500));  
    }

    try{
        await Order.findByIdAndDelete(orderId);

        res.status(200).json({
            success:true,
            message:'Order deleted successfully'
        });
    }catch(err){
        return next(new ErrorHandler(err.message,500));        
    }
};


async function updateStock(id,qty){
    const product = await Product.findById(id);

    if(!product){
        return next(new ErrorHandler('Product not found',500));  
    }
    product.stock-= qty;
    await product.save({validateBeforeSave: false});
};