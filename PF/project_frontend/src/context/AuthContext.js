import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokens")
            ? jwt_decode(localStorage.getItem("authTokens"))
            : null
    );

    const [loading, setLoading] = useState(true);
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [error, setError] = useState("");
    const [registerError, setRegisterError] = useState("")

    const navigate = useNavigate();

    const loginUser = async (username, password) => {
        const response = await fetch("http://127.0.0.1:8000/accounts/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username":username,
                "password":password,
            })
        })
        // data is access and refresh token
        const data = await response.json();
        console.log(data)

        if (response.status === 200) {
            setAuthTokens(data);
            // decode access token to get user info and store it in user
            setUser(jwt_decode(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data));
            setIsLoggedin(true);
            alert("successful login")
            setError(null)
            navigate("/");
        } else {
            setError("No active account found with the given credentials.");
        }
    };

    const registerUser = async (username, password, first_name, last_name, email, phone_num, avatar) => {
        const response = await fetch("http://127.0.0.1:8000/accounts/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
                first_name,
                last_name,
                email,
                phone_num,
                avatar

            })
        });

        if (response.status === 201) {
            setRegisterError(null)
            navigate("/login");
        } else {
            setRegisterError("Unable to Register. Please fill out mandatory fields.");
            alert("Unable to Register");
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        setIsLoggedin(false);
        navigate("/login");
    };

    const userProfile = async(first_name, last_name, email, phone_num, avatar) => {
        const response = await fetch("http://127.0.0.1:8000/accounts/profile/view/", {
            method: "GET",
            headers:{
                Authorization: `Bearer ${localStorage.getItem('authTokens')}`
            },
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                phone_num,
                avatar

            })
        })
    }

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
        userProfile,
        isLoggedin,
        error,
        registerError
    };

    useEffect(() => {
        if (authTokens) {
            setUser(jwt_decode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );

};
/*
const userprofile = await fetch("http://127.0.0.1:8000/accounts/profile/view/", {
    method: "GET",
    headers: {
        Authorization: `Bearer ${localStorage.getItem('authTokens')}`
    }
})*/
