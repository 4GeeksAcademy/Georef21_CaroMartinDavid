import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Proyectos = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="mt-5">

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
            <Link to="/profileadmon">
					<button type="button" className="btn btn-outline-dark">Volver</button>
			</Link>
        </div>
    );
};

export default Proyectos;