const asyncErrorHandler = require("express-async-handler")

const User = require('../models/user')

const register = asyncErrorHandler(async(req, res)=>{
    //
})
const login = asyncErrorHandler(async(req, res)=>{
    //
})
const forgetPassword = asyncErrorHandler(async(req, res)=>{
    //
})

module.exports = {
    register,
    login,
    forgetPassword
}