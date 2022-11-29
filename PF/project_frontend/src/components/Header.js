import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../context/AuthContext'


const Header = () => {
    const {logoutUser} = useContext(AuthContext) ?? {}
    const isLoggedin = useContext(AuthContext)
    //const { user } = useContext(AuthContext)

    return (
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
            {!isLoggedin && (
                <>
                <span>  |  </span>
                <Link to="/login" >Login</Link>
                <span>  |  </span>
                <Link to="/register">Register</Link>
                </>
            )}

        </div>
    )
}

export default Header