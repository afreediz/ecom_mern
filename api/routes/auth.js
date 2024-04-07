const router = require('express').Router()
const { login, register, forgetPassword } = require('../controllers/auth')

router.post('/register', login)
router.post('/login', register)
router.post('/forget-password', forgetPassword)

module.exports = router