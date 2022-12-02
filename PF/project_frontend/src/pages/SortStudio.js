import React, {useContext, useState, useEffect} from "react";
import AuthContext from "../context/AuthContext";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Map from "../components/Map";

const SortStudio = () => {
    const [studioList, setStudioList] = useState([])
    const {authTokens, logoutUser} = useContext(AuthContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getStudio()
    },[])


    let getStudio = async()=>{
        let response = await fetch("http://127.0.0.1:8000/studio/sortby/currlocation/", {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
            }
        })
        let data = await response.json()
        if (response.status === 200){
            //add studio (long+lat) to a list
            console.log("original response", data)
            console.log("studio list", data.results)
            setStudioList(data.results)
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
            <h1>Find Studios</h1>
            <hr />
            <p>Sorting by current location</p>
            <Link to="/studio/postcode/">Sort By Postal Code</Link>
            <Map studios={studioList}/>
            <div>
                {studioList.map(studio => (
                    <>
                    <div key={studio.id}>
                    <div key={studio.name}>{studio.name}</div>
                    <div key={studio.phone_num}>Phone Number: {studio.phone_num}</div>
                    <div key={studio.location.address}>Location: {studio.location.address}</div>
                     <Link to={"/studio/" + studio.id + "/details"}>Studio Details</Link>
                    <hr />
                    </div>
                    </>
                ))}
            </div>
            {/*<Button>Next</Button>*/}

        </div>
    )
}

export default SortStudio

/*
const nextPage = async() =>{
    let {authTokens} = useContext(AuthContext)
    let response = await fetch("http://127.0.0.1:8000/studio/sortby/currlocation/?page=2/", {
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            "Authorization": "Bearer " + String(authTokens.access)
        }
    })
    let data = await response.json()
    if (response.status === 200){
        //add studio (long+lat) to a list
        console.log(data)
        console.log(data.results)
        setStudioList(data.results)
    }
}*/
