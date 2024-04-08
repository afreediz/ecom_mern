const jwt = require('jsonwebtoken')

const generateToken = (data) => {
    return jwt.sign({...data}, process.env.JWT_SECRET, { expiresIn:'7d' })
}

const validateToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {
    generateToken,
    validateToken
}