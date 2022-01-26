const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
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
    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/resetPassword/${resetToken}`;
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

exports.resetPassword = async (req,res,next) =>{
    const resetToken = req.params.token;
    const {password,confirmPassword} = req.body;
    const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{
            $gt : Date.now()
        }
    });

    if(!user){
        return next(new ErrorHandler('Password Reset Token is invalid or has expired!',400));        
    }
    
    if(password!==confirmPassword){
        return next(new ErrorHandler('Passwords do not match!',401));        
    }

    //assign new password
    user.password = password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save();

    sendToken(user,200,res,'Password Reset Successful');
};

exports.getUser = async (req,res,next) =>{

    const user = await User.findById(req.user);

    if(!user){
        return next(new ErrorHandler('No user found',500));
    }
    res.status(200).json({
        success:true,
        user,
        message:'Fetched user details successfully.'
    });
};

exports.changePassword = async (req,res,next) =>{
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user).select('+password');

    if(!user){
        return next(new ErrorHandler('User not found',500));
    }

    const isPasswordCorrect = await bcrypt.compare(oldPassword,user.password);
    if(!isPasswordCorrect){
        return next(new ErrorHandler('Old Password is incorrect',400));          
    }

    user.password = newPassword;
    await user.save();

    //send new token
    sendToken(user,200,res,'Password changed successfully.');

};

exports.updateProfile = async (req,res,next) =>{
    const { name,email } = req.body;
    const newProfile ={
        name,
        email
    };
    //Avatar : TODO
    
    try{
        const user = await User.findByIdAndUpdate(req.user,newProfile,{
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).json({
            success:true,
            message:'User profile updated successfully.'
        });
    }catch(err){
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


//Admin controllers

exports.getAllUsers = async(req,res,next) =>{

    try{
        const users = await User.find();

        res.status(200).json({
            success:true,
            users,
            message:"Fetched all users."
        });

    }catch(err){
        return next(new ErrorHandler(err.message,500));     
    }
};

exports.getUserDetails = async(req,res,next) =>{
    const { userId } = req.params.userId;
    try{
        const user = await User.findById(userId);

        if(!user){
            return next(new ErrorHandler('No User found with this id',500));     
        
        }
        res.status(200).json({
            success:true,
            user,
            message:"Fetched user details."
        });

    }catch(err){
        return next(new ErrorHandler(err.message,500));     
    }
};