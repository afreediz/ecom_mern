const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:'categories',
        required:true
    },
    quantity:{
        type:Number,
        default:1
    },
    photo:{
        type:Buffer,
        contentType:String
    },
    shipping:{
        type:Boolean
    }
}, {timstamps:true})

module.exports = mongoose.model('products', productSchema)