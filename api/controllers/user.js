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
    await User.deleteOne({_id:id})
    
    res.status(200).json({
        success:true,
        message:"User profile deleted successfully",
    })
})
const deleteUser = asyncErrorHandler(async(req, res)=>{
    const id = req.params.id
    await User.deleteOne({_id:id})
    
    res.status(200).json({
        success:true,
        message:"User deleted successfully",
    })
})
const userStatus = asyncErrorHandler(async(req, res)=>{
    const { id } = req.params
    const { status } = req.body

    const user = await User.findByIdAndUpdate(id, {status}, {new:true, runValidators:true})

    res.status(200).json({
        success:true,
        message:"User updated succesfully",
        user
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
const dashboardDetails = asyncErrorHandler(async(req, res)=>{
    const users_count = await User.estimatedDocumentCount()
    const users = await User.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                number_of_users: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                day: "$_id",
                number_of_users: 1
            }
        },
        {
            $sort: { day: 1 }
        },
        {
            $limit: 20
        }
    ]);
    res.status(200).json({
        success:true,
        message:"Dashboard details",
        users_count,
        users
    })
})

module.exports = {getUser, getAdmin, profile, updateProfile, deleteProfile, getAllUsers, userStatus, deleteUser, dashboardDetails }