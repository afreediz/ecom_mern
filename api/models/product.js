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
    shortdesc:{
        type:String,
        required:true,
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
    image:{
        type:String,
        required:true
    },
    imageId:{
        type:String,
        required:true
    }
}, {timstamps:true})


module.exports = mongoose.model('products', productSchema)