const { validateToken } = require('../helpers/jwt')
const asyncErrorHandler = require("express-async-handler")
const User = require('../models/user')
const CustomError = require('../utils/CustomError')

const isAuthenticated = asyncErrorHandler(async(req, res, next) => {
    const token = req.headers.authorization
    const decoded = validateToken(token)
    req.user = decoded
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