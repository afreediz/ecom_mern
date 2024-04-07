const asyncErrorHandler = require("express-async-handler")

const Product = require('../models/product')

const getAllProducts = asyncErrorHandler(async(req, res)=>{
    //
})
const getProduct = asyncErrorHandler(async(req, res)=>{
    //
})
const createProduct = asyncErrorHandler(async(req, res)=>{
    //
})
const updateProduct = asyncErrorHandler(async(req, res)=>{
    //
})
const deleteProduct = asyncErrorHandler(async(req, res)=>{
    //
})
const orderStatus = asyncErrorHandler(async(req, res)=>{
    //
})
const filterProducts = asyncErrorHandler(async(req, res)=>{
    //
})
const getProductCount = asyncErrorHandler(async(req, res)=>{
    //
})
const productList = asyncErrorHandler(async(req, res)=>{
    //
})
const productSearch = asyncErrorHandler(async(req, res)=>{
    //
})
const productsRelated = asyncErrorHandler(async(req, res)=>{
    //
})
const categoryProducts = asyncErrorHandler(async(req, res)=>{
    //
})

module.exports = { 
    getAllProducts, 
    getProduct, 
    createProduct, 
    updateProduct, 
    deleteProduct, 
    orderStatus, 
    filterProducts,
    getProductCount,
    productList,
    productSearch,
    productsRelated,
    categoryProducts
}