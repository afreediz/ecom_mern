const { createCategory, getCategory, updateCategory, deleteCategory, getAllCategory } = require('../controllers/category')
const { isAuthenticated, isAdmin } = require('../middlewares/isAuth')
const router = require('express').Router()

router.get('/', getAllCategory) // done
router.get('/:slug', getCategory) // done
router.post('/', isAuthenticated, isAdmin,createCategory) // done
router.put('/:id', isAuthenticated, isAdmin, updateCategory) // done
router.delete('/:id',isAuthenticated, isAdmin, deleteCategory) // done

module.exports = router