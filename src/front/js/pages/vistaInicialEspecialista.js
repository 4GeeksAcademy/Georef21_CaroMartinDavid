import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import "../../styles/admon.css";

import { Context } from "../store/appContext";
import { FaLocationDot, FaPhoneFlip, FaEnvelope, FaTrashCan, FaPencil } from "react-icons/fa6";
import { FaArrowAltCircleRight } from "react-icons/fa";
import {MapAdmon} from "./mapadmon"

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

    function datacapt(){
        actions.getcapturedata();
        actions.gevisitaesp();
        navigate("/datacapture");
    }
    
   
    return (
        <div className="container-fluid p-0">
            <div className="row">
                <div className = "col-md-6 col-sm-12">
                    <div className = "row">
                        <div className="col-md-8 col-sm-12 col-xxl-8 d-flex py-3">
                            <div className="card illustration flex-fill">
                                <div className="card-body p-0 d-flex flex-fill">
                                    <div className="row g-0 w-100">
                                        <div className="col-6">
                                            <div className="illustration-text p-3 m-1">
                                                <h6 className="illustration-text">Bienvenid@, {store.specialist.nombre}!</h6>
                                                <p className="mb-0 positionesp">{store.specialist.area_de_desempeno}</p>
                                            </div>
                                        </div>
                                        <div className="col-6 text-center m-auto " style = {{alignItems:"center"}}>
                                            <img src={store.specialist.imageprofile} alt="Customer Support" class="img-fluid illustration-img"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className ="row">
                        <div className="col-md-8 col-sm-12 col-xxl-8 d-flex py-3">
                            <div className="card illustration2 flex-fill">
                                <div className="card-body p-0 d-flex flex-fill">
                                    <div className="row g-0 w-100">
                                        <div className="col-6">
                                            <div className="illustration-text p-3 m-1">
                                                <h4 className="illustration-text2">{store.numproyesp}</h4>
                                                <p className="mb-0 positionesp2">Proyectos asignados</p>
                                            </div>
                                        </div>
                                        <div className="col-6 text-center m-auto " style = {{alignItems:"center"}}>
                                            <button type="button" class="btn btn-outline-success" onClick={()=>projecasig()}><FaArrowAltCircleRight style={{color:"#f0e68c", fontSize:"30px"}} /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8 col-sm-12 col-xxl-8 d-flex py-3">
                            <div className="card illustration2 flex-fill">
                                <div className="card-body p-0 d-flex flex-fill">
                                    <div className="row g-0 w-100">
                                        <div className="col-6">
                                            <div className="illustration-text p-3 m-1">
                                                <h4 className="illustration-text2">{store.allvisitsspc.length}</h4>
                                                <p className="mb-0 positionesp2">Visitas asignadas</p>
                                            </div>
                                        </div>
                                        <div className="col-6 text-center m-auto " style = {{alignItems:"center"}}>
                                            <button type="button" class="btn btn-outline-success" onClick={()=>visitasig()}><FaArrowAltCircleRight style={{color:"#f0e68c", fontSize:"30px"}} /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className ="row">
                        <div className="col-md-8 col-sm-12 col-xxl-8 d-flex py-3">
                            <div className="card illustration2 flex-fill">
                                <div className="card-body p-0 d-flex flex-fill">
                                    <div className="row g-0 w-100">
                                        <div className="col-6">
                                            <div className="illustration-text p-3 m-1">
                                                <h4 className="illustration-text2">{store.dataesp.length}</h4>
                                                <p className="mb-0 positionesp2">Datos Capturados</p>
                                            </div>
                                        </div>
                                        <div className="col-6 text-center m-auto " style = {{alignItems:"center"}}>
                                            <button type="button" class="btn btn-outline-success" onClick={()=>datacapt()}><FaArrowAltCircleRight style={{color:"#f0e68c", fontSize:"30px"}} /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className ="col-md-6 col-sm-12 py-3">
                    <MapAdmon/>
                </div>
          </div>
         

        </div>
    );
};