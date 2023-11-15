import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import "../../styles/admon.css";

import { Context } from "../store/appContext";
import { FaLocationDot, FaPhoneFlip, FaEnvelope, FaTrashCan, FaPencil } from "react-icons/fa6";

export const VistaIncialEspecialista = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    function visitasig(){
        actions.gevisitaesp();
        navigate ("/perfilvisitasEsp");
    }

    function projecasig(){
        actions.gevisitaesp();
        navigate ("/perfilprojEsp");
    }
   
    return (
        <div className="container">
            <h1>Bienvenido {store.specialist.nombre}</h1>
            <div>
                <h1>Proyectos</h1>
                <div className="d-flex justify-content-evenly">
                
                    <button type="button" className="btn btn-success m-3"  onClick={()=>projecasig()}>
                        Proyectos Asignados
                    </button>
                  

                </div>

            </div>
            <div>
                <h1>Visitas</h1>
                <div className="d-flex justify-content-evenly">
                    
                        <button type="button" className="btn btn-warning m-3" onClick={()=>visitasig()}>
                            Visitas Asignadas
                        </button>
                    

                    <button type="button" className="btn btn-warning m-3">
                        Toma de Datos
                    </button>
                </div>
            </div>

        </div>
    );
};