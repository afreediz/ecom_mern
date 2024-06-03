const asyncErrorHandler = require("express-async-handler")
const CustomError = require('../utils/CustomError')

const User = require('../models/user')

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

// admin operations
const getAdmin = asyncErrorHandler(async(req, res)=>{
    res.status(200).json({
        success:true,
        message:"Authorized",
        authorized:true
    })
})

const getAllUsers = asyncErrorHandler(async(req, res)=>{
    const users = await User.find({}).sort({createdAt:-1})
    res.status(200).json({
        success:true,
        message:"All users",
        users
    })
})

module.exports = {getUser, getAdmin, profile, updateProfile, deleteProfile, getAllUsers }