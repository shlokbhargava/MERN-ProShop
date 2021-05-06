import React, { useState } from 'react'
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'

const PlaceOrderScreen = () => {

    const cart = useSelector(state => state.cart)
    const { cartItems, shippingAddress, paymentMethod } = cart

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const getDeliveryDate = () => {
        const day = new Date()
        const nextDay = new Date(day)
        nextDay.setDate(day.getDate() + 2)
        return nextDay.toDateString()
    }

    // Calculate Prices
    cart.itemPrice = cartItems.reduce((acc, item) => acc + item.qty*item.price, 0).toFixed(2) 
    cart.shippingPrice = (cart.itemPrice > 500 ? 0 : 100).toFixed(2)
    cart.taxPrice = (0.18 * Number(cart.itemPrice)).toFixed(2)
    cart.totalPrice = (Number(cart.itemPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    const placeOrderHandler = () => {

    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h4>1. Order Items</h4>
                            {cartItems.length === 0 ? <Message variant='danger'>Your Cart is Empty</Message> : (
                                <ListGroup variant='flush'>
                                    {cartItems.map((item, index) => (
                                        <ListGroupItem key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid thumbnail />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    <p>Quantity: {item.qty}</p>
                                                    Delivery By: {getDeliveryDate()}
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroupItem>

                        <ListGroupItem>
                            <h4>2. Deliver To</h4>
                            <b>{userInfo.name}</b> <br></br>
                            {shippingAddress.address}, <br></br>
                            {shippingAddress.city} - {shippingAddress.postalCode}, <br></br>
                            {shippingAddress.country} <br></br>
                        </ListGroupItem>

                        <ListGroupItem>
                            <h4>3. Payment Method</h4>
                            {paymentMethod}
                        </ListGroupItem>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <Card.Header as="h5" className="text-center">Order Summary</Card.Header>
                            <ListGroupItem>
                                <Row>
                                    <Col>Items : </Col>
                                    <Col>₹{cart.itemPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping : </Col>
                                    <Col>₹{cart.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Tax : </Col>
                                    <Col>₹{cart.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Total : </Col>
                                    <Col>₹{cart.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Button type='button' variant='primary' disabled={cartItems.length === 0} onClick={placeOrderHandler} block>Place Order</Button>
                            </ListGroupItem>                            
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
