import React, {useContext, useState, useEffect} from "react";
import AuthContext from "../context/AuthContext";
import Button from "react-bootstrap/Button";
import {Link, useParams} from "react-router-dom";
import Map from "../components/Map";

const StudioPage = () => {
    const {id} = useParams();
    let [studio, setStudio] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)

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
        }else if(response.statusText==='Unauthorized'){
            logoutUser()
        }

    }
    return (
        <div>
            <h1 key={studio.name}>{studio.name}</h1>
            <hr />
            <div>
                <div key={studio.phone_num}>Phone Number: {studio.phone_num}</div>
                {studio.location && <div key={studio.location.address}>Address: {studio.location.address}</div>}
                {studio.location && <div key={studio.location.post_code}>Postal Code: {studio.location.post_code}</div>}
            </div>
            {/*<Map studios={studioRender}/>*/}
            <Link to="/studio/currlocation">Back</Link>

        </div>
    )
}

export default StudioPage