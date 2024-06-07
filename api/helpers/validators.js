const { body, validationResult } = require('express-validator')
const asyncErrorHandler = require("express-async-handler")
const CustomError = require('../utils/CustomError')

const loginValidation = [
    body('email').isEmail(),
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
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
    body('email').isEmail().withMessage('Email is not valid'),
    body('phone').matches(/^\+?[1-9]\d{1,14}$/),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    // Middleware to handle the validation results
    asyncErrorHandler((req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Check for specific errors and throw custom errors
            errors.array().forEach(error => {
                if (error.param === 'name') {
                    throw new CustomError('Name must be at least 3 characters', 400);
                }
                if (error.param === 'email') {
                    throw new CustomError('Email is not valid', 400);
                }
                if (error.param === 'password') {
                    throw new CustomError('Password must be at least 8 characters', 400);
                }
                if (error.param === 'phone') {
                    throw new CustomError('Phone number is not valid', 400);
                }
            });
        }
        next();
    })
];

const orderValidation = [
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