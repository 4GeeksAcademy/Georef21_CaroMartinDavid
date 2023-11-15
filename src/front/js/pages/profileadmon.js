import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import "../../styles/admon.css";

import { Context } from "../store/appContext";
import { FaLocationDot, FaPhoneFlip, FaEnvelope, FaTrashCan, FaPencil } from "react-icons/fa6";

export const ProfileAdmon = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    function getproyects() {
        actions.GetProjects();
        navigate("/listaproyectos");
    }

    function getspacialist() {
        actions.getEspecialista();
        navigate("/perfilEspecialista");
    }

    return (
        <div className="account-pages1" >
            <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5" >
                <div className="containerAdmon">
                    <div className="Administrador pt-4 pb-4 text-center bg-primary card-header col-md-6" style={{ color: 'white' }}>
                        <h1>Bienvenido {store.administrator.name}</h1>
                    </div>
                    <div>
                        <div className="Proyectos pt-4 text-center">
                            <h1>Proyectos</h1>
                        </div>
                        <div className="d-flex justify-content-evenly">
                            <Link to="/nuevoproyecto">
                                <button type="button" className="btn btn-primary m-3">
                                    Crear Proyectos
                                </button>
                            </Link>
                            <button type="button" className="btn btn-primary m-3" onClick={() => getproyects()}>
                                Proyectos
                            </button>
                        </div>

                    </div>
                    <div className="Proyectos pt-1 text-center">
                        
                        <h1>Especialistas</h1>
                        <div className="d-flex justify-content-evenly">
                            <Link to="/registerespicialist">
                                <button type="button" className="btn btn-primary m-3">
                                    Crear Especialista
                                </button>
                            </Link>

                            <button type="button" className="btn btn-primary m-3" onClick={() => getspacialist()}>
                                Especialistas
                            </button>
                        </div>
                        
                    </div>
                    <div className="Proyectos pt-4 text-center">
                        <h1>Visitas</h1>
                        <div className="d-flex justify-content-evenly">
                            <button type="button" className="btn btn-primary m-3">
                                Crear Visitas
                            </button>
                            <button type="button" className="btn btn-primary m-3">
                                Visitas
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
};
