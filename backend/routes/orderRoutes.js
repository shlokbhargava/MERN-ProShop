import express from 'express'
const router = express.Router()
import { addOrderItems, getOrderById, updateOrderToPaid } from '../controllers/orderController.js'
import { protect } from '../middlewares/authMiddleware.js' 

router.post('/', protect, addOrderItems)
router.get('/:id', protect, getOrderById)
router.put('/:id/pay', protect, updateOrderToPaid)

export default router