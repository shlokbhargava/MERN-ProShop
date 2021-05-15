import express from 'express'
import { admin, protect } from '../middlewares/authMiddleware.js'
import { getProducts, getProduct, deleteProduct } from '../controllers/productController.js'

const router = express.Router()

router.get('/', getProducts)
router.get('/:id', getProduct)
router.delete('/:id', protect, admin, deleteProduct)


export default router