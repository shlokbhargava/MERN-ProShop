import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({ history }) => {

    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('Razorpay')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1 className='mb-4'>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='paymentMethod'>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Form.Check type="radio" label='Pay By Razorpay' id='razorpay' name='paymentMethod' value='Razorpay' checked onChange={(e) => setPaymentMethod(e.target.value)} ></Form.Check>
                </Form.Group>
                    <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
