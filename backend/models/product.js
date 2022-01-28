const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please enter name of product'],
        trim:true,
        maxLength:100,
    },
    price:{
        type:Number,
        required:[true, 'Please enter price of product'],
        default:0.0
    },
    description:{
        type:String,
        required:[true, 'Please enter description of product'],
        maxLength:500,
    },
    images:[
           {
               public_id:{
                   type:String,
                   required:true
               },
               url:{
                   type:String,
                   required:true
               }
           } 
    ],
    category:{
        type:String,
        required:[true, 'Please select category']
    },
    seller:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        default:0
    },
    rating:{
        type:Number,
        default:0
    },
    noOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',
                required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true,
                default:0
            },
            comment:{
                type:String
            }
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product',productSchema);