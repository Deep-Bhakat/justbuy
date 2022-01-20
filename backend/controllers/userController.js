const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');
exports.registerUser = async (req,res,next) =>{
    try{
    const { name, email, password, mobile } = req.body;

    const user = await User.create({
        name,
        password,
        email,
        mobile,
        avatar:{
            public_id:'asdasd',
            url:'asdasdas'
        }
    });   

    const token = jwt.sign({
        userId:user._id,
        email:user.email
    },process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    });

    res.status(201).json({
        success:true,
        token,
        message:'User registered successfully'
    });
    }catch(err){
        return next(new ErrorHandler(err.message,500));
    }
};