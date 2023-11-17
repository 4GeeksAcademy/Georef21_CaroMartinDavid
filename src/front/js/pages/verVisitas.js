import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const PerfilVisitas = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    function eliminarVisita(id){
        actions.eliminarVisita(id);
        actions.gevisitaadmon();
        navigate("/profileadmon")
    }
    

 
    return (
        <div className="container">
            {store.allvisits.length ==0? <h1>No tienes visitas registradas</h1>:
            <>
            {store.allvisits.map((item, index) => {
                return (
                    <div className="card" key={index}>
                        <div className="card-body my-3">
                            <h3>Id: {item.id}</h3>
                            <h3>Fecha: {new Date(item.date).toISOString().slice(0, 10)}</h3>
                            <h3>Alcance: {item.scope}</h3>
                            <h3>ID Proyecto: {item.project_id }</h3>
                            <h3>ID Especialista: {item.specialist_id }</h3>
                            <div className="d-flex justify-content-center">
                            <Link to={`/regvisit/${item.id}`}>
                                <button >Editar</button>
                            </Link>                                                                                                                                                                                                             
                                <button onClick={() => eliminarVisita(item.id)}>Eliminar</button>
                            </div>
                        </div>
                    </div>
                );
            })} </>
            }
            
            <Link to="/profileadmon" className="btn btn-secondary">
                   volver
            </Link>
        </div>
    );
};
