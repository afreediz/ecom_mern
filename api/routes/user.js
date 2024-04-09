const router = require('express').Router()
const { getUser, getAdmin, orders, allOrders, profile, updateProfile, deleteProfile } = require('../controllers/user')
const { isAuthenticated, isAdmin } = require('../middlewares/isAuth')

router.get('/get-user', isAuthenticated, getUser) // done
router.get('/profile', isAuthenticated, profile) // done
router.put('/profile', isAuthenticated, updateProfile) // done
router.delete('/profile', isAuthenticated, deleteProfile) // done
router.get('/orders', isAuthenticated, orders)

// admin routes
router.get('/get-admin', isAuthenticated, isAdmin, getAdmin) // done
router.get('/all-orders', isAuthenticated, isAdmin,allOrders) // done

module.exports = router