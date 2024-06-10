const asyncErrorHandler = require("express-async-handler")
const CustomError = require('../utils/CustomError')
const slugify = require('slugify')

const Product = require('../models/product')
const Category = require("../models/category")

const getAllProducts = asyncErrorHandler(async(req, res)=>{
    const products = await Product.find({}).populate('category').select('_id name shortdesc price slug').sort({createdAt:-1})

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
    const { name, description, price, category, quantity, photo, shipping, shortdesc } = req.body
    console.log(req.body);
    if( !name || !description || !price || !category || !shortdesc) throw new CustomError('Necessary details are not filled', 404)

    const product = await new Product({name, slug:slugify(name), shortdesc,description, price, category, quantity, photo, shipping}).save()

    res.status(200).json({
        success:true,
        message:"Product added successfully",
        product
    })
})
const updateProduct = asyncErrorHandler(async(req, res)=>{
    const id = req.params.id

    const product = await Product.findByIdAndUpdate(id, {$set:{...req.body}}, {runValidators:true, new:true})

    res.status(200).json({
        success:true,
        message:"Product updated successfully",
        product
    })
})
const deleteProduct = asyncErrorHandler(async(req, res)=>{
    const id = req.params.id
    console.log('deleting ', id);
    await Product.findByIdAndDelete(id)

    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    })
})
const filterProducts = asyncErrorHandler(async(req, res)=>{
    const { checked, radio } = req.body;
    let args = {}
    if(checked.length > 0) args.category = checked
    if(radio.length) args.price = {$gte:radio[0], $lte:radio[1]}
    const products = await Product.find(args)
    res.status(200).json({
        success:true,
        message:"Filtered products",
        products
    })
})
const getProductCount = asyncErrorHandler(async(req, res)=>{
    const total = await Product.find({}).estimatedDocumentCount()
    res.status(200).json({
        success:true,
        message:"Total count",
        total
    })
})
const productList = asyncErrorHandler(async(req, res)=>{
    const perPage = 8
    const page = req.params.page? req.params.page : 1
    const products = await Product.find({})
    .select('-photo')
    .skip((page - 1)*perPage)
    .limit(perPage)
    .sort({createdAt:-1})
    res.status(200).json({
        success:true,
        message:`Products of page ${page}`,
        products
    })
})
const productSearch = asyncErrorHandler(async(req, res)=>{
    const { keyword } = req.params
    const products = await Product.find({
        $or:[
            {name:{$regex:keyword, $options:'i'}},
            {description:{$regex:keyword, $options:'i'}},
            {shortdesc:{$regex:keyword, $options:'i'}}
        ]
    })
    res.status(200).json({
        success:true,
        message:"Result",
        products
    })
})
const productsRelated = asyncErrorHandler(async(req, res)=>{
    const { pid, cid } = req.params
    const products = await Product.find({
        category:cid,
        _id:{$ne:pid}
    }).limit(5)
    res.status(200).json({
        success:true,
        message:"Related Products",
        products
    })
})
const categoryProducts = asyncErrorHandler(async(req, res)=>{
    const { slug } = req.params
    const perPage = 8
    const page = req.params.page? req.params.page : 1

    const category = await Category.findOne({slug})
    if(!category) throw new CustomError("Invalid category", 404)

    const products = await Product.find({category:category._id})
    .populate('category')
    .select('-photo')
    .skip((page - 1)*perPage)
    .limit(perPage)
    .sort({createdAt:-1})

    res.status(200).json({
        success:true,
        message:`Products of category : ${category.name}`,
        products
    })
})
const categoryProductsCount = asyncErrorHandler(async(req, res)=>{
    const { slug } = req.params
    const category = await Category.findOne({slug})
    if(!category) throw new CustomError("Invalid category", 404)
    const total = await Product.find({category:category._id}).count()
    res.status(200).json({
        success:true,
        message:`number of products of category : ${slug}`,
        total
    })
})
const dashboardDetails = asyncErrorHandler(async(req, res)=>{
    const products_count = await Product.estimatedDocumentCount()
    const products = await Product.aggregate([
        {
            $group: {
                _id: "$category",
                number_of_products: { $sum: 1 }
            }
        },
        {
            $lookup: {
                from: "categories", // the collection name for Category model
                localField: "_id",
                foreignField: "_id",
                as: "categoryDetails"
            }
        },
        {
            $unwind: "$categoryDetails"
        },
        {
            $project: {
                _id: 0,
                category: "$categoryDetails.slug",
                number_of_products: 1
            }
        },
        {
            $sort: { number_of_products: -1 }
        },
        {
            $limit: 20
        }
    ]);
    res.status(200).json({
        success:true,
        message:"Dashboard product details",
        products_count,
        products
    })
})
module.exports = { 
    getAllProducts, 
    getProduct, 
    createProduct, 
    updateProduct, 
    deleteProduct, 
    filterProducts,
    getProductCount,
    productList,
    productSearch,
    productsRelated,
    categoryProducts,
    categoryProductsCount,
    dashboardDetails
}