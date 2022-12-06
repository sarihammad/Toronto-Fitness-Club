import React from 'react'
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import './Homepage.css'
import Nav from "react-bootstrap/Nav";

const HomePage = () => {
    const {user} = useContext(AuthContext);
    return (
        <>
        <div className="hero">
            <div className="hero-text">
                <div className="main-text">Your Fitness Journey Begins Here</div>
                <div className="subtext">Join us at The Toronto Fitness Club, at a location near you.</div>
                {!localStorage.getItem("authTokens") && (
                    <div className="button"><a href="/login">Begin your Journey</a></div>
                )}
                {localStorage.getItem("authTokens") && (
                    <div className="button"><a href="/studio/postcode/">Find Studios Near You</a></div>
                )}
            </div>
        </div>
        <div className="second-section">
            <div className="gym-img box"></div>
            <div className="hero-text">
            <div className="subtext-second">
                You’ve probably heard this before – motivation doesn’t last.
                It comes and goes, and when you need it most, it can be the hardest to find.
                Here at TFC, we help you to stay on track with your fitness goals -- and even reach beyond them.
            </div>
                <div className="subtext-second"> We offer classes ranging from HITT to yoga, to spin, in studios all across Toronto.
                </div>
                <div className="button"><a href="/studio/sortby/currlocation">Find Studios Near You</a></div>
            </div>

        </div>
            <div className="third-section">
                <div className="hero-text">
                    <div className="main-text-third">Explore Our Subscription Plans</div>
                    <div className="subtext-second"></div>
                </div>
            </div>
        </>
    )
}

export default HomePage