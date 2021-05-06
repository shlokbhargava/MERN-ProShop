import React from 'react'
import { ProgressBar } from 'react-bootstrap'

const CheckoutProgress = ({ step1, step2, step3, step4, amount }) => {
    return (
        <p className='progress'>
            {step1 && <ProgressBar now={amount} />}
            {step2 && <ProgressBar now={amount} />}
            {step3 && <ProgressBar now={amount} />}
            {step4 && <ProgressBar now={amount} />}
        </p>
    )
}

export default CheckoutProgress
