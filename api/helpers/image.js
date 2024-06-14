const cloudinary = require('cloudinary')

const { CLOUDINARY_HOST, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env

cloudinary.config({
    cloud_name: CLOUDINARY_HOST,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
})

const uploadImage = async(image) => {
    const result = await cloudinary.uploader.upload(image, { folder: 'images' });
    return result
}

module.exports = uploadImage