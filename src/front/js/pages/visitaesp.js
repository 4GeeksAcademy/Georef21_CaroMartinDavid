import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { SiReacthookform } from "react-icons/si";


export const PerfilVisitasEsp = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    function regdata(){
        actions.gevisitaesp();
        actions.location();
        navigate("/captdatareg");
}
    return (
    
        <div className ="Container-fluid m-3">
        <div className="col-12 m-auto">
            <div className ="card">
                <div className = "card-header">
                    <h5 className ="card-title">Visitas Asignadas</h5>
                    <h6 className ="card-subtitle text-muted">{store.allvisitsspc.length ==0? "No tienes visitas asignadas":"Estas son las visitas que tienes actualmente"}</h6>
                </div>
            </div>
            <table className ="table">
                <thead>
                    <tr>
                        <th style={{width:"5%"}}>Id</th>
                        <th className ="d-none d-md-table-cell" style={{width:"30%"}}>Fecha</th>
                        <th style={{width:"40%"}}>Alcance</th>
                        <th style={{width:"20%"}}>Proyecto</th>
                        <th style={{width:"5%"}}>Tomar datos</th>
                    </tr>
                </thead>
                {store.allvisitsspc.length ==0? <></>:
                <>
                <tbody>
                {store.allvisitsspc.map((item, index) => {
                return (
                    <tr  key={index}>
                        
                            <td> {item.id}</td>
                            <td>{new Date(item.date).toISOString().slice(0, 10)}</td>
                            <td>{item.scope}</td>
                            <td> {store.allprojectspc.filter(project => project.id ===item.project_id)[0]?.nameProject }</td>
                            <td><button className="btn btn-outline-secondary" onClick={()=>regdata()}><SiReacthookform /></button></td>
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
