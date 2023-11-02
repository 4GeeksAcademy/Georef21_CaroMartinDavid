import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const CrearProyecto = () => {
    const { store, actions } = useContext(Context);
    //lógica de petición
    return (
        <div className="mt-5">
            <select className="form-select" aria-label="Default select example">
                <option selected>Administrador</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
            <div className="mb-3">
                <label for="formGroupExampleInput" className="form-label">Nombre Proyecto</label>
                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input placeholder" />
            </div>
            <div className="mb-3">
                <label for="formGroupExampleInput2" className="form-label">Temática</label>
                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder" />
            </div>
            <div className="mb-3">
                <label for="formGroupExampleInput2" className="form-label">Ubicación</label>
                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder" />
            </div>

            <button type="button" className="btn btn-primary btn-lg">Crear Proyecto</button>

        </div>
    );
};

export default CrearProyecto;