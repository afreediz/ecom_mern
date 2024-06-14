const asyncErrorHandler = require("express-async-handler")
const CustomError = require('../utils/CustomError')
const User = require('../models/user')

const { hashPassword, comparePassword } = require("../helpers/auth")
const { generateToken, validateToken } = require("../helpers/jwt")
const { sendVerificationEmail, sendResetPasswordEmail } = require("../helpers/mail")

const register = asyncErrorHandler(async(req, res)=>{
    const { name, email, password, address, phone } = req.body
    if(!name || !email || !password || !phone || !address ){
        throw new CustomError('Necessary details are not filled', 404)
    }

    const isExist = await User.findOne({email})
    if(isExist) throw new CustomError('User already exists, Please Login or try with a different email address')

    const token = generateToken({name, email, password, phone, address}, "1hr")

    const verification_link = `${process.env.BACKEND}/api/auth/verify/${token}`

    await sendVerificationEmail(email, verification_link)

    res.status(200).json({success:true, message:`Verification email has successfull sended to your email ${email}`,token})
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
    const {email} = req.body
    if(!email) throw new CustomError("Necessary details are not filled", 404)

    const user = await User.findOne({email})
    if(!user) throw new CustomError("User does not exist", 404)

    const token = generateToken({_id:user._id}, "1hr")

    const reset_link = `${process.env.FRONTEND}/change-password/${token}`

    await sendResetPasswordEmail(email, reset_link)

    res.status(200).json({success:true, message:`Reset link has been sent to your email ${email}`})
})

const changePassword = asyncErrorHandler(async(req, res)=>{
    const {password, token} = req.body
    const {_id} = validateToken(token)

    const hashedPassword = await hashPassword(password)
    await User.findByIdAndUpdate(_id, {password:hashedPassword})

    res.status(200).json({success:true, message:"Password changed successfully"})
})

const verifyUser = asyncErrorHandler(async(req, res)=>{
    const {token} = req.params
    const {name, email, password, phone, address} = validateToken(token)
    try{
        const hashedPassword = await hashPassword(password)

        await new User({
            name, email:email.toLowerCase(), password:hashedPassword, phone, address
        }).save()
    
        res.status(200).send(`
            <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verification Successful</title>
        <style>
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
            }
            .container {
                text-align: center;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 10px;
                background-color: #fff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .container h1 {
                color: #1a1a1a;
            }
            .container p {
                margin: 20px 0;
                font-size: 18px;
            }
            .container a {
                display: inline-block;
                padding: 10px 20px;
                text-decoration: none;
                color: #fff;
                background-color: #1a1a1a;
                border-radius: 5px;
                transition: background-color 0.3s ease;
            }
            .container a:hover {
                background-color: #1a1a2a;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Verification Successful</h1>
            <p>Your email has been successfully verified.</p>
            <a href="${process.env.FRONTEND}/login">Click here to login</a>
        </div>
    </body>
    </html>
    
            `)
    }catch(err){
        res.status(400).send(`
             <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verification Successful</title>
        <style>
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
            }
            .container {
                text-align: center;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 10px;
                background-color: #fff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .container h1 {
                color: #1a1a1a;
            }
            .container p {
                margin: 20px 0;
                font-size: 18px;
            }
            .container a {
                display: inline-block;
                padding: 10px 20px;
                text-decoration: none;
                color: #fff;
                background-color: #1a1a1a;
                border-radius: 5px;
                transition: background-color 0.3s ease;
            }
            .container a:hover {
                background-color: #1a1a2a;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Verification unuccessful</h1>
            <p>Opps! Something went wrong.</p>
            <a href="${process.env.FRONTEND}/register">Click here to go back to register page</a>
        </div>
    </body>
    </html>
            `)
    }
})

module.exports = {
    register,
    login,
    forgetPassword,
    verifyUser,
    changePassword
}