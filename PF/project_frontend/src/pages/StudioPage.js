import React, {useContext, useState, useEffect} from "react";
import AuthContext from "../context/AuthContext";
import Button from "react-bootstrap/Button";
import {Link, useParams} from "react-router-dom";
import Map from "../components/Map";
import Card from 'react-bootstrap/Card';

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
            <div>LOADING</div>
        )
    }
    //todo: photos don't show as images, just links
    return (
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
            <Map studios={[studio]}/>
            <br/>
            <h2>Photos</h2>
            <div>
                {studio.photos?.map(photo => (
                    <>
                     <img src={`http://localhost:8000/${photo.photo}`} alt="studio-photo" className="studio-photo"/>
                    </>
                ))}
            </div>
            <hr />
            <Link to="/studio/sortby/currlocation">Back</Link>

        </div>
    )
}

export default StudioPage