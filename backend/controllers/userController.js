const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const bcrypt = require('bcryptjs');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');

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

exports.forgotPassword = async (req,res,next) =>{
    const { email } = req.body;
        //find user
    const user = await User.findOne({email:email});

    if(!user){
        return next(new ErrorHandler('User not found',404));         
    }

    //get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/forgotPassword/${resetToken}`;
    const message = `Your password reset token is as follows:\n\n${resetPasswordUrl}\n\nIf not requested for this email kindly ignore it.`;

    try{
        await sendEmail({
            email:user.email,
            subject: 'JustBuy Reset Password',
            message
        });

        res.status(200).json({
            success:true,
            message:`Email Sent to: ${user.email}`
        });
    }catch(err){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(err.message,500));
    
    }

   
};

exports.logoutUser = async (req,res,next) =>{
    try{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    });

    res.status(200).json({
        success:true,
        message:'Logged Out'
    })
}catch(err){
    return next(new ErrorHandler(err.message,500));
}
};