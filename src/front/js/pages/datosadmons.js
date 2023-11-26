import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/admon.css";
import { Context } from "../store/appContext";
import {BsFillPencilFill} from "react-icons/bs"
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";

export const DatosAdmon = () => {
	const { store, actions } = useContext(Context);

	function edad(date) {
		const birthday = Date.parse(date)
		const today = new Date();
		const edadAdmin = Math.floor((today - birthday) / (1000 * 60 * 60 * 24 * 365));
		return edadAdmin
	}
		
	return (
		
		<div className="row">
   			<div className="col-xl-4 col-lg-5 d-flex m-auto">
       			<div className="card text-center m-3" style ={{backgroundColor:"#fff", border:"1px, solid, #dee2e6", width:"100%"}}>
           			<div className="card-body">
          				<img src={store.administrator.image_admon} className="rounded-circle avatar-lg img-thumbnail" alt="profile-image"/>
						<h4 className="mb-0 mt-2">{store.administrator.name}</h4>
               	 		<p className="text-muted font-14">{store.administrator.position}</p>
						<Link to={`/admon/${store.administrator.id}`}>
                 			<button type="button" className="btn btn-success btn-sm mb-2">Editar</button>
						</Link>
						 <Link to="/profileadmon">
                 			<button type="button" className="btn btn-danger btn-sm mb-2">Volver</button>
						 </Link>
                  		<div className="text-start mt-3">
                   		<h4 className="font-13 text-uppercase">Sobre mi :</h4>
                  		<p className="text-muted font-13 mb-3">
							Hola soy  {store.administrator.name} {store.administrator.lastname}, tengo {edad(store.administrator.birthday)} años
                        </p>
                        <p className="text-muted mb-2 font-13">
							<strong>Nombre Completo :</strong> <span className="ms-2">{store.administrator.name} {store.administrator.lastname}</span>
						</p>
 						<p className="text-muted mb-2 font-13">
							<strong>Celular :</strong><span className="ms-2">(123)123 1234</span></p>

                        <p className="text-muted mb-2 font-13"><strong>Email :</strong> <span className="ms-2 ">{store.administrator.email}</span></p>

                        <p className="text-muted mb-1 font-13"><strong>Ubicación :</strong> <span className="ms-2">Colombia</span></p>
                    </div>

                    <ul className="social-list list-inline mt-3 mb-0">
                        <li className="list-inline-item">
                           <FaFacebook style={{color:"rgb(114, 124, 245)", fontSize:"30px"}} />
                        </li>
                        <li className="list-inline-item">
                           <FaGoogle style={{color: "rgb(250, 92, 124)",fontSize:"30px" }}/>
                        </li>
                        <li className="list-inline-item">
                            <AiFillTwitterCircle  style={{color: "rgb(57, 175, 209)",fontSize:"30px" }}/>
                        </li>
                        <li className="list-inline-item">
                            <FaGithub style={{color: "rgb(108, 117, 125)",fontSize:"30px" }}/>
                        </li>
                    </ul>
                </div> 
            </div> 
		</div>
		</div>
	);
};
