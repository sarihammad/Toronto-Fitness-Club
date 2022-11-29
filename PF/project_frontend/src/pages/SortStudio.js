import React, {useContext, useState, useEffect} from "react";
import AuthContext from "../context/AuthContext";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

const SortStudio = () => {
    let [studioList, setStudioList] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)

    useEffect(() => {
        getStudio()
    },[])


    let getStudio = async()=>{
        let response = await fetch("http://127.0.0.1:8000/studio/sortby/currlocation/", {
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
        }else if(response.statusText==='Unauthorized'){
            logoutUser()
        }

    }
    return (
        <div>
            {/*add a map with pinpoints of all studios being listed*/}
            <h1>Sort By Studio</h1>
            <hr />
            <div>
                {studioList.map(studio => (
                    <>
                    <div key={studio.name}>{studio.name}</div>
                    <div key={studio.phone_num}>{studio.phone_num}</div>
                    <div key={studio.location.address}>{studio.location.address}</div>
                    <hr />
                    </>
                ))}
            </div>
            <Button>Next</Button>

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
