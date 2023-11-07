import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import "../../styles/admon.css";

import { Context } from "../store/appContext";
import { FaLocationDot, FaPhoneFlip, FaEnvelope, FaTrashCan,FaPencil } from "react-icons/fa6";

export const DatosAdmon = () => {
	const { store, actions } = useContext(Context);

		
	return (
		<div className="container">
			
			<div>
				<h1>Administradores</h1>
				{store.administrators.map((item, index)=>{
					return(
						<div key={index}
							className="col-md-12 mx-auto admon">
							<h1>{item.name} {item.lastname}</h1>
							<button className="editor p-2 mx-3"><Link to={`/admon/${item.id}`}><FaPencil/></Link></button>
							<button className="delete p-2 mx-3" onClick={()=> actions.adminDelete(item.id)}><FaTrashCan/></button>
						</div>
						);	

					})};
					<Link to="/">
						<button type="button" className="btn btn-outline-dark">Volver</button>
					</Link>
			</div>
				
		</div>
	);
};
