import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import "../../styles/admon.css";

import { Context } from "../store/appContext";
import {BsFillPencilFill} from "react-icons/bs"

export const DatosAdmon = () => {
	const { store, actions } = useContext(Context);

		
	return (
		<div className="container">
			
			<div>
				<h1>Administrador</h1>
					<div className="card mb-3" style={{minWidth: "500px"}}>
						<div className="row g-0">
							<div className="col-md-4">
							<img src="..." className="img-fluid rounded-start" alt="..."/>
							</div>
							<div className="col-md-8">
							<div className="card-body">
								<h5 className="card-title">{store.administrator.name} {store.administrator.lastname}  <Link to={`/admon/${store.administrator.id}`}><button><BsFillPencilFill/></button></Link></h5>
								<p className="card-text">Fecha de Nacimiento : {new Date(store.administrator.birthday).toLocaleDateString('es-ES')}</p>
								<p className="card-text">Email : {store.administrator.email}</p>
								<p className="card-text">Cargo : {store.administrator.position}</p>
							</div>
							</div>
						</div>
					</div>
					<Link to="/profileadmon">
						<button type="button" className="btn btn-outline-dark">Volver</button>
					</Link>
			</div>
				
		</div>
	);
};
