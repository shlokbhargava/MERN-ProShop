import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'

// @desc     Create new Order
// @route    POST /api/orders
// @access   Private
export const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemPrice, taxPrice, shippingPrice, fastDeliveryPrice, totalPrice } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems, 
            shippingAddress, 
            paymentMethod, 
            itemPrice, 
            taxPrice, 
            shippingPrice,
            fastDeliveryPrice, 
            totalPrice,
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})


// @desc     Get order by ID
// @route    GET /api/orders/:id
// @access   Private
export const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})


// @desc     Update order to paid
// @route    PUT /api/orders/:id/pay
// @access   Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {

    const { id } = req.body

    const order = await Order.findById(req.params.id)

    if (order) {

        order.orderItems.map(async(item) => {
            const prod = await Product.findById(item.product)
            prod.countInStock = prod.countInStock - item.qty
            await prod.save()
        })

        order.isPaid = true,
        order.paidAt = Date.now()
        order.paymentId = id

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})


// @desc     Update order to delivered
// @route    PUT /api/orders/:id/deliver
// @access   Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isDelivered = true,
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})


// @desc     Get order by USER ID
// @route    GET /api/orders/my-orders
// @access   Private
export const getMyOrders = asyncHandler(async (req, res) => {
    const pageSize = 2
    const page = Number(req.query.pageNumber) || 1

    const allOrder = await Order.find({ user: req.params.id })
    const count = allOrder.length

    const orders = await Order.find({ user: req.params.id }).limit(pageSize).skip(pageSize * (page-1))
    res.json({ orders, page, pages: Math.ceil(count / pageSize) })
})


// @desc     Get all orders
// @route    GET /api/orders
// @access   Private/Admin
export const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
})
