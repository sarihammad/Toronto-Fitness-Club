import React, {useContext, useState, useEffect} from "react";
import AuthContext from "../context/AuthContext";
import Button from "react-bootstrap/Button";
import {Link, useParams, Navigate} from "react-router-dom";
import Map from "../components/Map";
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';

const SubscriptionsPage = () => {
    const {id} = useParams();
    let [subscriptionsList, setSubscriptions] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)
    const [authenticated, setauthenticated] = useState(null);
    const [loginError, setLoginError] = useState(false)

    useEffect(() => {
        getSubscriptionInfo()
    },[]);

    // useEffect(() => {
    //     const loggedInUser = localStorage.getItem("authenticated");
    //     if (loggedInUser) {
    //     setauthenticated(loggedInUser);
    //     }
    // }, []);

    // var button_path;

    // if (!authenticated) {
    //     button_path = "/login";
    // } else {
    //     button_path = "/home";
    // }
        

    let getSubscriptionInfo = async() => {
        let response = await fetch(`http://127.0.0.1:8000/subscriptions/memberships/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        let data = await response.json()
        if (response.status === 200){
            console.log(data)
            setSubscriptions(data.results)
        }else if (response.status === 401){
            setLoginError("You must be logged in to subscribe")
        }
    }

    var frequency_dict = {1: "Daily", 7: "Weekly", 30: "Monthly", 365: "Yearly"};


    // const Card = (props) => (
    //     <div className="subscription_card">
    //         <h2>{ props.membership }</h2>
    //         <p>{ props.price }</p>
    //     </div>
    // );


    return (
        <div>
            <br/>
            <h1>Subscriptions</h1>
            <br/>
            <div className="subscription_container studio-list">

                {
                    subscriptionsList.map(subscription => (
                        <>
                            <Card>
                                <Card.Body>
                                    <div key={ subscription.id }>
                                        <div key={ subscription.membership }><Card.Title>{ frequency_dict[subscription.membership] }</Card.Title></div>
                                        <div key={ subscription.membership }><Card.Title>${ subscription.price }/{ subscription.membership } days</Card.Title></div>
                                        {localStorage.getItem("authTokens") && (
                                            <Link to={ "/" }><Button variant="primary">Subscribe</Button></Link>
                                        )}
                                        {!localStorage.getItem("authTokens") && (
                                            <Link to={ "/login" }><Button variant="primary">Subscribe</Button></Link>
                                        )}

                                    </div>
                                </Card.Body>                                
                            </Card>
                            <br/>
                        </>
                    ))
                }
                <div key={loginError}>{loginError}</div>

            </div>
        </div>

    )
}

export default SubscriptionsPage


