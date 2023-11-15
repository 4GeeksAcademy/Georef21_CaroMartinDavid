import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const PerfilVisitas = () => {
    const { store, actions } = useContext(Context);
    

    const eliminarVisita = async (id) => {
        let deleteUrl = 'https://effective-halibut-qwrr6x5w99xf965g-3001.app.github.dev/api/visits/${id}';
        try {
            let response = await fetch(deleteUrl, {
                method: "DELETE",
            });
            if (response.ok) {
                fetchVisitas();
            } else {
                console.error("Error al eliminar la visita");
            }
        } catch (error) {
            console.error(error);
        }
    };

 
    return (
        <div className="container">
            {store.allvisits.length ==0? <h1>No tienes visitas registradas</h1>:
            <>
            {store.allvisits.map((item, index) => {
                return (
                    <div className="card" key={index}>
                        <div className="card-body my-3">
                            <h3>Id: {item.id}</h3>
                            <h3>Fecha: {item.date}</h3>
                            <h3>Alcance: {item.scope}</h3>
                            <h3>ID Proyecto: {item.project_id }</h3>
                            <h3>ID Especialista: {item.specialist_id }</h3>
                            <div className="d-flex justify-content-center">
                                <button onClick={() => editarVisita(item.id)}>Editar</button>
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
