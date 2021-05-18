import React, { useEffect } from 'react'
import {  Badge, Button, Card, Col, Image, ListGroup, ListGroupItem, Nav, PageItem, Pagination, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { getMyOrders } from '../actions/orderActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import { getStringPrice, getDate } from '../utility'

const MyOrdersScreen = ({ history, match }) => {
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const myOrder = useSelector(state => state.myOrder)
    const { loading, error, orders, pages, page } = myOrder

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            dispatch(getMyOrders(pageNumber)) 
        }
    }, [dispatch, history, userInfo, pageNumber])

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 

    <>
        <Meta title='My Orders' />
        <Row>
            <h1 className='mb-4 ml-5'>Your Orders</h1>
            <Col md={{ span: 10, offset: 1 }}>
                {orders.length === 0 && <Message>You have no oredrs yet <Link to='/'> Continue Shopping <i className="fas fa-arrow-circle-right"></i></Link></Message>}
               {orders.map(order => (
                   <>
                    {order.isPaid ? <h5 className='mb-0'><Badge variant="success">Paid</Badge></h5> : 
                    <h5 className='mb-0'><Badge variant="danger">Not Paid</Badge><Link to={`/order/${order._id}`}> Pay Now <i className="fas fa-arrow-right"></i></Link></h5>}
                    &nbsp;{order.isDelivered && <h5 className='mb-0'><Badge variant="success">Delivered</Badge></h5>}
                    <Card className='mb-5' border={order.isPaid && order.isDelivered ? 'success' : !order.isPaid && !order.isDelivered ? 'danger' : ''}>
                        <Card.Header>
                            <Row>
                                <Col md={3}>
                                    <strong>ORDER PLACED</strong> <br></br>
                                    {getDate(order.createdAt)}
                                </Col>
                                <Col md={2}>
                                    <strong>TOTAL</strong> <br></br>
                                    ₹{getStringPrice(order.totalPrice)}
                                </Col>
                                <Col md={2}>
                                    <strong>DELIVERED AT</strong> <br></br>
                                    {order.isDelivered ? getDate(order.deliveredAt) : !order.isPaid ? <h5 className='mb-0'><Badge variant="danger">Not Paid</Badge></h5> : 
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
                                <ListGroupItem key={order._id}>
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
                                                            <Button variant="outline-warning" size="sm"><i className="fas fa-sync-alt"></i> &nbsp; Buy It Again</Button>
                                                        </Link>
                                                    </Col>
                                                    <Col className='py-3' md={3}>
                                                        <Link to={`/product/${item.product}`}>
                                                            <Button variant="outline-dark" size='sm'>Write a Product Review</Button>
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
        {pages > 1 && (
            <Row className='justify-content-center'>
                <Pagination>
                    {[...Array(pages).keys()].map(x => (
                        <LinkContainer key={x+1} to={`/myorders/${x+1}`}>
                            <PageItem active={x+1 === page}>{x+1}</PageItem>
                        </LinkContainer>
                    ))}
                </Pagination>
            </Row>
        )}  
    </>
}

export default MyOrdersScreen
