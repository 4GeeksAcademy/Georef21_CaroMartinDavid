import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import "../../styles/admon.css";

import { Context } from "../store/appContext";
import { FaLocationDot, FaPhoneFlip, FaEnvelope, FaTrashCan, FaPencil } from "react-icons/fa6";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { SiReacthookform } from "react-icons/si";
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
    
    function regdata(){
        actions.gevisitaesp();
        actions.location();
        navigate("/captdatareg");
}
   
    return (
        <div className="container-fluid p-0">
            <div className="row">
                <div className = "col-md-6 col-sm-12">
                    <div className = "row">
                        <div className="col-xl-6 col-lg-6 col-sm-12 m-2 ">
                                <div className="card m-2" style={{backgroundColor:"#fff", border:"1px, solid,#dee2e6"}}>
                                    <div className="card-body">
                                        <span className="float-start m-2 me-4">
                                            <img src={store.specialist.imageprofile} style={{height:"100px"}} alt="avatar-2" className="rounded-circle img-thumbnail"/>
                                        </span>
                                        <div className="">
                                            <h4 className="mt-1 mb-1">{store.specialist.nombre} {store.specialist.apellido}</h4>
                                            <p className="font-13"> {store.specialist.area_de_desempeno}</p>
                                    
                                            <ul className="mb-0 list-inline">
                                                <li className="list-inline-item me-3">
                                                    <h5 className="mb-1">{store.numproyesp === null ? 0:store.numproyesp}</h5>
                                                    <p className="mb-0 font-13">Proyectos</p>
                                                </li>
                                                <li className="list-inline-item">
                                                    <h5 className="mb-1">{store.allvisitsspc.length}</h5>
                                                    <p className="mb-0 font-13">Visitas</p>
                                                </li>
                                            </ul>
                                        </div>
                                      
                                    </div>
                                   
                                </div>
                            </div>
                    </div>
                    <div className ="row">
                        <div className="col-sm-12 col-md-5 m-2">
                                        <div className="card widget-flat">
                                            <div className="card-body">
                                                <div className="float-end">
                                                    <button style={{border:"0px", backgroundColor:"#F2EEF5"}} onClick={()=>projecasig()}><FaArrowAltCircleRight style={{color:"#727cf5", fontSize:"30px"}} /> </button> 
                                                </div>
                                                <h5 className="text-muted fw-normal mt-0" title="Number of Customers">Proyectos Asignados</h5>
                                                <h3 className="mt-3 mb-3">{store.numproyesp === null ? 0:store.numproyesp}</h3>
                                                <p className="mb-0 text-muted">
                                                    <span className="text-success me-2">{new Date().toISOString().slice(0, 10)}</span>
                                                    <span className="text-nowrap">Noviembre</span>  
                                                </p>
                                            </div> 
                                        </div> 
                        </div>
                        <div className="col-sm-12 col-md-5 m-2">
                                        <div className="card widget-flat">
                                            <div className="card-body">
                                                <div className="float-end">
                                                    <button style={{border:"0px", backgroundColor:"#F2EEF5"}} onClick={()=>visitasig()}><FaArrowAltCircleRight style={{color:"#727cf5", fontSize:"30px"}} /> </button> 
                                                </div>
                                                <h5 className="text-muted fw-normal mt-0" title="Number of Customers">visitas Asignadas</h5>
                                                <h3 className="mt-3 mb-3">{store.allvisitsspc.length}</h3>
                                                <p className="mb-0 text-muted">
                                                    <span className="text-success me-2">{new Date().toISOString().slice(0, 10)}</span>
                                                    <span className="text-nowrap">Noviembre</span>  
                                                </p>
                                            </div> 
                                        </div> 
                        </div>
                        </div>
                    <div className="row">
                    <div className="col-sm-12 col-md-5 m-2">
                                        <div className="card widget-flat">
                                            <div className="card-body">
                                                <div className="float-end">
                                                    <button style={{border:"0px", backgroundColor:"#F2EEF5"}} onClick={()=>datacapt()}><FaArrowAltCircleRight style={{color:"#727cf5", fontSize:"30px"}} /> </button> 
                                                </div>
                                                <h5 className="text-muted fw-normal mt-0" title="Number of Customers">Datos capturados</h5>
                                                <h3 className="mt-3 mb-3">{store.dataesp.length}</h3>
                                                <p className="mb-0 text-muted">
                                                    <span className="text-success me-2">{new Date().toISOString().slice(0, 10)}</span>
                                                    <span className="text-nowrap">Noviembre</span>  
                                                </p>
                                            </div> 
                                        </div> 
                                    </div>
                     
                        <div className="col-sm-12 col-md-5 m-2">

                                        <div className="card widget-flat">
                                            <div className="card-body">
                                                <div className="float-end">
                                                    <button style={{border:"0px", backgroundColor:"#F2EEF5"}} onClick={()=>regdata()}><SiReacthookform  style={{color:"#727cf5", fontSize:"30px"}} /> </button> 
                                                </div>
                                                <h5 className="text-muted fw-normal mt-0" title="Number of Customers">Capturar datos</h5>
                                                <h3 className="mt-3 mb-3"> Ingresa datos</h3>
                                                <p className="mb-0 text-muted">
                                                    <span className="text-success me-2">{new Date().toISOString().slice(0, 10)}</span>
                                                    <span className="text-nowrap">Noviembre</span>  
                                                </p>
                                            </div> 
                                        </div> 
                        </div>
                   
                
                     
                    </div>           
                </div>
                <div className ="col-md-6 col-sm-12 p-3 m-auto">
                    <MapAdmon/>
                </div>
          </div>
         

        </div>
    );
};