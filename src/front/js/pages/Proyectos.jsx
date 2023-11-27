import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { ModalDelete } from "../component/modaldelete";

export const Proyectos = () => {
    const { store, actions } = useContext(Context);
    const [idproject, setIDproject]= useState(null);

    function deleteproject(id){
        setIDproject(id);
        actions.deleteSuccessM();
    }

    return (
        <div >
            <h1 className="text-center mt-5">Proyectos</h1>
            <div className="containerVisit" style={{ display: store.sidebar }}>
                <div>
                    {store.AllProjects.length === 0 ? (
                        <h1>No tienes proyectos creados</h1>
                    ) : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Proyecto</th>
                                    <th>Temática</th>
                                    <th>Ubicación</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {store.AllProjects.map((project, index) => (
                                    <tr key={index}>
                                        <td>{project.nameProject}</td>
                                        <td>{project.theme}</td>
                                        <td>{project.location}</td>
                                        <td>
                                            <Link to={`/NuevoProyecto/${project.id}`} className="btn buttonHome btn-sm me-2">
                                                Editar
                                            </Link>
                                            <button onClick={() => deleteproject(project.id)} className="btn btn-danger btn-sm">
                                                Borrar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <ModalDelete id={idproject} tema ="este proyecto"/>
            </div>
        </div>
    );
};


export default Proyectos;