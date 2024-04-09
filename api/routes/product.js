const { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct, orderStatus, filters, filterProducts, getProductCount, productList, productSearch, relatedProducts, productsRelated, categoryProducts } = require('../controllers/product')
const { isAdmin, isAuthenticated } = require('../middlewares/isAuth')
const router = require('express').Router()

router.get('/', getAllProducts) // done
router.get('/:slug', getProduct) // done

router.get('/filters', filterProducts)
router.get('/count', getProductCount)
router.get('/list/:page', productList)
router.get('/search/:keyword', productSearch)
router.get('/related-products/:pid/:cid', productsRelated) // done
router.get('/category/:slug', categoryProducts) // done

// admin operations
router.post('/', isAuthenticated, isAdmin, createProduct) // done
router.put('/:id', isAuthenticated, isAdmin, updateProduct) // done
router.delete('/:id', isAuthenticated, isAdmin, deleteProduct) // done
router.put('/order-status/:id', isAuthenticated, isAdmin, orderStatus)

// payment routes
// router.get('/payment/token')
// router.post('/payment')

module.exports = router