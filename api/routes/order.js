const router = require('express').Router()

const { isAuthenticated, isAdmin } = require('../middlewares/isAuth')
const { orderStatus, createOrder, userOrders, allOrders, deleteOrder } = require('../controllers/order')

router.get('/', isAuthenticated, userOrders)
router.post('/', isAuthenticated, createOrder)
router.put('/:id', isAuthenticated, orderStatus)

// feature cancel for user and delete for admin
router.get('/all', isAuthenticated, isAdmin, allOrders)
router.delete('/:id', isAuthenticated, isAdmin, deleteOrder)

module.exports = router