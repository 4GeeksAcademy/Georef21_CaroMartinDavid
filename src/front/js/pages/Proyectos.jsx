import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Proyectos = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="account-pages1">
            <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5" >
                <div className="containerAdmon">

                    <div className="Administrador pt-4 pb-4 text-center bg-primary card-header col-md-6" style={{ color: 'white' }}>
                        {store.AllProjects.length == 0 ? <h1>No tienes proyectos creados</h1> :
                            <>
                                {store.AllProjects.map((Projects, index) => {
                                    return (
                                        <div key={index}>
                                            <h1>{Projects.nameProject}</h1>
                                            <Link to={`/NuevoProyecto/${Projects.id}`}>
                                                <button>Editar</button></Link>
                                            <button onClick={() => actions.DeleteProject(Projects.id)}>Borrar</button>
                                        </div>

                                    );

                                })
                                }
                            </>
                        }



                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <Link to="/profileadmon">
                            <button type="button" className="btn btn-primary">Volver</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Proyectos;