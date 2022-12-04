import React, {useContext, useState, useEffect} from "react";
import AuthContext from "../context/AuthContext";
import Button from "react-bootstrap/Button";
import {Link, useParams} from "react-router-dom";
import Map from "../components/Map";
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';

const StudioPage = () => {
    const {id} = useParams();
    let [studio, setStudio] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getStudioInfo()
    },[])


    let getStudioInfo = async()=>{
        let response = await fetch(`http://127.0.0.1:8000/studio/${id}/details/`, {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
            }
        })
        let data = await response.json()
        if (response.status === 200){
            console.log(data)
            setStudio(data)
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
        <div className="studio-list">
            <h1 key={studio.name}>{studio.name}</h1>
            <hr />
            <div className="card-map">
            <Card>
                <Card.Header>General Info</Card.Header>
                <Card.Body>
                <div>
                <div key={studio.phone_num}>Phone Number: {studio.phone_num}</div>
                {studio.location && <div key={studio.location.address}>Address: {studio.location.address}</div>}
                {studio.location && <div key={studio.location.post_code}>Postal Code: {studio.location.post_code}</div>}
                {studio.location && <div key={studio.location.directions}><a href={studio.location.directions} target="_blank">Get Directions</a></div>}
                </div>
            </Card.Body>
            </Card>
            </div>
            <br/>
            <Card>
                <Card.Header>Amenities</Card.Header>
                <Card.Body>
                    <div>
                        {studio.amenities?.map(amenity => (
                            <>
                                <div key={amenity.type}>{amenity.type}: {amenity.quantity}</div>
                            </>
                        ))}
                    </div>
                </Card.Body>
            </Card>
        </div>

            <Map studios={[studio]}/>
            <br/>
            <div className="studio-list">
                { studio.photos.length? (
                    <Carousel variant="dark">
                        {studio.photos?.map(photo => (
                            <Carousel.Item>
                                <img src={`http://localhost:8000/${photo.photo}`} alt="studio-photo" className="d-block w-100"/>
                            </Carousel.Item>

                        ))}
                    </Carousel>
                ):""}

            <br/>
            <Link to="/studio/sortby/currlocation">Back</Link>
            </div>
        </div>

    )
}

export default StudioPage