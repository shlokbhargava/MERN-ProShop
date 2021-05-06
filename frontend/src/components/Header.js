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
                                    <i class="fas fa-shopping-cart"></i> Cart 
                                    <Badge variant="dark">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</Badge>
                                </Nav.Link> 
                            </LinkContainer>
                            { userInfo ? (
                                <NavDropdown title={userInfo.name} id="username">
                                    <NavDropdown.Item href="/profile"><i class="fas fa-user-circle"></i> Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/"><i class="fas fa-box-open"></i> Orders</NavDropdown.Item>
                                    {/* <NavDropdown.Item href="/"></NavDropdown.Item> */}
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={() => logoutHandler()}><i class="fas fa-sign-out-alt"></i> Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) :
                            <LinkContainer to='/login'>
                                <Nav.Link><i class="fas fa-sign-in-alt"></i> Sign In</Nav.Link>
                            </LinkContainer> }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
