const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')
const cloudinary = require('cloudinary')

const { CLOUDINARY_HOST, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env

// const CLOUDINARY_API_KEY = '264957389244962'
// const CLOUDINARY_API_SECRET = 'fu1gosft4jHkioOPbBCKLzSIpSg'
// const CLOUDINARY_HOST = 'ddxcbmdpv'

cloudinary.config({
    cloud_name: CLOUDINARY_HOST,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
})

console.log({ CLOUDINARY_HOST, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET })

// cloudinary.uploader.upload('./bla.png', { folder: 'images' }, (error, result) => {
//     if (error) {
//       console.error('Error:', error);
//     } else {
//       console.log('Success:', result);
//     }
// });


const cloudinaryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
            folder: 'images',
            public_id: (req, file) => file.originalname,
    }
})
// module.exports = cloudinaryStorage
const upload = multer({ storage: cloudinaryStorage })

module.exports = upload