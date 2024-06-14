const jwt = require('jsonwebtoken')

const generateToken = (data, expires) => {
    return jwt.sign({...data}, process.env.JWT_SECRET, { expiresIn:expires })
}

const validateToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {
    generateToken,
    validateToken
}