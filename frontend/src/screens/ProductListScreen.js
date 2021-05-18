import React, { useEffect } from 'react'
import { Badge, Button, Col, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import { getStringPrice } from '../utility'
import { createProduct, deleteProduct, listProducts } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListScreen = ({ history, match }) => {
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, pages, page } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo) {
            history.push('/login')
        }
        else if (!userInfo.isAdmin) {
            history.push('/login')
        } 
        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts('', pageNumber))
        }
    }, [dispatch, userInfo, history, successDelete, successCreate, createdProduct, pageNumber])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete the user')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    return (
        <>  
            <Row className='align-align-items-center'>
                <Col className='text-left'>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-2' onClick={createProductHandler}><i className="fas fa-plus"></i> Create Product</Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                    <Meta title='Admin | Products' />
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th className='text-center'>QUANTITY</th>
                                <th>PRICE</th>
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
                                    <td>₹{getStringPrice(product.price)}</td>
                                    <td>{product.brand}</td>
                                    <td style={{ display: 'inline-block' }}>
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
                    <Paginate pages={pages} page={page} isAdmin={true} />
                </>    
            )}
        </>
    )
}

export default ProductListScreen
