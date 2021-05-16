import express from 'express'
const router = express.Router()
import { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered } from '../controllers/orderController.js'
import { protect, admin } from '../middlewares/authMiddleware.js' 

router.post('/', protect, addOrderItems)
router.get('/', protect, admin, getOrders)
router.get('/:id', protect, getOrderById)
router.put('/:id/pay', protect, updateOrderToPaid) 
router.put('/:id/deliver', protect, admin, updateOrderToDelivered) 
router.get('/myorders/:id', protect, getMyOrders)

export default router