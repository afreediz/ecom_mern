const { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct, orderStatus, filters, filterProducts, getProductCount, productList, productSearch, relatedProducts, productsRelated, categoryProducts } = require('../controllers/product')
const { isAdmin, isAuthenticated } = require('../middlewares/isAuth')
const router = require('express').Router()

router.get('/', getAllProducts)
router.get('/:slug', getProduct)

router.get('/filters', filterProducts)
router.get('/count', getProductCount)
router.get('/list/:page', productList)
router.get('/search/:keyword', productSearch)
router.get('/related-products/:pid/:cid', productsRelated)
router.get('/category/:slug', categoryProducts)

// admin operations
router.post('/', isAuthenticated, isAdmin, createProduct)
router.put('/:id', isAuthenticated, isAdmin, updateProduct)
router.delete('/:id', isAuthenticated, isAdmin, deleteProduct)
router.put('/order-status/:id', isAuthenticated, isAdmin, orderStatus)

// payment routes
// router.get('/payment/token')
// router.post('/payment')

module.exports = router