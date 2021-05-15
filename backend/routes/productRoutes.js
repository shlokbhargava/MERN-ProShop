import express from 'express'
import { admin, protect } from '../middlewares/authMiddleware.js'
import { getProducts, getProduct, deleteProduct, updateProduct, createProduct } from '../controllers/productController.js'

const router = express.Router()

router.get('/', getProducts)
router.post('/', protect, admin, createProduct)
router.get('/:id', getProduct)
router.delete('/:id', protect, admin, deleteProduct)
router.put('/:id', protect, admin, updateProduct)


export default router