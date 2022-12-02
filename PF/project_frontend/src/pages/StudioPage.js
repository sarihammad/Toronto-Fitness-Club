import React, {useContext, useState, useEffect} from "react";
import AuthContext from "../context/AuthContext";
import Button from "react-bootstrap/Button";
import {Link, useParams} from "react-router-dom";
import Map from "../components/Map";

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
        <div>
            <h1 key={studio.name}>{studio.name}</h1>
            <hr />
            <h2>General Info</h2>
            <div>
                <div key={studio.phone_num}>Phone Number: {studio.phone_num}</div>
                {studio.location && <div key={studio.location.address}>Address: {studio.location.address}</div>}
                {studio.location && <div key={studio.location.post_code}>Postal Code: {studio.location.post_code}</div>}
                {studio.location && <div key={studio.location.directions}><a href={studio.location.directions} target="_blank">Get Directions</a></div>}
            </div>
            <Map studios={[studio]}/>
            <hr />
            <h2>Amenities</h2>
            <div>
                {studio.amenities?.map(amenity => (
                    <>
                    <div key={amenity.type}>{amenity.type}: {amenity.quantity}</div>
                    </>
                ))}
            </div>
            <hr />
            <h2>Photos</h2>
            <div>
                {studio.photos?.map(photo => (
                    <>
                        <div key={photo.photo}>{photo.photo}</div>
                    </>
                ))}
            </div>
            <hr />
            <Link to="/studio/sortby/currlocation">Back</Link>

        </div>
    )
}

export default StudioPage