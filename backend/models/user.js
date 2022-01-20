const mongoose = require('mongoose');
const validator = require('validator');

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

module.exports = mongoose.model('User',userSchema);