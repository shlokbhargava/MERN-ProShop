import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'
import Meta from '../components/Meta'

const ShippingScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
    }

    return (
        <>
            <Meta title='Shipping' />
            <FormContainer> 
                <CheckoutSteps step1 step2 />
                <h3>Shipping Address</h3>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control as="textarea" value={address} placeholder="Enter address"  onChange={(e) => setAddress(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" value={city} placeholder="Enter City" onChange={(e) => setCity(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="postalCode">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control type="text" value={postalCode} placeholder="Enter Postal Code" onChange={(e) => setPostalCode(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text" value={country} placeholder="Enter Country" onChange={(e) => setCountry(e.target.value)} required />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Continue
                    </Button>
                </Form>
            </FormContainer>
        </>
    )
}

export default ShippingScreen
