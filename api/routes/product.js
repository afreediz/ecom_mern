const { getAllProducts, testCreateOrder, getProduct, createProduct, getOrders, updateProduct, deleteProduct, orderStatus, getProductCount, productList, productSearch, productsRelated, categoryProducts, categoryProductsCount } = require('../controllers/product')
const { isAdmin, isAuthenticated } = require('../middlewares/isAuth')
const router = require('express').Router()

router.get('/count', getProductCount) // done
router.get('/list/:page', productList) // done
router.get('/search/:keyword', productSearch) // done
router.get('/related-products/:pid/:cid', productsRelated) // done
router.get('/category/:slug/count', categoryProductsCount) // done
router.get('/category/:slug/:page', categoryProducts) // done
router.get('/', getAllProducts) // done

// admin operations
router.post('/', isAuthenticated, isAdmin, createProduct) // done
router.put('/:id', isAuthenticated, isAdmin, updateProduct) // done
router.delete('/:id', isAuthenticated, isAdmin, deleteProduct) // done

router.get('/:slug', getProduct) // done

module.exports = router