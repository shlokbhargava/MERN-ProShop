import express from 'express'
import { authUser, getUserProfile, createUser, updateUserProfile, getUsers, deleteUsers, getUser, updateUser } from '../controllers/userController.js'
import { admin, protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/', createUser)
router.get('/', protect, admin, getUsers)
router.post('/login', authUser)
router.get('/profile', protect, getUserProfile)
router.put('/profile', protect, updateUserProfile)
router.delete('/:id', protect, admin, deleteUsers)
router.get('/:id', protect, admin, getUser)
router.put('/:id', protect, admin, updateUser)

export default router