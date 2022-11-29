import React, {useContext, useState, useEffect} from "react";
import AuthContext from "../context/AuthContext";
import Form from 'react-bootstrap/Form';
import {Link, useNavigate} from "react-router-dom";


const EditUserProfile = () => {
    // need to use props to pass in initial state as user's existing profile info, allow_blank=True
    // OR: only pass into body non-empty fields, no need for allow_blank - only change fields that are non-empty
    let [userprofile, setUserProfile] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)

    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone_num, setPhoneNum] = useState("")
    const [avatar, setAvatar] = useState(null)

/*    useEffect(() => {
        EditProfile(first_name, last_name, email, phone_num, avatar)
    },[])*/
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault()
        EditProfile(first_name, last_name, email, phone_num, avatar)
    }
    const removeEmptyKeys = (item)=>{
        Object.keys(item).map((key)=>{
            if(payload[key]==="" || payload[key]===null){
                delete payload[key]}
        })}
    const payload = {
        "first_name": first_name,
        "last_name": last_name,
        "email":email,
        "phone_num":phone_num,
        "avatar":avatar
    }
    removeEmptyKeys(payload)

    let EditProfile = async(first_name, last_name, email, phone_num, avatar)=>{
        let response = await fetch("http://127.0.0.1:8000/accounts/profile/edit/", {
            method: "PATCH",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            },
            body: JSON.stringify(payload)
        })
        let data = await response.json()
        if (response.status === 200){
            setUserProfile(data)
            navigate("/profile/view");
        }else if(response.statusText==='Unauthorized'){
            logoutUser()
        }
    }
    return (
        <section>
            <form onSubmit={handleSubmit}>
                <h1>Edit Profile</h1>
                <hr />

                <div className="mb-3">
                    <label htmlFor="first_name">First Name</label>
                    <input
                        type="text"
                        id="first_name"
                        onChange={e => setFirstName(e.target.value)}
                        placeholder="First Name"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="last_name">Last Name</label>
                    <input
                        type="text"
                        id="last_name"
                        onChange={e => setLastName(e.target.value)}
                        placeholder="Last Name"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone_num">Phone Number</label>
                    <input
                        type="text"
                        id="phone_num"
                        onChange={e => setPhoneNum(e.target.value)}
                        placeholder="Phone Number"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="avatar">Avatar</label>
                    <input
                        type="file"
                        id="avatar"
                        onChange={e => setAvatar(e.target.files[0])}
                    />
                </div>
                <button>Submit</button>
                <br></br>
                <br></br>
                <Link to="/profile/view">Cancel</Link>
            </form>
        </section>
    )
}

export default EditUserProfile