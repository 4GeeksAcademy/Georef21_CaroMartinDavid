import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import "../../styles/admon.css";
import {MapAdmon} from "./mapadmon"
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
            <div className="Contanier-fluid col-md-6" style={{ height: "100vh", marginLeft: "10px" }}>
                <div className="row">
                    <div className="col">
                        <div className="page-title-box">
                            <div className="page-title-right">
                                <nav aria-label="breadcrumb">
                                    {/* <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item"><a href="/">Hyper</a></li>
                        <li className="breadcrumb-item"><a href="/ui/forms/wizard">Forms</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Form Wizard</li>
                    </ol> */}
                                </nav>
                            </div>
                            <h3 className="page-title mb-5" style={{ color: '#6c757d', fontFamily: "Nunito,sans-serif", marginTop: "50px", fontWeight: "bold", marginLeft: "10px" }} >Dashboard Administrador</h3>

                        </div>
                    </div>
                </div>
                <div className="row-card" style={{marginLeft: "10px"}}>
                    <div className="col-xl-5 col-lg-6">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="widget-flat card">
                                    <div className="card-body">
                                        <div className="float-end">
                                            <i className="mdi mdi-account-multiple widget-icon"></i>
                                        </div>
                                        <h5 className="fw-normal mt-0 text-muted" title="Number of Customers">
                                            Proyectos Creados
                                        </h5>
                                        <h3 className="mt-3 mb-3">36,254</h3>
                                        <p className="mb-0 text-muted">
                                            <span className="text-success me-2">
                                                <i className="mdi mdi-arrow-up-bold"></i>
                                                5.27
                                            </span>
                                            <span className="text-nowrap">Since last month</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <div className="widget-flat card">
                                    <div className="card-body">
                                        <div className="float-end">
                                            <i className="mdi mdi-cart-plus widget-icon"></i>
                                        </div>
                                        <h5 className="fw-normal mt-0 text-muted" title="Number of Orders">
                                            Visitas
                                        </h5>
                                        <h3 className="mt-3 mb-3">5,543</h3>
                                        <p className="mb-0 text-muted">
                                            <span className="text-danger me-2">
                                                <i className="mdi mdi-arrow-down-bold"></i>
                                                1.08%
                                            </span>
                                            <span className="text-nowrap">Since last month</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <MapAdmon/>
                        </div>

        </div>

            





    );
};