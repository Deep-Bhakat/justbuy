const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');

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

    res.status(201).json({
        success:true,
        user,
        message:'User registered successfully'
    });
    }catch(err){
        return next(new ErrorHandler(err.message,500));
    }
};