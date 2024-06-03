const router = require('express').Router()
const authRoutes = require('./auth')
const userRoutes = require('./user')
const productRoutes = require('./product')
const categoryRoutes = require('./category')
const orderRoutes = require('./order')

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/products', productRoutes)
router.use('/category', categoryRoutes)
router.use('/orders', orderRoutes)

module.exports = router