import express from 'express'
import { authUser, getUserProfile, createUser } from '../controllers/userController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/', createUser)
router.post('/login', authUser)
router.get('/profile', protect, getUserProfile)

export default router