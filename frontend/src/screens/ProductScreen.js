import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, ListGroupItem, Form, Modal } from 'react-bootstrap'
import Rating from '../components/Rating'
import { createProductReview, listProductDetails } from '../actions/productActions'
import Spinner from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import { getStringPrice, getDate } from '../utility'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = ({history, match}) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { error: errorProductReciew, success: successProductReview } = productReviewCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (successProductReview) {
            alert('Thanks for your reviews!')
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match, successProductReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {
            rating,
            comment
        }))
    }

    return (
        <>
            <Link className='btn btn-light my-2' to='/'>
                <i className="fas fa-backward"></i> Back
            </Link>

            { loading ?  <Spinner /> : error ? <Message variant='danger'>{error}</Message> : 
            <>
                <Meta title={product.name} />
                <Row>
                    <Col md={5}>
                        <Image src={product.image} alt={product.name} onClick={handleShow} fluid />
                        <Modal show={show} onHide={handleClose} size="lg" centered>
                            <Modal.Body>
                                <Image src={product.image} alt={product.name} fluid />
                            </Modal.Body>
                        </Modal>
                    </Col>

                    <Col md={4}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ₹{getStringPrice(product.price)} 
                            </ListGroup.Item>
                            <ListGroupItem>
                                <h6>Description:</h6> {product.description}
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <ListGroupItem>
                            <Row>
                                <Col>
                                    Price:
                                </Col>
                                <Col>
                                    ₹{getStringPrice(product.price)}
                                </Col>
                            </Row> 
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>
                                    Status:
                                </Col>
                                <Col>
                                    {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'} 
                                </Col>
                            </Row>  
                        </ListGroupItem>
                        { product.countInStock > 0 && (
                            <ListGroupItem>
                                <Row>
                                    <Col>Qty:</Col>
                                    <Col>
                                        <Form.Control as="select" value={qty} onChange={(e) => 
                                        setQty(e.target.value)}>
                                            {
                                            [...Array(product.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        )}
                        <ListGroupItem>
                            <Button onClick={addToCartHandler} variant="dark" block disabled={product.countInStock === 0}>Add To Cart</Button>
                        </ListGroupItem>
                    </Col>
                </Row>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Row>
                    <Col md={5}>
                        <h4>Customer Ratings</h4>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <Rating value={product.rating} text={`${product.rating} out of 5`} />
                                <p>{product.numReviews} global ratings</p>
                            </ListGroupItem>
                        </ListGroup>

                        <ListGroup variant='flush'>
                            <h4>Review this product</h4>
                            {errorProductReciew && <Message variant='danger'>{errorProductReciew}</Message>}
                            <ListGroupItem>
                                {!userInfo ? <Link to='/login'><Button>Write a review</Button></Link> : (
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId='rating'>
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                                <option value=''>Select</option>
                                                <option value='1'>1 - Poor</option>
                                                <option value='2'>2 - Fair</option>
                                                <option value='3'>3 - Good</option>
                                                <option value='4'>4 - Very Good</option>
                                                <option value='5'>5 - Excellent</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='comment'>
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control as='textarea' row='4' placeholder='Comment Here' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                                        </Form.Group>
                                        <Button type='submit' block>
                                            Submit Review
                                        </Button>
                                    </Form>
                                )}
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={7}>
                        <h4>Top Reviews</h4>  
                        {product.reviews.length === 0 && <h6 className='text-center'><Message>No Reviews Yet</Message></h6>}
                        <ListGroup variant='flush'>
                            {product.reviews.map(review => (
                                <ListGroupItem key={review._id}>
                                    <i className="fas fa-user-circle"></i> {review.name}
                                    <Rating value={review.rating}></Rating>
                                    Reviewed on {getDate(review.createdAt)}
                                    <p className='comment'>{review.comment}</p>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            </>
            }

        </>
    )
}

export default ProductScreen