import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import "../../styles/admon.css";

import { Context } from "../store/appContext";
import { FaLocationDot, FaPhoneFlip, FaEnvelope, FaTrashCan,FaPencil } from "react-icons/fa6";

export const ProfileAdmon = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    function getproyects(){
        actions.GetProjects();
        navigate("/listaproyectos");
    }

    function getspacialist(){
        actions.getEspecialista();
        navigate("/perfilEspecialista");
    }
		
	return (
		<div className="container">
			<h1>Bienvenido {store.administrator.name}</h1>
			<div>
                <h1>Proyectos</h1>
                <div className ="d-flex justify-content-evenly">
                    <Link to="/nuevoproyecto">
                        <button type="button" className="btn btn-success m-3">
                            Crear Proyectos
                        </button>
                    </Link>
                    <button type="button" className="btn btn-success m-3" onClick={()=>getproyects()}>
                        Proyectos
                    </button>
                </div>

            </div>
            <div>
                <h1>Especialistas</h1>
                    <div className ="d-flex justify-content-evenly">
                        <Link to = "/registerespicialist">
                            <button type="button" className="btn btn-warning m-3">
                                Crear Especialista
                            </button>
                        </Link>
                        
                        <button type="button" className="btn btn-warning m-3" onClick={()=>getspacialist()}>
                            Especialistas
                        </button>
                    </div>
            </div>
            <div>
                <h1>Visitas</h1>
                        <div className ="d-flex justify-content-evenly">
                            <button type="button" className="btn btn-info m-3">
                                Crear Visitas
                            </button>
                            <button type="button" className="btn btn-info m-3">
                                Visitas
                            </button>
                        </div>
            </div>
				
		</div>
	);
};
