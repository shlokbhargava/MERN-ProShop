import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem, FormControl, Alert } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'

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
        console.log('remove')
    } 

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
            {/* { 
                cartItems.reduce((acc, item) => acc + item.qty*item.price, 0).toFixed(3) >= 500 ? "Ge" :       AlertDismissibleExample()
            } */}
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
                <Card border="dark">
                    <Card.Header as="h5"><b>total amount : &nbsp;₹ { cartItems.reduce((acc, item) => acc + item.qty*item.price, 0).toFixed(3) }</b></Card.Header>
                    <Card.Body>
                        <Card.Text>Quantity : &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;( {cartItems.reduce((acc, item) => acc + item.qty, 0)} items )</Card.Text>
                        <Card.Text>
                            Delivery Charges : &emsp;&emsp;&emsp;&emsp; { cartItems.reduce((acc, item) => acc + item.qty*item.price, 0).toFixed(3) >= 500 ? "FREE" : "₹50"}
                        </Card.Text>
                        <Card.Text>
                            Delivery By : &emsp;
                        </Card.Text>
                        <Button variant="primary" disabled={cartItems.length === 0} onClick={checkoutHandler} block>Proceed to Checkout</Button>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}


function AlertDismissibleExample() {
    const [show, setShow] = useState(true);

    if (show) {
    return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
            Change this and that and try again. Duis mollis, est non commodo
            luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
            Cras mattis consectetur purus sit amet fermentum.
        </p>
        </Alert>
    );
    }
    // return <Button onClick={() => setShow(true)}></Button>;
}

export default CartScreen
