import React from 'react'
import { Card } from 'react-bootstrap'

const Product = ({ product }) => {
    return (
        <Card className="my-3 p-3 rounded">
            <a href="{`/product/${product._id}`}">
                <Card.Img src={product.image} variant='top' />
            </a>

            <Card.Body>
                <a href="{`/product/${product._id}`}">
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </a>

                <Card.Text as='div'>
                    <div className='my-3'>
                        {product.rating} <i class="fas fa-star"></i> from {product.numReviews} reviews
                    </div>
                </Card.Text>

                <Card.Text>
                    <h3><i class="fas fa-rupee-sign"></i>{product.price}</h3>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
