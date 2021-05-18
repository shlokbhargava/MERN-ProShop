import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, CarouselItem, Col, Image, Row } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { getStringPrice } from '../utility'
import { listTopProducts } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'

const ProductCarousel = () => {
    const  dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const { loading, error, products } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Carousel pause='hover' className='bg-dark' style={{ height: '45vh auto' }}>
            {products.map(product => (
                <CarouselItem key={product._id} style={{ height: '45vh auto'}}>
                    <Link to={`/product/${product._id}`}>
                        <Row>
                            <Col md={5}>
                                <Image src={product.image} alt={product.name} style={{ height: '45vh auto' }} fluid></Image>
                            </Col>
                            <Col className="d-none d-md-block" md={7}>                                
                                <Carousel.Caption className='carousel-caption'>
                                    <h2>{product.name} (<small>₹</small>{getStringPrice(product.price)})</h2>
                                </Carousel.Caption>
                            </Col>
                        </Row>
                    </Link>
                </CarouselItem>
            ))}
        </Carousel>
    )
}

export default ProductCarousel
