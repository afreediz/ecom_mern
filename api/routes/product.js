const { getAllProducts, testCreateOrder, getProduct, createProduct, getOrders, updateProduct, deleteProduct, orderStatus, getProductCount, productList, productSearch, productsRelated, categoryProducts, categoryProductsCount, dashboardDetails } = require('../controllers/product')
const { isAdmin, isAuthenticated } = require('../middlewares/isAuth')
const router = require('express').Router()

router.get('/count', getProductCount)
router.get('/list/:page', productList)
router.get('/search/:keyword', productSearch)
router.get('/related-products/:pid/:cid', productsRelated)
router.get('/category/:slug/count', categoryProductsCount)
router.get('/category/:slug/:page', categoryProducts)
router.get('/', getAllProducts)

// admin
router.get('/dashboard', isAuthenticated, isAdmin, dashboardDetails)
router.post('/', isAuthenticated, isAdmin, createProduct)
router.put('/:id', isAuthenticated, isAdmin, updateProduct)
router.delete('/:id', isAuthenticated, isAdmin, deleteProduct)

router.get('/:slug', getProduct)

module.exports = router