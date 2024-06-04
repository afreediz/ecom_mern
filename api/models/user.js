const mongoose = require('mongoose')
const Order = require('./order')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'active'
    }
}, {timestamps:true})

userSchema.pre('deleteOne', { document: false, query: true }, async function(next) {
    try {
        await Order.deleteMany({ user: this._conditions._id });
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('users', userSchema)