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
				{store.administrators.map((item, index)=>{
					return(
						<div key={index}
							className="col-md-12 mx-auto">
							<h1>{item.name} {item.lastname}</h1>
						</div>
						);	

					})};
			</div>
				
		</div>
	);
};
