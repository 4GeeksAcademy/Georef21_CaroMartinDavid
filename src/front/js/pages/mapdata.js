import React, { useState, useEffect, useContext, useRef } from "react"; 
import { Context } from "../store/appContext";
import { GoogleMap, Marker, useLoadScript, StandaloneSearchBox, LoadScript  } from "@react-google-maps/api";
import { useMemo } from "react";
import "../../styles/map.css";

export const MapData = (prop) => {
  const { store, actions } = useContext(Context);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.API_KEY
  });
  const center = useMemo(() => (prop.georeferencing ), [prop.georeferencing]);
 
  const [markerPosition, setMarkerPosition] = useState(prop.georeferencingn);
  

  useEffect(() => {
    setMarkerPosition(prop.georeferencing);
  }, [prop.georeferencing]);

  useEffect(() => {
    console.log("markerPosition", markerPosition);
  }, [markerPosition]);

 
  return (
    
      <div className="App row">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={10}
          >
          <Marker position={markerPosition} icon={"https://maps.google.com/mapfiles/ms/icons/green-dot.png"} />
        </GoogleMap>
      )}
    </div>
   
  );
};
