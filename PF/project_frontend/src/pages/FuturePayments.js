import React, {useContext, useState, useEffect, useRef} from "react";
import AuthContext from "../context/AuthContext";
import Card from 'react-bootstrap/Card';
//is this saved ?
const FuturePayments = () => {
    const [payment, setPaymentsList] = useState([])
    const {authTokens, logoutUser} = useContext(AuthContext)


    useEffect(() => {
        getPayment()
    },[])

    let getPayment = async()=>{

        let response = await fetch(`http://127.0.0.1:8000/subscriptions/payments/future/`, {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            }
        })
        let data = await response.json()
        if (response.status === 200){
            setPaymentsList(data)
            //console.log(data)
            //console.log(payment)
        }else if(response.statusText==='Unauthorized'){
            logoutUser()
        }

    }

    return (
        <div>
            <div className="studio-upper"><h5 className="h2-text">Upcoming Payment</h5></div>
           <br/>
            <br/>
            <div className="studio-list">

                {/* <p>hello</p> */}
        
                     <>
                    <Card>
                        <Card.Body>
                        <Card.Title>{payment.future_payment.next_payment_date}</Card.Title>

                            <Card.Title>{payment.future_payment.next_payment_date.split("T")[0]}</Card.Title>
                            <p className="mb-2 text-muted">{payment.next_payment_date.split("T")[1].split(".")[0]}</p>
                            <br />
                            <Card.Subtitle>${payment.future_payment.amount}</Card.Subtitle>
                            <Card.Text>
                            <div>Card: {payment.future_payment.card.card_num}</div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                     <br/>
                    </> 
 
            </div>

        </div>
    )
}

export default FuturePayments
