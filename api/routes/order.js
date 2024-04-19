const router = require('express').Router()

const { isAuthenticated, isAdmin } = require('../middlewares/isAuth')
const { orderStatus, createOrder, userOrders, allOrders, deleteOrder, cancelOrder, dashboardDetails } = require('../controllers/order')
const { orderValidation } = require('../helpers/validators')

router.get('/', isAuthenticated, userOrders)
router.post('/', isAuthenticated, orderValidation, createOrder)
router.put('/cancel/:id', isAuthenticated, cancelOrder)

// admin
router.get('/all', isAuthenticated, isAdmin, allOrders)
router.get('/dashboard', isAuthenticated, isAdmin, dashboardDetails)
router.put('/:id', isAuthenticated, orderStatus)
router.delete('/:id', isAuthenticated, isAdmin, deleteOrder)

module.exports = router