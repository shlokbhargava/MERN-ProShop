import express from 'express'
const router = express.Router()
import { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders } from '../controllers/orderController.js'
import { protect } from '../middlewares/authMiddleware.js' 

router.post('/', protect, addOrderItems)
router.get('/:id', protect, getOrderById)
router.post('/:id/pay', protect, updateOrderToPaid)
router.get('/my-orders/:id', protect, getMyOrders)

export default router