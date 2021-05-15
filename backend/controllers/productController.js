import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


// @desc     Fetch all products
// @route    GET /api/products
// @access   Public
export const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})


// @desc     Fetch a single product
// @route    GET /api/products/:id
// @access   Public
export const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found') 
    }
})


// @desc     Delete a single product
// @route    DELETE /api/products/:id
// @access   Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        await product.remove()
        res.json({ 
            message: 'Product Deleted'
        })
    } else {
        res.status(404)
        throw new Error('Product not found') 
    }
})


// @desc     Create a product
// @route    POST /api/products
// @access   Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        user: req.user._id,
        name: 'Sample name',
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample Category',
        description: 'Sample description',
        price: 0,
        countInStock: 0, 
        numReviews: 0,
    })

    const createdProduct = await product.save()

    res.status(201).json(createdProduct)
})


// @desc     Update a product
// @route    PUT /api/products/:id
// @access   Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {

    const { name, price, description, image, brand, category, countInStock } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

