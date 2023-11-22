import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const PerfilVisitas = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    function eliminarVisita(id) {
        actions.eliminarVisita(id);
        actions.gevisitaadmon();
        navigate("/profileadmon")
    }



    return (
        <div><h1 className="text-center mt-5">Visitas</h1>
            <div className="containerVisit">
                {store.allvisits.length === 0 ? (
                    <h1>No tienes visitas registradas</h1>
                ) : (
                    <div className="table-responsive-sm">
                        <table className="table table-centered mb-0">
                            <thead className="table">
                                <tr>
                                    <th>ID</th>
                                    <th>Fecha</th>
                                    <th>Alcance</th>
                                    <th>ID Proyecto</th>
                                    <th>ID Especialista</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {store.allvisits.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{new Date(item.date).toISOString().slice(0, 10)}</td>
                                        <td>{item.scope}</td>
                                        <td>{item.project_id}</td>
                                        <td>{item.specialist_id}</td>
                                        <td>
                                            <div className="d-flex">
                                                <Link to={`/regvisit/${item.id}`} className="btn buttonHome me-2 btn-sm">
                                                    Editar
                                                </Link>
                                                <button onClick={() => eliminarVisita(item.id)} className="btn btn-danger btn-sm">
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};


