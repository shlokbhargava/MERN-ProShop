import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import { createOrder } from '../actions/orderActions'

const PlaceOrderScreen = ({ history }) => {

    const [show, setShow] = useState(true)

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems, shippingAddress, paymentMethod } = cart

    const getDeliveryDate = () => {
        const day = new Date()
        const nextDay = new Date(day)
        if (!show) {
            nextDay.setDate(day.getDate() + 1)
        } else {
            nextDay.setDate(day.getDate() + 3)
        }
        return nextDay.toDateString()
    }

    // Calculate Prices
    cart.itemPrice = Number(cartItems.reduce((acc, item) => acc + item.qty*item.price, 0)).toFixed(2) 
    cart.shippingPrice = Number(cart.itemPrice > 500 ? 0 : !show ? 0 : 50).toFixed(2) 
    cart.fastDeliveryPrice = Number(!show ? 100 : 0).toFixed(2)
    cart.taxPrice = (0.18 * Number(cart.itemPrice)).toFixed(2)
    cart.totalPrice = (Number(cart.itemPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice) + Number(cart.fastDeliveryPrice)).toFixed(2)


    const orderCreate = useSelector((state) => state.orderCreate)
    const { order, success, error } = orderCreate

    useEffect(() => {

        if (success) {
            history.push(`/order/${order._id}`)
        }
    }, [history, success, order])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemPrice: cart.itemPrice,
            taxPrice: cart.taxPrice,
            shippingPrice: cart.shippingPrice,
            fastDeliveryPrice: cart.fastDeliveryPrice,
            totalPrice: cart.totalPrice,
        }))
    }

    const getEachItemTotal = (qty, price) => {
        return Number(qty * price).toFixed(2)
    }

    const getFastDelivery = () => {

        return (
          <>
            {show &&
                <Alert show={show} variant="info">
                    <Alert.Heading>GET FAST DELIVERY!</Alert.Heading>
                    <p>
                        Now Get next Day Delivery at just ₹100 and zero shipping charges 
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => setShow(false)} variant="outline-info" block>
                        Avail Now
                        </Button>
                    </div>
                </Alert>
            }
      
            {!show && 
                <Alert show={!show} variant="success">
                    <Alert.Heading>CONGRATULATIONS!</Alert.Heading>
                    <p>
                        You have availed for next Day Delivery and zero shipping charges
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                    <Button onClick={() => setShow(true)} variant="outline-success" block>
                        Remove
                    </Button>
                    </div>
              </Alert>
            }
          </>
        );
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
                                                    {item.qty} x ₹{item.price} = ₹{getEachItemTotal(item.qty, item.price)}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroupItem>

                        <ListGroupItem>
                            <h4>2. Shipping</h4>
                            {/* <b>{userInfo.name}</b> <br></br> */}
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

                    {getFastDelivery()}


                    <Card>
                        <ListGroup variant='flush'>
                            <Card.Header as="h5" className="text-center">Order Summary</Card.Header>
                            <ListGroupItem>
                                <Row>
                                    <Col>Items : </Col>
                                    <Col>₹{cart.itemPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            {show && 
                                <ListGroupItem>
                                    <Row>
                                        <Col>Shipping : </Col>
                                        <Col>₹{cart.shippingPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                            }
                            {/* <ListGroupItem>
                                <Row>
                                    <Col>Shipping : </Col>
                                    <Col>₹{cart.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem> */}

                            {!show && 
                                <ListGroupItem>
                                    <Row>
                                        <Col>Fast Delivery : </Col>
                                        <Col>₹{cart.fastDeliveryPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                            }

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
                                        
                            {error && 
                                <ListGroupItem><Message variant='danger'>{error}</Message></ListGroupItem>
                            }

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
