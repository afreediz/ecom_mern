const asyncErrorHandler = require("express-async-handler")
const CustomError = require('../utils/CustomError')

const Order = require("../models/order")

const createOrder = asyncErrorHandler(async(req, res)=>{
    const { cart } = req.body
    await Order.create({user:req.user._id,products:cart})
    res.status(200).json({success:true, message:"Order placed successfully"})
})

const deleteOrder = asyncErrorHandler(async(req, res)=>{
    const { id } = req.params
    await Order.findByIdAndDelete(id)
    res.status(200).json({success:true, message:"Order deleted successfully"})
})

const userOrders = asyncErrorHandler(async(req, res)=>{
    const user = req.user._id
    const orders = await Order.find({user}).populate({
        path:'products.product',
        select:'name shortdesc price'
    })
    res.status(200).json({success:true, message:"Orders", orders:orders})
})

const allOrders = asyncErrorHandler(async(req, res)=>{
    const orders = await Order.find({}).populate({
        path:'products.product user',
        select:'name shortdesc price'
    }).sort({createdAt:-1})
    res.status(200).json({success:true, message:"All orders",orders:orders})
})

const orderStatus = asyncErrorHandler(async(req, res)=>{
    const { id } = req.params
    const { status } = req.body

    const order = await Order.findByIdAndUpdate(id, {status}, {new:true, runValidators:true})

    res.status(200).json({
        success:true,
        message:"Order updated succesfully",
        order
    })
})

module.exports = { orderStatus, createOrder, userOrders, allOrders, deleteOrder }