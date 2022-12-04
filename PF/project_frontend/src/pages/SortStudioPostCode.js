import React, {useContext, useState, useEffect} from "react";
import AuthContext from "../context/AuthContext";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Map from "../components/Map";
import Card from 'react-bootstrap/Card';

const SortStudioPostCode = () => {
    let [studioList, setStudioList] = useState([])
    let [postCode, setPostCode] = useState("")
    let {authTokens, logoutUser} = useContext(AuthContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getStudio()
    },[postCode])


    let getStudio = async()=>{
        // todo: adding parameters to url don't work, only works if hardcoded api call
        // todo: postCode returns as empty in getStudio even after submitting form
        console.log("post code:", postCode)
        const url = (`http://127.0.0.1:8000/studio/sortby/postcode/?post_code=${postCode}`)
        console.log("url used,", url)
        let response = await fetch(`http://127.0.0.1:8000/studio/sortby/postcode/?post_code=${postCode}`, {
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
            <Map studios={studioList}/>
            <div className="sort-text">
                <p><Link to="/studio/sortby/currlocation">View All Studios</Link></p>
                <h6>Sorting by Postal code</h6>
            </div>
            <form className="post-code-form" onSubmit={getStudio}>
            <label htmlFor="postcode">Sort by Postal Code</label>
                <br/>
            <input type="text"
                   id="postcode"
                   placeholder="Enter Postal Code"
                   onChange={e => setPostCode(e.target.value)}/>
            </form>
            <div className="studio-list">
                {studioList.map(studio => (
                    <>
                    <Card>
                        <Card.Body>
                        <div key={studio.id}>
                            <div key={studio.name}><Card.Title>{studio.name}</Card.Title></div>
                            <div key={studio.location.address}><Card.Subtitle className="mb-2 text-muted">Location: {studio.location.address}</Card.Subtitle></div>
                            <Card.Text>
                            <div key={studio.phone_num}>Phone Number: {studio.phone_num}</div>
                            </Card.Text>
                            <Link to={"/studio/" + studio.id + "/details"}><Button variant="primary">Studio Details</Button></Link>
                        </div>
                            </Card.Body>
                        <Card.Footer className="text-muted" key={studio.location.distance}>{studio.location.distance} km from {postCode}</Card.Footer>
                    </Card>
                        <br/>
                    </>
                ))}
            </div>
            {/*<Button>Next</Button>*/}

        </div>
    )
}

export default SortStudioPostCode

