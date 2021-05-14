import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>ProShop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart"></i> Cart 
                                    <Badge variant="dark">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</Badge>
                                </Nav.Link> 
                            </LinkContainer>
                            {userInfo && userInfo.isAdmin && 
                                <NavDropdown title='Admin Menu' id='adminmenu'>
                                    <NavDropdown.Item href="/admin/userlist">Users</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/admin/orderlist">Orders</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/admin/productlist">Products</NavDropdown.Item>
                                </NavDropdown>}
                            { userInfo ? (
                                <NavDropdown title={userInfo.name} id="username">
                                    <NavDropdown.Item href="/profile"><i className="fas fa-user-circle"></i> Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    {userInfo && !userInfo.isAdmin &&                                     <NavDropdown.Item href="/myorders"><i className="fas fa-box-open"></i> Orders</NavDropdown.Item>}
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={() => logoutHandler()}><i className="fas fa-sign-out-alt"></i> Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) :
                            <LinkContainer to='/login'>
                                <Nav.Link><i className="fas fa-sign-in-alt"></i> Sign In</Nav.Link>
                            </LinkContainer> 
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
