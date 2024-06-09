const { createCategory, getCategory, updateCategory, deleteCategory, getAllCategory } = require('../controllers/category')
const { isAuthenticated, isAdmin } = require('../middlewares/isAuth')
const router = require('express').Router()

router.get('/', getAllCategory)
router.get('/:slug', getCategory)
router.post('/', isAuthenticated, isAdmin,createCategory)
router.put('/:id', isAuthenticated, isAdmin, updateCategory)
router.delete('/:id',isAuthenticated, isAdmin, deleteCategory)

module.exports = router