import React, {useContext, useState, useEffect} from "react";
import AuthContext from "../context/AuthContext";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Map from "../components/Map";

const SortStudioPostCode = () => {
    let [studioList, setStudioList] = useState([])
    let [postCode, setPostCode] = useState("")
    let {authTokens, logoutUser} = useContext(AuthContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getStudio()
    },[])


    let getStudio = async()=>{
        // todo: adding parameters to url don't work, only works if hardcoded api call
        // todo: postCode returns as empty in getStudio even after submitting form
        console.log("post code:", postCode)
        const url = (`http://127.0.0.1:8000/studio/sortby/postcode/?post_code=${postCode}`)
        console.log("url used,", url)
        let response = await fetch(`http://127.0.0.1:8000/studio/sortby/postcode/?post_code=M5B 2H1`, {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
            },
        })
        let data = await response.json()
        if (response.status === 200){
            //add studio (long+lat) to a list
            console.log("sorting by postcode", data)
            console.log(data.results)
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
            {/*add a map with pinpoints of all studios being listed*/}
            <h1>Find Studios</h1>
            <hr />
            <p>Sorting by Postal code (M5B 2H1)</p>
            <p><Link to="/studio/sortby/currlocation">Sort by Current Location</Link></p>
            <form onSubmit={getStudio}>
            <label htmlFor="postcode">Postal Code</label>
            <input type="text"
                   id="postcode"
                   placeholder="Enter Postal Code"
                   onChange={e => setPostCode(e.target.value)}/>
            <button>Submit</button>
            </form>
            <Map studios={studioList}/>
            <div>
                {studioList.map(studio => (
                    <>
                        <div key={studio.id}>
                            <div key={studio.name}>{studio.name}</div>
                            <div key={studio.phone_num}>Phone Number: {studio.phone_num}</div>
                            <div key={studio.location.address}>Location: {studio.location.address}</div>
                            <a href={"/studio/" + studio.id + "/details"}><button>Studio Details</button></a>
                            <hr />
                        </div>
                    </>
                ))}
            </div>
            {/*<Button>Next</Button>*/}

        </div>
    )
}

export default SortStudioPostCode

