import React, {useContext, useState, useEffect} from "react";
import AuthContext from "../context/AuthContext";
import Button from "react-bootstrap/Button";
import {Link, useParams} from "react-router-dom";
import Map from "../components/Map";
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Pagination from "react-bootstrap/Pagination";

const HistoryPage = () => {
    let [history, setHistory] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [prev, setPrev] = useState(false)
    const [next, setNext] = useState(true)
    const [page_num_post, setPageNumPost] = useState(1)

    useEffect(() => {
        getHistoryInfo()
    },[])

    const handleNextbtn = () => {
        if(next){
            getHistoryInfo()
        }
    }
    const handlePrevbtn = () => {
        if (prev && next){
            setPageNumPost(page_num_post => page_num_post - 2)
            getHistoryInfo()
        }else if (!prev){
            setPageNumPost(1)
        }else {
            setPageNumPost(page_num_post => page_num_post - 1)
            getHistoryInfo()
        }

    }

    let getHistoryInfo = async () => {
        let response = await fetch('http://127.0.0.1:8000/class/history', {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            }
        })
        let data = await response.json()
        if (response.status === 200){
            console.log(data)
            setHistory(data)
            setLoading(false)
        } else if (response.statusText==='Unauthorized') {
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
            <br/>
            <h1>History</h1>
            <br/>
            {/* <Button className="sort-text" variant="link" onClick={() => {
                setPageNumCurr(1)
                getStudio()
            }}>View all Studios</Button> */}
            <div className="history-list">
                {history.map(curr_time => (
                    <>
                    <Card>
                        <Card.Body>
                            <div key={curr_time.id}>
                            <div key={curr_time.class_date}><Card.Title>{curr_time.class.name}</Card.Title></div>
                            {/* <div key={curr_class.}><Card.Subtitle className="mb-2 text-muted">Location: {class.}</Card.Subtitle></div> */}
                            <Card.Text>
                            <div key={curr_time.class.name}>Date: {curr_time.class_date}</div>
                            <div key={curr_time.class.name}>Time: {curr_time.start_time} - {curr_time.end_time}</div>
                            </Card.Text>
                             </div>
                        </Card.Body>
                    </Card>
                     <br/>
                    </>
                ))}
            </div>
            <div className="container d-flex justify-content-center">
                <Pagination size="lg">
                    <Pagination.Prev
                        onClick={handlePrevbtn}/>
                    <Pagination.Next
                        onClick={handleNextbtn}/>
                </Pagination>
            </div>

        </div>
    )
}

export default HistoryPage