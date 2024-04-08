const asyncErrorHandler = require("express-async-handler")
const CustomError = require('../utils/CustomError')
const slugify = require('slugify')

const Product = require('../models/product')

const getAllProducts = asyncErrorHandler(async(req, res)=>{
    const products = await Product.find({}).populate('category').select('-photo').sort({createdAt:-1})

    res.status(200).json({
        success:true,
        message:"All products",
        products,
        countTotal:products.length
    })
})
const getProduct = asyncErrorHandler(async(req, res)=>{
    const slug = req.params.slug
    const product = await Product.findOne({slug}).populate('category').select('-photo')

    res.status(200).json({
        success:true,
        message:"Product",
        product
    })
})
const createProduct = asyncErrorHandler(async(req, res)=>{
    const { name, description, price, category, quantity, photo, shipping } = req.body
    if( !name || !description || !price || !category) throw new CustomError('Necessary details are not filled', 404)

    const product = await new Product({name, slug:slugify(name), description, price, category, quantity, photo, shipping}).save()

    res.status(200).json({
        success:true,
        message:"Product added successfully",
        product
    })
})
const updateProduct = asyncErrorHandler(async(req, res)=>{
    const id = req.params.pid
    const { name, description, price, category, quantity, photo, shipping } = req.body
    if( !name || !description || !price) throw new CustomError('Necessary details are not filled', 404)

    const product = await Product.findByIdAndUpdate(id, {$set:{name, des}}, {runValidators:true})

    res.status(200).json({
        success:true,
        message:"Product updated successfully",
        product
    })
})
const deleteProduct = asyncErrorHandler(async(req, res)=>{
    const id = req.params.pid
    await Product.findByIdAndDelete(id).select('-photo')

    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    })
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