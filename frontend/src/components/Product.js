import React from 'react'
import { Badge, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import { getStringPrice } from '../utility'

const Product = ({ product }) => {

    return (
        <Card className="my-3 p-3 rounded">
            {product.countInStock === 1 ? <Badge variant='warning'>Only 1 left in stock</Badge> : product.countInStock === 0 && <Badge variant='danger'>Out of stock</Badge>}
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' style={{ height: '22vh' }} />
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as='div'>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </Card.Text>

                <Card.Text>
                    <h3><small>₹</small>{getStringPrice(product.price)}</h3>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
