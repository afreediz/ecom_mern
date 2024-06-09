const router = require('express').Router()
const { getUser, getAdmin, orders, allOrders, profile, updateProfile, deleteProfile, getAllUsers, userStatus, deleteUser, dashboardDetails } = require('../controllers/user')
const { isAuthenticated, isAdmin } = require('../middlewares/isAuth')

router.get('/get-user', isAuthenticated, getUser)
router.get('/profile', isAuthenticated, profile)
router.put('/profile', isAuthenticated, updateProfile)
router.delete('/profile', isAuthenticated, deleteProfile)

// admin
router.get('/get-admin', isAuthenticated, isAdmin, getAdmin)
router.get('/dashboard', isAuthenticated, isAdmin, dashboardDetails)
router.delete('/:id', isAuthenticated, isAdmin, deleteUser)
router.put('/status/:id', isAuthenticated, isAdmin, userStatus)
router.get('/all-users', isAuthenticated, isAdmin, getAllUsers)

module.exports = router