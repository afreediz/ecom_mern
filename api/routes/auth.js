const router = require('express').Router()
const { login, register, forgetPassword } = require('../controllers/auth')
const { loginValidation, registerValidation} = require('../helpers/validators')

router.post('/register', registerValidation, register) // done
router.post('/login', loginValidation, login) // done
router.post('/forget-password', forgetPassword)

module.exports = router