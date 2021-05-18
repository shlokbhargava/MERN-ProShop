import React, { useEffect } from 'react'
import { Badge, Button, Table, } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { getStringPrice, getDate } from '../utility'
import { listOrders } from '../actions/orderActions'

const OrderListScreen = ({ history }) => {

    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
       // dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo) {
            history.push('/login')
        }
        else if (!userInfo.isAdmin) {
            history.push('/login')
        } 
        else {
            dispatch(listOrders())
        }
    }, [dispatch, userInfo, history])

    return (
        <>  
            <h1>Orders</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                    <Meta title='Admin | Orders' />
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>USER</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>DELIVERY</th>
                                <th>PAYMENT METHOD</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                (order.isPaid && 
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user && order.user.name}</td>
                                        <td>{getDate(order.createdAt)}</td>
                                        <td>₹{getStringPrice(order.totalPrice)}</td>
                                        <td>{order.isDelivered ? <h5 className='mb-0'><Badge variant="success">Delivered</Badge>
                                        </h5> : <h5 className='mb-0'><Badge variant="danger">Not Delivered</Badge></h5>}</td>
                                        <td>{order.paymentMethod}</td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button variant='light' size='sm'>
                                                    View
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                )
                            ))}
                        </tbody>
                    </Table>  
                </>
            )}
        </>
    )
}

export default OrderListScreen

