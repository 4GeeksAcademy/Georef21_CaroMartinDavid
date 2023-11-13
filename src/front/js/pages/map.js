import React, { useState, useEffect, useContext, useRef } from "react"; // Agrega 'useRef' a los import
import { Context } from "../store/appContext";
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import { Marker } from 'react-google-maps'; 

const Map = () => {
    const { store, actions } = useContext(Context);
    const [searchBox, setSearchBox] = useState(null);
    const [markerPosition, setMarkerPosition] = useState({ lat: store.location.latitude, lng: store.location.longitude });
    const [mapCenter, setMapCenter] = useState({ lat: store.location.latitude, lng: store.location.longitude });

    const onSearchBoxMounted = (ref) => {
        setSearchBox(ref);
    };

    const onPlacesChanged = () => {
        const places = searchBox.getPlaces();
        if (places.length > 0) {
            const { lat, lng } = places[0].geometry.location;
            const newLat = lat()
            const newLng = lng();
            console.log("Nuevas coordenadas:", newLat, newLng);

            if (!isNaN(newLat) && !isNaN(newLng)) {
                const newPosition = { lat: newLat, lng: newLng };
                actions.setLocation({ latitude: newLat, longitude: newLng });
                setMarkerPosition(newPosition);
                setMapCenter(newPosition);
            } else {
                console.error("Coordenadas inválidas");
            }
        }
    };

    useEffect(() => {
        if (store.bounds) {
            searchBox.setBounds(new window.google.maps.LatLngBounds(
                new window.google.maps.LatLng(store.bounds.south, store.bounds.west),
                new window.google.maps.LatLng(store.bounds.north, store.bounds.east)
            ));
        }
    }, [searchBox, store.bounds]);

    return (
        <GoogleMap
            defaultZoom={15}
            defaultCenter={mapCenter} // Usa mapCenter como el centro del mapa
        >
            <StandaloneSearchBox ref={onSearchBoxMounted} onPlacesChanged={onPlacesChanged}>
                <input type="text" placeholder="Search for a location" />
            </StandaloneSearchBox>
            <Marker position={markerPosition} />
        </GoogleMap>
    );
};

const MapComponent = withScriptjs(withGoogleMap(Map));

export default MapComponent;
