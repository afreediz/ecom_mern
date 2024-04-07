const asyncErrorHandler = require("express-async-handler")

const Product = require('../models/product')

const getCategory = asyncErrorHandler(async(req, res)=>{
    //
})
const createCategory = asyncErrorHandler(async(req, res)=>{
    //
})
const updateCategory = asyncErrorHandler(async(req, res)=>{
    //
})
const deleteCategory = asyncErrorHandler(async(req, res)=>{
    //
})

module.exports = {
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}