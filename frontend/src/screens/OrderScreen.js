import React, { useEffect } from 'react'
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import { getStringPrice, getDeliveryDate, getDate } from '../utility'
import { deliverOrder, getOrderDetails, payOrder } from '../actions/orderActions'
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants';
import axios from 'axios'

const OrderScreen = ({ match, history, location }) => {

    const orderId = match.params.id

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const date = () => {
        if (order.fastDeliveryPrice === 100) {
            return getDeliveryDate(1)
        } else {
            return getDeliveryDate(3)
        }
    }

    const PayByRazorPay = async() => {
        const { data: key } = await axios.get('/api/config/razorpay')

        const options = {
            key: key,
            amount: order.totalPrice * 100,
            name: 'PROSHOP',
            description: order._id,
            image: 'https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png',
            handler: function(response) {
                const responseID = response.razorpay_payment_id
                dispatch(payOrder(order._id, responseID))
            },
            prefill: {
                name: order.user.name,
                email: order.user.email,
            },
        };

        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    
    }


    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        if (!order || successPay || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET })
            localStorage.removeItem('cartItems')
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId))
        }

        if (successPay) {
            window.location.reload()
        }
        
    }, [dispatch, history, location, userInfo, orderId, order, successPay, successDeliver])

    const getEachItemTotal = (qty, price) => {
        return Number(qty * price)
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
    <>
        <Meta title='Order Summary' />
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
                                                <strong>Delivery By</strong>: {date()}
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x ₹{getStringPrice(item.price)} = ₹{getStringPrice(getEachItemTotal(item.qty, item.price))}
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        )}

                        {!order.isDelivered ? <Message variant='danger'>Not Delivered</Message> : <Message variant='success'>Delivered at: {getDate(order.deliveredAt)}</Message>}
                    </ListGroupItem>

                    <ListGroupItem>
                        <h4>2. Deliver To</h4>
                        <strong>Name: </strong>{order.user.name}<br></br>
                        <strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a><br></br>
                        <p> <strong>Address: </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city} - {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>
                    </ListGroupItem>

                    <ListGroupItem>
                        <h4>3. Payment Method</h4>
                        {order.paymentMethod}
                        {order.isPaid ? <Message variant='success'>Paid at: {getDate(order.paidAt)}</Message> : <Message variant='warning'>Payment Pending</Message>}
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
                                <Col>₹{getStringPrice(order.itemPrice)}</Col>
                            </Row>
                        </ListGroupItem>

                        {order.fastDeliveryPrice === 0 && 
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping : </Col>
                                    <Col>₹{(order.shippingPrice)}</Col>
                                </Row>
                            </ListGroupItem>
                        }
                        
                        {order.fastDeliveryPrice === 100 && 
                            <ListGroupItem>
                                <Row>
                                    <Col>Fast Delivery : </Col>
                                    <Col>₹{(order.fastDeliveryPrice)}</Col>
                                </Row>
                            </ListGroupItem>
                        }

                        <ListGroupItem>
                            <Row>
                                <Col>Tax : </Col>
                                <Col>₹{getStringPrice(order.taxPrice)}</Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Row>
                                <Col>Total : </Col>
                                <Col>₹{getStringPrice(order.totalPrice)}</Col>
                            </Row>
                        </ListGroupItem>

                        {!order.isPaid &&                         
                        <ListGroupItem>
                            {loadingPay && <Loader />}
                            <Button onClick={PayByRazorPay} block>Pay with Razorpay</Button>
                        </ListGroupItem>
                        }

                        {loadingDeliver && <Loader />}

                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroupItem>
                                <Button type='button' className='btn btn-block' onClick={deliverHandler}>Mark As Delivered</Button>
                            </ListGroupItem>
                        )}

                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
}

export default OrderScreen

    