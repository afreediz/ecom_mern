const asyncErrorHandler = require("express-async-handler")
const CustomError = require('../utils/CustomError')

const User = require('../models/user')

const getUser = asyncErrorHandler(async(req, res)=>{
    //
})
const orders = asyncErrorHandler(async(req, res)=>{
    //
})
const profile = asyncErrorHandler(async(req, res)=>{
    //
})

// admin operations
const getAdmin = asyncErrorHandler(async(req, res)=>{
    //
})
const allOrders = asyncErrorHandler(async(req, res)=>{
    //
})

module.exports = {getUser, getAdmin, profile, orders, allOrders }