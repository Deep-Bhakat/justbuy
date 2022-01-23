const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please enter your name']
    },
    email:{
        type:String,
        required:[true, 'Please enter your email'],
        unique:true,
        validate:[validator.isEmail, 'Please enter a valid Email']
    },
    password:{
        type:String,
        required:[true,'Password cannot be empty'],
        minlength:[6,'Password cannot be smaller than 6 characters.'],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true
        }
    },
    mobile:{
        type:Number,
        required:[true, 'Please enter your mobile no'],
        maxlength:12
    },
    role:{
        type:String,
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
});
//Encrypting password before saving user
//you cant use this inside a arrow function it will give undefined
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,12);
});

//jwt token generation
userSchema.methods.createJwtToken =  function(){
    return jwt.sign({
        userId:this._id,
        email:this.email
    },process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    });
};

//generate password reset token
userSchema.methods.getResetPasswordToken = function(){

    //Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // encrypt token
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    //set password token expire time
    this.resetPasswordExpire =  Date.now() + 30 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model('User',userSchema);