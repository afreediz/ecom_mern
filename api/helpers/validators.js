const { body, validationResult } = require('express-validator')
const asyncErrorHandler = require("express-async-handler")
const CustomError = require('../utils/CustomError')

const sanitizeAllFields = (req, res, next) => {
    // Iterate over all fields in req.body and apply trim and escape
    Object.keys(req.body).forEach(key => {
        if (typeof req.body[key] === 'string') {
            req.body[key] = req.body[key].trim().replace(/[&<>"'/]/g, function (s) {
                const entityMap = {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#39;',
                    '/': '&#x2F;'
                };
                return entityMap[s];
            });
        }
    });
    next();
};

const loginValidation = [
    sanitizeAllFields,
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 1   }),
    // Middleware to handle the validation results
    asyncErrorHandler((req, res, next) => {
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            // Check for specific errors and throw custom errors
            errors.array().forEach(error => {
                if (error.path === 'email') {
                    throw new CustomError('Email is not valid', 400);
                }
                if (error.path === 'password') {
                    throw new CustomError('Password must be at least 8 characters', 400);
                }
            });
        }
        next();
    })
];

const registerValidation = [
    sanitizeAllFields,
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('phone').isMobilePhone(),
    body('password').isLength({ min: 8 }),
    // Middleware to handle the validation results
    asyncErrorHandler((req, res, next) => {
        const errors = validationResult(req);
        console.log("found ", errors);
        if (!errors.isEmpty()) {
            // Check for specific errors and throw custom errors
            errors.array().forEach(error => {
                if (error.path === 'name') {
                    throw new CustomError('Name must be at least 3 characters', 400);
                }
                if (error.path === 'email') {
                    throw new CustomError('Email is not valid', 400);
                }
                if (error.path === 'password') {
                    throw new CustomError('Password must be at least 8 characters', 400);
                }
                if (error.path === 'phone') {
                    throw new CustomError('Phone number is not valid', 400);
                }
            });
        }
        next();
    })
];

const orderValidation = [
    sanitizeAllFields,
    body('cart').isArray({ min: 1 }).withMessage('Cart must be an array with at least one item'),
    body('cart.*.product').not().isEmpty().withMessage('Product ID must not be empty'),
    body('cart.*.cart_quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    asyncErrorHandler((req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Check for specific errors and throw custom errors
            errors.array().forEach(error => {
                if (error.path === 'cart.*.id') {
                    throw new CustomError('Product ID must not be empty', 400);
                }
                if (error.path === 'cart.*.quantity') {
                    throw new CustomError('Quantity must be at least 1', 400);
                }
            });
        }
        next();
    })
];

module.exports = { loginValidation, registerValidation, orderValidation }