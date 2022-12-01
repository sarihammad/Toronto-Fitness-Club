import React from 'react'
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const HomePage = () => {
    const {user} = useContext(AuthContext);
    return (
        <div className="hero">
            <hr />
            <p className="text-center">You are on TFC home page!</p>
            <p className="text-center"> 🚧 This website is currently under construction. 🚧 </p>
            <p className="text-center" >Thank you for your patience.</p>
            <hr />
        </div>
    )
}

export default HomePage