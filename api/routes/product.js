const { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct, orderStatus, filters, filterProducts, getProductCount, productList, productSearch, relatedProducts, productsRelated, categoryProducts } = require('../controllers/product')

const router = require('express').Router()

router.get('/', getAllProducts)
router.get('/:id', getProduct)

// admin operations
router.post('/create', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)
router.put('/order-status/:id', orderStatus)
router.get('/filters', filterProducts)
router.get('/count', getProductCount)
router.get('/list/:page', productList)
router.get('/search/:keyword', productSearch)
router.get('/related-products/:pid/:cid', productsRelated)
router.get('/category/:slug', categoryProducts)

// payment routes
// router.get('/payment/token')
// router.post('/payment')

module.exports = router