import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {NavbarPerfilAdmon} from "../component/navbarperfiladmon"

import { Context } from "../store/appContext";

export const DatosAdmon = () => {
	const { store, actions } = useContext(Context);

		
	return (
		<div className="container">
			<NavbarPerfilAdmon/>
			<div>
				<h1>vista admin</h1>
				{/* <h1>{store.admin}</h1>
				<h1>{store.user.nombre + " "+store.user.apellido}</h1> */}
			</div>
				
		</div>
	);
};
