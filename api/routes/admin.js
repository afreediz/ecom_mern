const router = require('express').Router()
const { isAuthenticated, isAdmin } = require('../middlewares/isAuth')

// admin operations
router.get('/get-admin', isAuthenticated, isAdmin, getAdmin) // done

// products
router.post('/products/', isAuthenticated, isAdmin, createProduct) // done
router.put('/products/:id', isAuthenticated, isAdmin, updateProduct) // done
router.delete('/products/:id', isAuthenticated, isAdmin, deleteProduct) // done

// orders
router.get('/orders', isAuthenticated, isAdmin, allOrders) // done
router.put('/orders/order-status/:id', isAuthenticated, isAdmin, orderStatus)

// categories
router.post('/category', isAuthenticated, isAdmin,createCategory) // done
router.put('/category/:id', isAuthenticated, isAdmin, updateCategory) // done
router.delete('/category/:id',isAuthenticated, isAdmin, deleteCategory) // done

// users
router.get('/users/', isAuthenticated, isAdmin, getAllUsers) // done