import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";
import "../../styles/map.css";

export const MapAdmon = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.API_KEY,
    libraries: ["places"],
  });
  const { store } = useContext(Context);
  const [map, setMap] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);

  const markers = store.markers;

  useEffect(() => {
    if (map) {
      if (markers.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        markers.forEach(({ lat, lng }) => bounds.extend(new window.google.maps.LatLng(lat, lng)));
        map.fitBounds(bounds);
      } else {
        // Si no hay marcadores, establece la extensión mundial
        const worldBounds = new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(-90, -180),
          new window.google.maps.LatLng(90, 180)
        );
        map.fitBounds(worldBounds);
      }
    }
  }, [map, markers]);

  const handleMapLoad = (map) => {
    setMap(map);
  };

  const handleMarkerClick = (marker) => {
    if (infoWindow) {
      setInfoWindow(null);
    } else {
      setInfoWindow(marker);
    }
  };

  return (
    <div className="App row d-flex justify-content-center">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          zoom={2} // Ajusta el nivel de zoom inicial según tu preferencia
          onLoad={handleMapLoad}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => handleMarkerClick(marker)}
            />
          ))}

          {infoWindow && (
            <InfoWindow
              position={{ lat: infoWindow.lat, lng: infoWindow.lng }}
              onCloseClick={() => setInfoWindow(null)}
            >
              <div>
                <p>{infoWindow.Proyecto}</p>
                <p>{infoWindow.fecha}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </div>
  );
};
