import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import credentials from './credentials';
import MapComponent from './map';
import "../../styles/home.css";

export const FormGeolocation = () => {
	const { store, actions } = useContext(Context);
	const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${credentials.mapsKey}`;

	useEffect(() => {
       actions.location();
    }, []);
	return (
		<div className = "conteinerMap">
			<MapComponent
				googleMapURL={mapURL}
				containerElement={<div style={{ height: '600px', width:'600px' }} />}
				mapElement={<div style={{ height: '100%' }} />}
				loadingElement={<p>Cargando</p>}
			/>
			
		</div>
	);
};

export default FormGeolocation;
