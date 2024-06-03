const mongoose = require('mongoose')
const Product = require('./product')

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        lowercase:true
    }
})

categorySchema.pre('deleteOne', { document: false, query: true }, async function(next) {
    try {
        await Product.deleteMany({ category: this._conditions._id });
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('categories', categorySchema)