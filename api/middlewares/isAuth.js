const { validateToken } = require('../helpers/jwt')
const asyncErrorHandler = require("express-async-handler")
const User = require('../models/user')
const CustomError = require('../utils/CustomError')

const isAuthenticated = asyncErrorHandler(async(req, res, next) => {
    const token = req.headers.authorization
    const decoded = validateToken(token)
    const user = await User.findById(decoded._id).select('_id name role')
    if(!user) throw new CustomError("User not found")
    req.user = user
    next()
})

const isAdmin = asyncErrorHandler(async(req, res, next) => {
    const userId = req.user._id
    const user = await User.findOne({_id:userId})
    if(user.role!='admin') throw new CustomError('UnAuthorized access', 400)
    req.user = user
    next()
})

module.exports = {
    isAuthenticated,
    isAdmin
}