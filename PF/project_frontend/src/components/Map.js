import React from "react";
import GoogleMapReact from 'google-map-react';

const Marker = ({ text }) => <div>{text}</div>;

export default function Map(studios){
    const defaultProps = {
        center: {
            lat: 43.851316,
            lng: -79.347015
        },
        zoom: 13
    };


    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '50vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCYQ9rgbyH2mlOIun5ESSCkOuyjFIDX1NM" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                {studios.studios.map(studio => (
                    <Marker
                        lat = {studio.location.latitude}
                        lng = {studio.location.longitude}
                        text = {studio.name}
                    />

                ))}


            </GoogleMapReact>
        </div>
    );
}