import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { Context } from "../store/appContext";
import { BsPersonCircle } from "react-icons/bs";


import "../../styles/admon.css";

import { FaLocationDot, FaPhoneFlip, FaEnvelope, FaTrashCan, FaPencil } from "react-icons/fa6";


export const Sidebar = () => {
    const { store, actions } = useContext(Context);

    const navigate = useNavigate();

    function getproyects() {
        actions.GetProjects();
        navigate("/listaproyectos");
    }

    function getspacialist() {
        actions.getEspecialista();
        navigate("/perfilEspecialista");
    };

    function createvisit() {
        actions.getEspecialista();
        actions.GetProjects();
        navigate('/regvisit');
    };

    function getvisits() {
        actions.gevisitaadmon();
        navigate('/perfilVisitas');
    };

    return (
        <>
        {store.session === true ?
        (<div className="flex-shrink-0 p-3 bg-white" style={{ width: "295px", height: "100vh"}}>
            <div>
                <div className="d-flex align-items-center pb-1 mb-1 link-dark text-decoration-none border-bottom">
                    <a href="#!" className="text-decoration-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-globe-americas" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z" />
                        </svg>
                    </a> <span className="fs-5 fw-semibold">Bienvenido</span>
                </div>
                <ul className="list-unstyled ps-0">
                    <li className="mb-1">
                        <button className="btn-lg m-3 buttonHome align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
                            Proyectos
                        </button>
                        <div className="collapse" id="home-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li>
                                    <Link to="/nuevoproyecto">
                                        <button type="button" className="btn btn-outline-brand btn-block mb-4 ml-0" >
                                            Crear Proyectos
                                        </button>
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <button type="button" className="btn btn-outline-brand btn-block mb-4 ml-0" onClick={() => getproyects()}>
                                        Proyectos
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li className="mb-1">
                        <button className="btn-lg m-3 buttonHome align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
                            Especialistas
                        </button>
                        <div className="collapse" id="home-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li>
                                    <Link to="/registerespicialist">
                                        <button type="button" className="btn btn-outline-brand btn-block mb-4 ml-0">
                                            Crear Especialista
                                        </button>
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <button type="button" className="btn btn-outline-brand btn-block mb-4 ml-0" onClick={() => getspacialist()}>
                                        Especialistas
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li className="mb-1">
                        <button className="btn-lg m-3 buttonHome align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
                            Visitas
                        </button>
                        <div className="collapse" id="home-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li>

                                    <button type="button" className="btn btn-outline-brand btn-block mb-4 ml-0" onClick={() => createvisit()}>
                                        Crear Visitas
                                    </button>
                                </li>
                                <li className="mb-1">


                                    <button type="button" className="btn btn-outline-brand btn-block mb-4 ml-0" onClick={() => getvisits()}>
                                        Visitas
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </li>


                </ul>

            </div>
        </div>)
        : null}
    </>



    );
};
