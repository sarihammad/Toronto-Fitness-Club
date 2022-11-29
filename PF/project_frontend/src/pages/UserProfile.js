import React, {useContext, useState, useEffect} from "react";
import AuthContext from "../context/AuthContext";
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';


const UserProfile = () => {
    let [userprofile, setUserProfile] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)

    useEffect(() => {
        getProfile()
    },[])

    let getProfile = async()=>{
        let response = await fetch("http://127.0.0.1:8000/accounts/profile/view/", {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            }
        })
        let data = await response.json()
        if (response.status === 200){
            setUserProfile(data)
        }else if(response.statusText==='Unauthorized'){
            logoutUser()
        }


    }
    return (
        <div>
            <h1>Your Profile Page</h1>
            <hr />
            <ul>
                <p>First name: {userprofile.first_name}</p>
                <p>Last name: {userprofile.last_name}</p>
                <p>Email: {userprofile.email}</p>
                <p>Phone Number: {userprofile.phone_num}</p>
                <p>Avatar: {userprofile.avatar}</p>
            </ul>

        </div>
    )
}

export default UserProfile