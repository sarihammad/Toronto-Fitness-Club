import React, {useContext, useState, useEffect} from "react";
import AuthContext from "../context/AuthContext";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const CreditCardPage = () => {
    const [membership, setMembership] = useState(0)
    const [card_num, setCardNum] = useState("")
    const [card_expiry_month, setExpiryMonth] = useState("")
    const [card_expiry_year, setExpiryYear] = useState("")
    const [card_cvv, setCardCvv] = useState("")
    let {authTokens, logoutUser} = useContext(AuthContext)

/*    useEffect(() => {
        setCard()
    },[])*/

    const handleSubmit = (e) => {
        e.preventDefault();
        setCard()
    }

    let setCard = async()=>{
        setMembership(4)
        let response = await fetch("http://127.0.0.1:8000/subscriptions/subscribe/", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            },
            body:JSON.stringify({
                "membership":membership,
                "card_num":card_num,
                "card_expiry_month":card_expiry_month,
                "card_expiry_year":card_expiry_year,
                "card_cvv":card_cvv
            })
        })
        let data = await response.json()
        console.log(data)
        if (response.status === 200){
            //navigate so some page
            console.log(data)

        }else{
            console.log(data)
        }

    }
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h1>Enter your Card Information</h1>
                <hr />
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="cardnum">Card Number</Form.Label>
                    <Form.Control type="text" id="cardnum" onChange={e => setCardNum(e.target.value)} placeholder="Card number"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="expiry-month">Expiry Month</Form.Label>
                    <Form.Control type="text" id="expiry-month" onChange={e => setExpiryMonth(e.target.value)} placeholder="Expiry Month"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="expiry-year">Expiry Year</Form.Label>
                    <Form.Control type="text" id="expiry-year" onChange={e => setExpiryYear(e.target.value)} placeholder="Expiry Year"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="cvv">CVV</Form.Label>
                    <Form.Control type="text" id="cvv" onChange={e => setCardCvv(e.target.value)} placeholder="CVV"/>
                </Form.Group>
                <Button variant="primary" type="submit">Register</Button>

            </Form>
        </>
    )

}
export default CreditCardPage