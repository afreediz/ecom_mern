const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
    products:[{
        product: {
            type:mongoose.Types.ObjectId,
            ref:'products',
            required:true
        },
        cart_quantity:{
            type:Number,
            reqired:true
        }
    }],
    payment:{
        type:String
    },
    status:{
        type:String,
        default:"Not processed",
        enum:["Not processed", "Processing", "Shipped", "Delivered", "Cancel"]
    }
}, {timestamps:true})

module.exports = mongoose.model('orders', orderSchema)