import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
    //const {logoutUser} = useContext(AuthContext) ?? {}
    function logout(){
        localStorage.removeItem("authTokens");
        alert("You logged out")
    }
    return (
        <Navbar bg="light" expand="lg" className="nav">
            <Container>
                <Navbar.Brand href="/">Toronto Fitness Club</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/studio/currlocation">Find Studios</Nav.Link>
                        {localStorage.getItem("authTokens") && (
                            <>
                            <NavDropdown title="Profile" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/profile/view">View Profile</NavDropdown.Item>
                                <NavDropdown.Item href="/profile/edit">
                                    Edit Profile
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/login" onClick={logout}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                            </>
                        )}
                        {!localStorage.getItem("authTokens") && (
                            <>
                                <Nav.Link href="/login" >Login</Nav.Link>
                                <Nav.Link href="/register">Register</Nav.Link>
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