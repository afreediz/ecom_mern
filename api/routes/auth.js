const router = require('express').Router()
const { login, register, forgetPassword } = require('../controllers/auth')

router.post('/register', register)
router.post('/login', login)
router.post('/forget-password', forgetPassword)

module.exports = router