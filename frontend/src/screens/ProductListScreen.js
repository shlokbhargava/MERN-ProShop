import React, { useEffect } from 'react'
import { Badge, Button, Col, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { deleteProduct, listProducts } from '../actions/productActions'

const ProductListScreen = ({ history }) => {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else if (userInfo && userInfo.isAdmin) {
            dispatch(listProducts())
        } else {
            history.push('/login')
        }
    }, [dispatch, userInfo, history, successDelete])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete the user')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {

    }

    return (
        <>  
            <Row className='align-align-items-center'>
                <Col className='text-left'>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-2' onClick={createProductHandler()}><i className="fas fa-plus"></i> Create Product</Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th className='text-center'>QUANTITY</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td className='text-center'>{product.countInStock > 0 ? product.countInStock : 
                                    <h5><Badge variant="danger">Out Of Stock</Badge></h5>}</td>
                                <td>₹{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <OverlayTrigger placement='top' overlay={
                                        <Tooltip>Edit</Tooltip>}>
                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                <Button variant='light' size='sm'><i className="far fa-edit"></i></Button>
                                            </LinkContainer>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement='top' overlay={
                                        <Tooltip>Delete</Tooltip>}>
                                            <Button variant='danger' size='sm' onClick={() => deleteHandler(product._id)}><i className="fas fa-trash"></i></Button>
                                    </OverlayTrigger>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>  
            )}
        </>
    )
}

export default ProductListScreen
