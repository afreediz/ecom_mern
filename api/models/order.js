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
            reqired:true,
            min:[1, "Product quantity can't be less than 1"]
        }
    }],
    payment:{
        type:String,
        default:"Not paid",
        enum:["Not paid", "Paid"]
    },
    status:{
        type:String,
        default:"Not processed",
        enum:["Not processed", "Processing", "Shipped", "Delivered", "Canceled"]
    }
}, {timestamps:true})

module.exports = mongoose.model('orders', orderSchema)