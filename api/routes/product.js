const { getAllProducts, testCreateOrder, getProduct, createProduct, getOrders, updateProduct, deleteProduct, orderStatus, filters, filterProducts, getProductCount, productList, productSearch, productsRelated, categoryProducts, categoryProductsCount } = require('../controllers/product')
const { isAdmin, isAuthenticated } = require('../middlewares/isAuth')
const router = require('express').Router()

router.get('/filters', filterProducts) // done
router.get('/count', getProductCount) // done
router.get('/list/:page', productList) // done
router.get('/search/:keyword', productSearch) // done
router.get('/related-products/:pid/:cid', productsRelated) // done
router.get('/category/:slug/count', categoryProductsCount) // done
router.get('/category/:slug/:page', categoryProducts) // done
router.get('/', getAllProducts) // done

router.post('/test-order', isAuthenticated, testCreateOrder)
router.get('/test-getorder', isAuthenticated, getOrders)
// admin operations
router.post('/', isAuthenticated, isAdmin, createProduct) // done
router.put('/:id', isAuthenticated, isAdmin, updateProduct) // done
router.delete('/:id', isAuthenticated, isAdmin, deleteProduct) // done

router.put('/order-status/:id', isAuthenticated, isAdmin, orderStatus)

router.get('/:slug', getProduct) // done
// payment routes
// router.get('/payment/token')
// router.post('/payment')

module.exports = router