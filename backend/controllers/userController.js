const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const bcrypt = require('bcryptjs');
const sendToken = require('../utils/jwtToken');

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

    sendToken(user,200,res,'User registered successfully');

    }catch(err){
        return next(new ErrorHandler(err.message,500));
    }
};

exports.loginUser = async(req,res,next)=>{
    try{
        const { email,password } = req.body;

        //check if user entered email and password
        if(!email || !password){
            return next(new ErrorHandler('Please enter email and password',400));
        }

        //check if user exists
        const user = await User.findOne({email:email}).select('+password');

        if(!user){
            return next(new ErrorHandler('Email or Password invalid',400));
        }

        //check if password entered by user is correct
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return next(new ErrorHandler('Password is invalid',400));          
        }

        sendToken(user,200,res,'Login Successful');

    }catch(err){
        return next(new ErrorHandler(err.message,500));
    }
};