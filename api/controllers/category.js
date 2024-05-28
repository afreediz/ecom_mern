const asyncErrorHandler = require("express-async-handler")
const CustomError = require('../utils/CustomError')
const slugify = require('slugify')
const Category = require('../models/category')

const getCategory = asyncErrorHandler(async(req, res)=>{
    const { slug } = req.params
    const category = await Category.findOne({slug})

    res.status(200).json({
        success:true,
        message:"Category",
        categories
    })
})
const getAllCategory = asyncErrorHandler(async(req, res)=>{
    const categories = await Category.find({})
    res.status(200).json({
        success:true,
        message:"All categories",
        categories
    })
})
const createCategory = asyncErrorHandler(async(req, res)=>{
    const { name } = req.body
    if(!name) throw new CustomError("Necessary details are not filled", 404)

    const isExist = await Category.findOne({name})
    if(isExist) throw new CustomError("Category already exist, please choose a different name", 400)

    const category = await new Category({
        name:name,
        slug:slugify(name)
    }).save()
    
    res.status(200).json({
        success:true,
        message:"Category added successfully",
        category
    })
})
const updateCategory = asyncErrorHandler(async(req, res)=>{
    const { id } = req.params
    const { name } = req.body
    if(!name) throw new CustomError("new name must be specified to update category", 400)

    const category = await Category.findByIdAndUpdate(id, {$set:{name, slug:slugify(name)}},{new:true})

    res.status(200).json({
        success:true,
        message:"Updated successfully",
        category
    })
})
const deleteCategory = asyncErrorHandler(async(req, res)=>{
    const { id } = req.params
    await Category.findByIdAndDelete(id)

    res.status(200).json({
        success:true,
        message:"Catergory deleted successfully"
    })
})

module.exports = {
    getCategory,
    getAllCategory,
    createCategory,
    updateCategory,
    deleteCategory
}