import React, { useEffect } from 'react'
import {  Badge, Button, Card, Col, Image, ListGroup, ListGroupItem, Nav, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getMyOrders } from '../actions/orderActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const MyOrdersScreen = () => {

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const myOrder = useSelector(state => state.myOrder)
    const { loading, error, orders } = myOrder

    useEffect(() => {
        dispatch(getMyOrders(userInfo._id))
    }, [dispatch, userInfo])

    const getDate = (isoDate) => {
        return new Date(isoDate).toDateString().split(' ').slice(1).join(' ')
    }

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 

    <>
        <Row>
            <h1 className='mb-4 ml-5'>Your Orders</h1>
            <Col md={{ span: 10, offset: 1 }}>
               {orders.map((order) => (
                   <>
                    {order.isPaid ? <h5 className='mb-0'><Badge variant="success">Paid</Badge></h5> : 
                    <h5 className='mb-0'><Badge variant="danger">Not Paid</Badge></h5>}
                    {order.isDelivered && <h5 className='mb-0'><Badge variant="success">Delivered</Badge></h5>}
                    <Card className='mb-5' border={order.isPaid && order.isDelivered? 'success' : ''}>
                        <Card.Header>
                            <Row>
                                <Col md={3}>
                                    <strong>ORDER PLACED</strong> <br></br>
                                    {getDate(order.paidAt)}
                                </Col>
                                <Col md={2}>
                                    <strong>TOTAL</strong> <br></br>
                                    ₹{order.totalPrice}
                                </Col>
                                <Col md={2}>
                                    <strong>DELIVERED AT</strong> <br></br>
                                    {order.isDelivered ? order.deliveredAt : 
                                    <h5><Badge variant="danger">Not Delivered</Badge></h5>}
                                </Col>
                                <Col className="text-right">
                                    ORDER # {order._id}
                                    <Nav.Link href={`/order/${order._id}`}>View Order Details</Nav.Link>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <ListGroup variant='flush'>
                                <ListGroupItem>
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => (
                                            <ListGroupItem key={index}>
                                                <Row>
                                                    <Col md={2}>
                                                        <Image src={item.image} alt={item.name} fluid thumbnail />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                        <p></p>
                                                        <Link to={`/product/${item.product}`}>
                                                            <Button size="sm"><i className="fas fa-sync-alt"></i> &nbsp; Buy It Again</Button>
                                                        </Link>
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                        ))}
                                    </ListGroup>
                                </ListGroupItem>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                   </>
               ))}
            </Col>
        </Row>   
    </>
}

export default MyOrdersScreen
