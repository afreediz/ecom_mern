const router = require('express').Router()
const { login, register, forgetPassword } = require('../controllers/auth')

router.post('/register', register) // done
router.post('/login', login) // done
router.post('/forget-password', forgetPassword)

module.exports = router