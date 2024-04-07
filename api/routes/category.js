const { createCategory, getCategory, updateCategory, deleteCategory } = require('../controllers/category')

const router = require('express').Router()

router.get('/', getCategory)
router.post('/', createCategory)
router.put('/', updateCategory)
router.delete('/', deleteCategory)

module.exports = router