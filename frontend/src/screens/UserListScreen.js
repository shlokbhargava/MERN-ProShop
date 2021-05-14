import React, { useEffect } from 'react'
import { Badge, Button, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers } from '../actions/userActions'

const UserListScreen = () => {

    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    useEffect(() => {
        dispatch(listUsers())
    }, [dispatch])

    const deleteHandler = () => {

    }

    return (
        <>
            <h1>Users</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td>{user.isAdmin ? <h5><Badge variant="success">Admin</Badge></h5> : <h5><Badge variant="danger">Not Admin</Badge></h5>}</td>
                                <td>
                                    <LinkContainer to={`/user/${user._id}/edit`}>
                                        <OverlayTrigger key='top' placement='top' overlay={
                                            <Tooltip id='top'>Edit</Tooltip>}>
                                            <Button variant='light' size='sm'><i className="far fa-edit"></i></Button>
                                        </OverlayTrigger>
                                    </LinkContainer>
                                    <OverlayTrigger key='top' placement='top' overlay={
                                            <Tooltip id='top'>Delete</Tooltip>}>
                                            <Button variant='danger' size='sm' onClick={() => deleteHandler(user._id)}><i className="fas fa-trash"></i></Button>
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

export default UserListScreen