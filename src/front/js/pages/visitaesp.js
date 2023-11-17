import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const PerfilVisitasEsp = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div className="container">
            {store.allvisitsspc.length ==0? <h1>No tienes visitas asignados</h1>:
            <>
            {store.allvisitsspc.map((item, index) => {
                return (
                    <div className="card" key={index}>
                        <div className="card-body my-3">
                            <h3>Id: {item.id}</h3>
                            <h3>Fecha: {new Date(item.date).toISOString().slice(0, 10)}</h3>
                            <h3>Alcance: {item.scope}</h3>
                            <h3>Proyecto: {store.allprojectspc.filter(project => project.id ===item.project_id)[0]?.nameProject }</h3> 
                        </div>
                    </div>
                );
            })} </>
            }
            
            <Link to="/vInicial" className="btn btn-secondary">
                   volver
            </Link>
        </div>
    );
};
