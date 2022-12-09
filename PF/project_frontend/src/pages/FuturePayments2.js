import React, {useContext, useState, useEffect} from "react";
import AuthContext from "../context/AuthContext";
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';


const FuturePayments2 = () => {
    const [payment, setPayment] = useState([])
    const {authTokens, logoutUser} = useContext(AuthContext)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        getPayment()
    },[])

    let getPayment = async() => {
        let response = await fetch("http://127.0.0.1:8000/subscriptions/payments/future/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            }  
        })
        let data = await response.json()
        if (response.status === 200){
            console.log(data)
            setPayment(data)
            setLoading(false)
        }else if(response.statusText==='Unauthorized'){
            logoutUser()
        }
    }
    if (loading){
        return (
            <div></div>
        )
    }

    return (
        <div>
            <p>{payment.amount}</p>
        </div>
    )

}

export default FuturePayments2