import React, { useEffect } from 'react'
import { Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails } from '../actions/orderActions'

const OrderScreen = ({ match }) => {
    const orderId = match.params.id

    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const getDeliveryDate = () => {
        const day = new Date()
        const nextDay = new Date(day)
        if (order.fastDeliveryPrice === 100) {
            nextDay.setDate(day.getDate() + 1)
        } else {
            nextDay.setDate(day.getDate() + 3)
        }
        return nextDay.toDateString()
    }

    useEffect(() => {
        dispatch(getOrderDetails(orderId))
    }, [])

    const getEachItemTotal = (qty, price) => {
        return Number(qty * price).toFixed(2)
    }

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
    <>
        <h1>Order #{order._id}</h1> 
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroupItem>
                        <h4>1. Order Items</h4>
                        {order.orderItems.length === 0 ? <Message variant='danger'>Order is Empty</Message> : (
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item, index) => (
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
                                                {item.qty} x ₹{item.price} = ₹{getEachItemTotal(item.qty, item.price)}
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroupItem>

                    <ListGroupItem>
                        <h4>2. Deliver To</h4>
                        <string>{order.user.name}</string><br></br>
                        {order.user.email}<br></br>
                        {order.shippingAddress.address}, <br></br>
                        {order.shippingAddress.city} - {order.shippingAddress.postalCode}, <br></br>
                        {order.shippingAddress.country} <br></br>
                    </ListGroupItem>

                    <ListGroupItem>
                        <h4>3. Payment Method</h4>
                        {order.paymentMethod}
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
                                <Col>₹{order.itemPrice}</Col>
                            </Row>
                        </ListGroupItem>

                        {order.fastDeliveryPrice === 0 && 
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping : </Col>
                                    <Col>₹{(order.shippingPrice).toFixed(2)}</Col>
                                </Row>
                            </ListGroupItem>
                        }
                        {/* <ListGroupItem>
                            <Row>
                                <Col>Shipping : </Col>
                                <Col>₹{cart.shippingPrice}</Col>
                            </Row>
                        </ListGroupItem> */}

                        {order.fastDeliveryPrice === 100 && 
                            <ListGroupItem>
                                <Row>
                                    <Col>Fast Delivery : </Col>
                                    <Col>₹{(order.fastDeliveryPrice).toFixed(2)}</Col>
                                </Row>
                            </ListGroupItem>
                        }

                        <ListGroupItem>
                            <Row>
                                <Col>Tax : </Col>
                                <Col>₹{order.taxPrice}</Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Row>
                                <Col>Total : </Col>
                                <Col>₹{order.totalPrice}</Col>
                            </Row>
                        </ListGroupItem>

                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
}

export default OrderScreen

    