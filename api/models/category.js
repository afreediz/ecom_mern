const mongoose = require('mongoose')

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

module.exports = mongoose.model('categories', categorySchema)