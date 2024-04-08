const mongoose = require('mongoose')

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
    answer:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
}, {timestamps:true})

module.exports = mongoose.model('users', userSchema)