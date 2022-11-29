import React from 'react'
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const HomePage = () => {
    const {user} = useContext(AuthContext);
    return (
        <section>
            <p>You are on TFC home page!</p>
            <p> 🚧 This website is currently under construction. 🚧 </p>
            <p>Thank you for your patience.</p>
        </section>
    )
}

export default HomePage