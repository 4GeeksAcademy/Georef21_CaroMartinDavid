import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const PerfilProjectEsp = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div className ="Container-fluid m-3">
        <div className="col-12 m-auto">
            <div className ="card">
                <div className = "card-header">
                    <h5 className ="card-title">Proyectos Asignados</h5>
                    <h6 className ="card-subtitle text-muted">{store.allprojectspc.length ==0? "No tienes proyectos asignados":"Estos son los proyectos en los que actualmente tienes asignadas visitas"}</h6>
                </div>
            </div>
            <table className ="table">
                <thead>
                    <tr>
                        <th style={{width:"10%"}}>Id</th>
                        <th style={{width:"30%"}}>Nombre Proyecto</th>
                        <th style={{width:"20%"}}>Ubicación</th>
                        <th style={{width:"20%"}}>Temática</th>
                        <th className ="d-none d-md-table-cell" style={{width:"20%"}}>Fecha Visitas</th>
                    </tr>
                </thead>
                {store.allprojectspc.length ==0? <></>:
                <>
                <tbody>
                {store.allprojectspc.map((item, index) => {
                return (
                    <tr  key={index}>
                        
                            <td> {item.id}</td>
                            <td>{item.nameProject}</td>
                            <td>{item.location}</td>
                            <td> {item.theme}</td>
                            <td>{item.visits.map ((visit, i) =>{
                                return(
                                <p key={i}>{new Date(visit.date).toISOString().slice(0, 10)}</p>
                                );})}</td>
                        </tr>
                    
                );
            })}
                </tbody>
            </>}
            </table>
            <Link to="/vInicial" className="btn btn-outline-secondary" disabled>
                   volver
            </Link>
        </div>
        </div>
    );
};
