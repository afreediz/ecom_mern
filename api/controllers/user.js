const asyncErrorHandler = require("express-async-handler")
const CustomError = require('../utils/CustomError')

const User = require('../models/user')
const Order = require('../models/order')

const getUser = asyncErrorHandler(async(req, res)=>{
    res.status(200).json({
        success:true,
        message:"Authorized",
        user:req.user
    })
})
const profile = asyncErrorHandler(async(req, res)=>{
    const id = req.user._id
    
    const user = await User.findById(id)
    
    res.status(200).json({
        success:true,
        message:"Profile",
        user
,    })
})
const updateProfile = asyncErrorHandler(async(req, res)=>{
    const id = req.user._id
    
    const updated_user = await User.findByIdAndUpdate(id, {...req.body},{runValidators:true, new:true})
    
    res.status(200).json({
        success:true,
        message:"Profile updated",
        user:updated_user
    })
})
const deleteProfile = asyncErrorHandler(async(req, res)=>{
    const id = req.user._id
    await User.findByIdAndDelete(id)
    
    res.status(200).json({
        success:true,
        message:"User profile deleted successfully",
    })
})
const orders = asyncErrorHandler(async(req, res)=>{
    const id = req.user._id

    const orders = await Order.find({user:id}).populate("user", "name").populate("products", "-photo")

    res.status(200).json({
        success:true,
        message:"Orders",
        orders
    })
})

// admin operations
const getAdmin = asyncErrorHandler(async(req, res)=>{
    res.status(200).json({
        success:true,
        message:"Authorized",
        authorized:true
    })
})
const allOrders = asyncErrorHandler(async(req, res)=>{
    const orders = await Order.find({}).populate("user","name").populate("products","-photo").sort({createdAt:-1})

    res.status(200).json({
        success:true,
        message:"All orders",
        orders
    })
})

module.exports = {getUser, getAdmin, profile, orders, allOrders, updateProfile, deleteProfile }