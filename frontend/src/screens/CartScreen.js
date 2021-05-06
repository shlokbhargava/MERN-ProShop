import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Button, Card, ListGroupItem, FormControl, Alert } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {

    const productId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    } 

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping' )
    }

    const getDeliveryDate = () => {
        const day = new Date()
        const nextDay = new Date(day)
        nextDay.setDate(day.getDate() + 2)
        return nextDay.toDateString()
    }

    return (
        <Row>
            <Col md={8}>
                { 
                    cartItems.reduce((acc, item) => acc + item.qty*item.price, 0).toFixed(3) >= 500 ? "" : cartItems.length === 0 ? "" : 
                    <Alert variant="dark">
                        <Alert.Heading>Get Free Delivery!</Alert.Heading>
                        <Message variant="dark">
                            Add items worth <b>₹{(500 - cartItems.reduce((acc, item) => acc + item.qty*item.price, 0).toFixed(2)).toFixed(2)}</b> more for free delivery 
                            &nbsp;<Link to='/'> Add Items <i class="fas fa-arrow-circle-right"></i></Link>
                        </Message>
                    </Alert>
                }
                <h1>Shopping Cart</h1>
                { cartItems.length === 0 ? 
                <Message>
                    Your Cart is empty
                    <Link to='/'> Continue Shopping <i class="fas fa-arrow-circle-right"></i></Link>
                </Message> : 
                <ListGroup>
                    { cartItems.map(item => (
                        <ListGroupItem key={item.product}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>
                                <Col md={2}>
                                    ₹{item.price}
                                </Col>
                                <Col md={2}>
                                    <FormControl as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                        {[...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </FormControl>
                                </Col>
                                <Col md={2}>
                                    <Button variant="light" onClick={() => removeFromCartHandler(item.product)}> <i class="fas fa-trash"></i> </Button>
                                </Col>
                            </Row>
                        </ListGroupItem>
                    )) }
                </ListGroup>
                }
            </Col>
            
            <Col md={4}>
                <br></br>
                <br></br>
                <Card>
                    <ListGroup variant='flush'>
                        <Card.Header as='h5'><b>Cart total : ₹{ cartItems.reduce((acc, item) => acc + item.qty*item.price, 0).toFixed(2) }</b>
                        </Card.Header>
                        <ListGroupItem>
                            <Row>
                                <Col>Quantity : </Col>
                                <Col>( {cartItems.reduce((acc, item) => acc + item.qty, 0)} items )</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Shipping Charges : </Col>
                                <Col>{ cartItems.reduce((acc, item) => acc + item.qty*item.price, 0).toFixed(2) >= 500 ? "FREE" : cartItems.length === 0 ? "" : "₹100.00"}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Delivery By : </Col>
                                <Col>{cartItems.length === 0 ? "" : getDeliveryDate()}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Button variant="primary" disabled={cartItems.length === 0} onClick={checkoutHandler} block>Proceed to Checkout</Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}


export default CartScreen
