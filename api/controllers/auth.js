const asyncErrorHandler = require("express-async-handler")
const CustomError = require('../utils/CustomError')
const User = require('../models/user')
const { hashPassword, comparePassword } = require("../helpers/auth")
const { generateToken, validateToken } = require("../helpers/jwt")

const register = asyncErrorHandler(async(req, res)=>{
    const { name, email, password, address, phone } = req.body
    if(!name || !email || !password || !phone || !address ){
        throw new CustomError('Necessary details are not filled', 404)
    }

    const isExist = await User.findOne({email})
    if(isExist) throw new CustomError('User already exists, Please Login or try with a different email address')

    const token = generateToken({name, email, password, phone, address}, "1hr")

    // send(token)

    res.status(200).json({success:true, message:`Verification email has successfull sended to your email ${email}`,token})
})

const verifyUser = asyncErrorHandler(async(req, res)=>{
    const {token} = req.params
    const {name, email, password, phone, address} = validateToken(token)

    const hashedPassword = await hashPassword(password)

    await new User({
        name, email:email.toLowerCase(), password:hashedPassword, phone, address
    }).save()

    res.status(200).json({success:true, message:"User registration successfull"})
})

const login = asyncErrorHandler(async(req, res)=>{
    const {email, password} = req.body
    if(!email || !password) throw new CustomError("Necessary details are not filled", 404)

    const user = await User.findOne({email})
    if(!user) throw new CustomError("User does not exist", 404)

    if(user.status == "inactive") throw new CustomError("Your account is inactive", 400)

    if(!await comparePassword(password, user.password)) throw new CustomError("Password does not match", 400)

    const token = generateToken({_id:user._id}, "7d")

    res.status(200).json({
        success:true,
        message:"Login successfull",
        user:{
            _id:user._id,
            name:user.name,
            role:user.role
        },
        token
    })
})
const forgetPassword = asyncErrorHandler(async(req, res)=>{
    //
})

module.exports = {
    register,
    login,
    forgetPassword,
    verifyUser
}