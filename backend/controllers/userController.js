import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc     Auth user & get token
// @route    POST /api/users/login
// @access   Public
export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        // 401 - unauthorised
        res.status(401)
        throw new Error('Invalid email or password')
    }
})


// @desc     Create a user
// @route    POST /api/users
// @access   Public
export const createUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        // 400 Bad Request
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        // 400 Bad Request
        res.status(400)
        throw new Error('Invalid user data')
    }
})



// @desc     Get user profile
// @route    GET /api/users/profile
// @access   Private
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})



// @desc      Update user profile
// @route     PUT /api/users/profile 
// @access    Private 
export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }

        const UpdatedUser = await user.save()

        res.json({
            _id: UpdatedUser._id,
            name: UpdatedUser.name,
            email: UpdatedUser.email,
            isAdmin: UpdatedUser.isAdmin,
            token: generateToken(UpdatedUser._id)
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


// @desc     Get all users
// @route    GET /api/users
// @access   Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})

    res.json(users)
})
 

// @desc     Delete user
// @route    DELETE /api/users/:id
// @access   Private/Admin
export const deleteUsers = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        await user.remove()
        res.json({ message: 'User deleted' })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


// @desc     Get user by ID
// @route    GET /api/users/:id
// @access   Private/Admin
export const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


// @desc      Update user profile
// @route     PUT /api/users/:id
// @access    Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const UpdatedUser = await user.save()

        res.json({
            _id: UpdatedUser._id,
            name: UpdatedUser.name,
            email: UpdatedUser.email,
            isAdmin: UpdatedUser.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})