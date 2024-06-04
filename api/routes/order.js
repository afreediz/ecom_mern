const router = require('express').Router()

const { isAuthenticated, isAdmin } = require('../middlewares/isAuth')
const { orderStatus, createOrder, userOrders, allOrders, deleteOrder, cancelOrder } = require('../controllers/order')

router.get('/', isAuthenticated, userOrders)
router.post('/', isAuthenticated, createOrder)
router.put('/cancel/:id', isAuthenticated, cancelOrder)

// feature cancel for user and delete for admin
router.put('/:id', isAuthenticated, orderStatus)
router.get('/all', isAuthenticated, isAdmin, allOrders)
router.delete('/:id', isAuthenticated, isAdmin, deleteOrder)

module.exports = router