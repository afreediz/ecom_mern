const router = require('express').Router()
const authRoutes = require('./auth')
const userRoutes = require('./user')
const productRoutes = require('./product')
const categoryRoutes = require('./category')

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/products', productRoutes)
router.use('/category', categoryRoutes)

module.exports = router