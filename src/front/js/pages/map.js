import React, { useState, useEffect, useContext, useRef } from "react"; 
import { Context } from "../store/appContext";
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { Marker } from 'react-google-maps'; 

const Map = () => {
    const { store, actions } = useContext(Context);

    return (
        <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: store.location.latitude, lng: store.location.longitude }}>
            <Marker position={{lat: store.location.latitude, lng: store.location.longitude} } />
      </GoogleMap>
    );
}
const MapComponent = withScriptjs(withGoogleMap(Map));

export default MapComponent;