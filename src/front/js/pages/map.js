import React , { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { Marker } from 'react-google-maps'; 

const Map = () => {
	return (
		<GoogleMap
        defaultZoom = {15}
        defaultCenter = {{lat:4.60971, lng:-74.08175}}
        >
            <Marker position={{ lat: 4.60971, lng: -74.08175 }} />
        </GoogleMap>
	);
};

const MapComponent = withScriptjs(withGoogleMap(Map));

export default MapComponent;