const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
    products:[
        {
            type:mongoose.Types.ObjectId,
            ref:'products'
        }
    ],
    payment:{
        type:String
    },
    status:{
        type:String,
        default:"Not processed",
        enum:["Not processed", "Processing", "Shipped", "Delivered", "Cancel"]
    }
})

module.exports = mongoose.model('orders', orderSchema)