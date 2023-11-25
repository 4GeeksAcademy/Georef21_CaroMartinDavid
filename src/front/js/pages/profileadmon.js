import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import "../../styles/admon.css";
import { MapAdmon } from "./mapadmon"
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
        <div className="row">
            <div className="Contanier-fluid col-md-12" style={{ height: "100vh", marginLeft: "10px" }}>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box">

                            <h3 className="page-title mb-5" style={{ color: '#6c757d', fontFamily: "Nunito,sans-serif", marginTop: "50px", fontWeight: "bold", marginLeft: "10px" }} >Administrador</h3>

                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="row">

                            <div className="col-6">

                                <div className="col-md-12">
                                    <div className="widget-flat card">
                                        <div className="card-body">
                                            <div className="float-end">
                                                <i className="mdi mdi-account-multiple widget-icon"></i>
                                            </div>
                                            <h5 className="fw-normal mt-0 text-muted" title="Number of Customers">
                                                Proyectos Creados
                                            </h5>
                                            <h3 className="mt-3 mb-3">{store.AllProjects.length}</h3>
                                            <p className="mb-0 text-muted">
                                                <span className="text-success me-2">
                                                    <i className="mdi mdi-arrow-up-bold"></i>
                                                    
                                                </span>
                                                <span className="text-nowrap"></span>
                                            </p>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <div className="col-6">
                                <div className="col-md-12">
                                    <div className="widget-flat card">
                                        <div className="card-body">
                                            <div className="float-end">
                                                <i className="mdi mdi-account-multiple widget-icon"></i>
                                            </div>
                                            <h5 className="fw-normal mt-0 text-muted" title="Number of Customers">
                                                Especialistas a cargo
                                            </h5>
                                            <h3 className="mt-3 mb-3">{store.allspecialist.length}</h3>
                                            <p className="mb-0 text-muted">
                                                <span className="text-success me-2">
                                                    <i className="mdi mdi-arrow-up-bold"></i>
                                                    
                                                </span>
                                                <span className="text-nowrap"></span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row pt-5">

                            <div className="col-6">
                                <div className="col-md-12">
                                    <div className="widget-flat card">
                                        <div className="card-body">
                                            <div className="float-end">
                                                <i className="mdi mdi-account-multiple widget-icon"></i>
                                            </div>
                                            <h5 className="fw-normal mt-0 text-muted" title="Number of Customers">
                                                Visitas creadas
                                            </h5>
                                            <h3 className="mt-3 mb-3">{store.allvisits.length}</h3>
                                            <p className="mb-0 text-muted">
                                                <span className="text-success me-2">
                                                    <i className="mdi mdi-arrow-up-bold"></i>
                                                    
                                                </span>
                                                <span className="text-nowrap"></span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                
                            </div>

                            <div className="col-6">
                                <div className="col-md-12">
                                    <div className="widget-flat card">
                                        <div className="card-body">
                                            <div className="float-end">
                                                <i className="mdi mdi-account-multiple widget-icon"></i>
                                            </div>
                                            <h5 className="fw-normal mt-0 text-muted" title="Number of Customers">
                                                Consolidado
                                            </h5>
                                            <h3 className="mt-3 mb-3">{new Date().toISOString().slice(0, 10)}</h3>
                                            <p className="mb-0 text-muted">
                                                <span className="text-success me-2">
                                                    <i className="mdi mdi-arrow-up-bold"></i>
                                                    
                                                </span>
                                                <span className="text-nowrap"></span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                
                            </div>

                        </div>

                    </div>
                    <div className="col-6">

                        <MapAdmon />
                    </div>

                </div>



                <div className="row-card" style={{ marginLeft: "10px" }}>


                </div>
            </div>
        </div>








    );
};