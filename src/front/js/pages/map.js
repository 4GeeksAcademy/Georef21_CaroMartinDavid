import React, { useState, useEffect, useContext, useRef } from "react"; 
import { Context } from "../store/appContext";
import { GoogleMap, Marker, useLoadScript, StandaloneSearchBox, LoadScript  } from "@react-google-maps/api";
import { useMemo } from "react";
import "../../styles/map.css";

export const Map = () => {
  const { store, actions } = useContext(Context);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.API_KEY
  });
  const center = useMemo(() => (store.location), [store.location]);
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(store.location);
  

  useEffect(() => {
    setMarkerPosition(store.location);
  }, [store.location]);

  useEffect(() => {
    actions.ajustLocation(markerPosition);
  }, [markerPosition]);

  const onLoad = mapInstance => {
    setMap(mapInstance);
  };

  const onMarkerDragEnd = event => {
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    console.log(markerPosition);
   
  };

  const onMapClick = event => {
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    console.log(markerPosition);
   
  };

  const onPlacesChanged = () => {
    const places = searchBox.getPlaces();
    if (places.length > 0) {
      const place = places[0];
      setMarkerPosition({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
      if (map) {
        map.panTo({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
      }
      console.log(markerPosition);
    
    }
  };

 
  return (
    
      <div className="App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          onLoad={onLoad}
          center={center}
          zoom={10}
          onClick={onMapClick}
          >
          <Marker position={markerPosition} icon={"https://maps.google.com/mapfiles/ms/icons/green-dot.png"} draggable={true}
            onDragEnd={onMarkerDragEnd} />

        
        </GoogleMap>
      )}
    </div>
   
  );
};
