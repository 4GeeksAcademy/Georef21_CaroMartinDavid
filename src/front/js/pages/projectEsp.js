import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const PerfilProjectEsp = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div className="container">
            {store.allprojectspc.length ==0? <h1>No tienes proyectos asignados</h1>:
            <>
            {store.allprojectspc.map((item, index) => {
                return (
                    <div className="card" key={index}>
                        <div className="card-body my-3">
                            <h3>Id: {item.id}</h3>
                            <h3>Nombre Proyecto : {item.nameProject}</h3>
                            <h3>Ubicacion: {item.location}</h3>
                            <h3>Tematica: {item.theme}</h3>
                            <h3>Fecha visitas:</h3>{item.visits.map ((visit, i) =>{
                                return(
                                <p key={i}>{new Date(visit.date).toISOString().slice(0, 10)}</p>
                                );})}
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
