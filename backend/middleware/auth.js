const ErrorHandler = require("../utils/errorHandler");
const jwt = require('jsonwebtoken');
const User = require('../models/user');
exports.isAuthenticated = async (req,res,next) =>{
    try{
    const { token } = req.cookies;
        if(!token){
            return next(new ErrorHandler('Login first to access this page',401));

        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        
        req.user = await User.findById(decoded.userId);
        next();
    }catch(err){
        return next(new ErrorHandler(err.message,500));
    }
};

exports.authorizeRole = (...roles) => {
        return (req,res,next) =>{
            if(!roles.includes(req.user.role)){
                return next(new ErrorHandler(`User with role ${req.user.role} is not authorized to access this route!`,403));
            }
            next();
        }   
}