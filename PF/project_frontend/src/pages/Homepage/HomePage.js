import React from 'react'
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import './Homepage.css'

const HomePage = () => {
    const {user} = useContext(AuthContext);
    return (
        <div className="hero">
            <div className="hero-text">
                <div className="main-text">Your Fitness Journey Begins Here</div>
                <div className="subtext"><p>Join us at The Toronto Fitness Club, at a location near you.</p></div>
                <div className="button"><a href="/login">Begin your Journey</a></div>
            </div>
        </div>
    )
}

export default HomePage