import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { Route, Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
    //const {logoutUser} = useContext(AuthContext) ?? {}
    function logout(){
        localStorage.removeItem("authTokens");
        window.location.reload();
    }
    return (
        <Navbar sticky="top"  expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} activeStyle={{}} to='/'>Toronto Fitness Club</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} activeStyle={{}} to='/'>Home</Nav.Link>
                        <NavDropdown title="Find Studios" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} activeStyle={{}} to='/studio/postcode/'>Sort by Postal Code</NavDropdown.Item>
                            <NavDropdown.Item as={Link} activeStyle={{}} to="/studio/map">Sort by Pinpoint</NavDropdown.Item>
                            <NavDropdown.Item as={Link} activeStyle={{}} to="/studio/sortby/currlocation">View All Studios</NavDropdown.Item>
                        </NavDropdown>
                        {localStorage.getItem("authTokens") && (
                            <>
                            <Nav.Link as={Link} activeStyle={{}} to="/class/schedule">My Schedule</Nav.Link>
                            <Nav.Link as={Link} activeStyle={{}} to="/class/history">My History</Nav.Link>
                            <Nav.Link as={Link} activeStyle={{}} to="/subscriptions/subscribe/">Card Page</Nav.Link>
                            <NavDropdown title="Profile" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} activeStyle={{}} to="/profile/view">View Profile</NavDropdown.Item>
                                <NavDropdown.Item as={Link} activeStyle={{}} to="/profile/edit">
                                    Edit Profile
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} activeStyle={{}} to="/login" onClick={logout}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                            </>
                        )}
                        {!localStorage.getItem("authTokens") && (
                            <>
                                <Nav.Link as={Link} activeStyle={{}} to="/login" >Login</Nav.Link>
                                <Nav.Link as={Link} activeStyle={{}} to="/register">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
/*

const Header = () => {
    const {logoutUser} = useContext(AuthContext) ?? {}
    const isLoggedin = useContext(AuthContext)
    //const { user } = useContext(AuthContext)

    //console.log(localStorage.getItem("authTokens"))
    return (
        <Navbar bg="light">
            <Container>
            <Navbar.Brand href="/">TFC</Navbar.Brand>
                    <Nav className="me-auto">
                        <div>
                        <Link to="/">Home</Link>
                        {localStorage.getItem("authTokens") && (
                            <>
                            <span>  |  </span>
                            <Link to="/profile/view">Profile</Link>
                            <span>  |  </span>
                            <Link to="/profile/edit">Edit Profile</Link>
                            <span>  |  </span>
                            <Link to="/studio/currlocation">Sort Studios</Link>
                            <span>  |  </span>
                            <Link to="/login" onClick={logoutUser}>Logout</Link>
                            </>
                        )}
                        {!localStorage.getItem("authTokens") && (
                            <>
                            <span>  |  </span>
                            <Link to="/login" >Login</Link>
                            <span>  |  </span>
                            <Link to="/register">Register</Link>
                            </>
                        )}

                    </div>
                </Nav>
        </Container>
        </Navbar>
    )
}
*/

//export default Header