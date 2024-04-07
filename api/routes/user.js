const router = require('express').Router()
const { getUser, getAdmin, orders, allOrders, profile } = require('../controllers/user')
const { isAuthenticated, isAdmin } = require('../middlewares/isAuth')

router.get('/get-user', getUser)
router.get('/get-admin', getAdmin)
router.get('/orders', orders)
router.get('/profile', profile)

// admin routes
router.get('/all-orders', allOrders)

module.exports = router