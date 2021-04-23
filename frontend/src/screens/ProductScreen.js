import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'

const ProductScreen = ({match}) => {
    
    const [product, setProduct] = useState([])

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${match.params.id}`)

            setProduct(data)
        }

        fetchProduct()
    }, [])
    
    return (
        <>
            <Link className='btn btn-light my-2' to='/'>
                <i class="fas fa-backward"></i> Back
            </Link>
            <Row>
                <Col md={5}>
                    <Image src={product.image} alt={product.name} fluid />
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
                            Price: ₹{product.price} 
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
                                ₹{product.price}
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
                    <ListGroupItem>
                        <Button variant="dark" block disabled={product.countInStock === 0}>Add To Cart</Button>
                    </ListGroupItem>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen
